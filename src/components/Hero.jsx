import { useEffect, useRef } from 'react'

function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    let animationFrameId
    let resizeObserver

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
          vec2 uv = v_texCoord;
          
          // Create a "dough-like" or "creamy" flowing motion
          float n = snoise(uv * 3.0 + u_time * 0.2);
          n += 0.5 * snoise(uv * 6.0 - u_time * 0.3);
          
          // Bakery-inspired palette: Cream, Soft Brown, Sage
          vec3 color1 = vec3(0.99, 0.98, 0.96); // Cream (#fdf9f4)
          vec3 color2 = vec3(0.93, 0.89, 0.85); // Warm Beige
          vec3 color3 = vec3(0.85, 0.88, 0.82); // Soft Sage
          
          vec3 finalColor = mix(color1, color2, n * 0.5 + 0.5);
          finalColor = mix(finalColor, color3, clamp(snoise(uv * 2.0 + u_time * 0.1), 0.0, 1.0) * 0.2);
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const compileShader = (type, source) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    if (!buffer) return
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width
        const ny = 1.0 - (event.clientY - rect.top) / rect.height
        mouse.x = nx * canvas.width
        mouse.y = ny * canvas.height
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const syncSize = () => {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    syncSize()
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize)
      resizeObserver.observe(canvas)
    }

    const render = (t) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, t * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      if (resizeObserver) resizeObserver.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <section className="relative min-h-[921px] flex items-center overflow-hidden" id="home">
      {/* WebGL Canvas Background */}
      <div className="absolute inset-0 w-full h-full opacity-40 z-0">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-desktop text-center md:text-left">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md mb-6">
            Artisanal & Eggless
          </span>
          <h1 className="font-display-lg text-display-lg text-primary leading-tight mb-6">
            Passionate About <br />
            <span className="italic font-normal">Eggless Perfection</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
            Hand-crafted delights from the heart of Zirakpur. We blend traditional techniques with whimsical passion to bake joy into every bite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#specialties"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg shadow-primary/10 text-center"
            >
              Explore Our Specialties
            </a>
            <a
              href="#story"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-label-md text-label-md hover:bg-secondary hover:text-on-secondary transition-all text-center"
            >
              Our Philosophy
            </a>
          </div>
        </div>
      </div>

      {/* Floating Decorative Element */}
      <div
        className="absolute right-0 bottom-0 w-1/3 h-2/3 hidden lg:block opacity-90 animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="w-full h-full rounded-tl-[120px] overflow-hidden shadow-2xl">
          <div
            className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1TqPgXKpCiC3eQUE2m5yDwI9LGruTPhCsZ7mWCZi_tnghbYQaFfTf1xSA0azc54RMFA1SjDqm1sVFgklPoxy6c4NngjopFd53cx-0Cec7kZPkVZhKAo7Q5dhjDzu86Vh9R7Wdh-OzjkO6jtE1PTbStM8jkgUNvwk0Bys5JUaTHC22k_NKKJpCP5vCZsOKGbeHVn-HUpav-9UTOMjLR-iXueBJaQ0h82ZTUUbfSx5X_3FS6KOvWeT7XT2ntsmhKYj3nlo9p06IcXs')`
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
