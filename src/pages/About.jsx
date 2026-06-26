import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import * as THREE from 'three'

const featureCards = [
  {
    title: 'Fresh Daily',
    text: 'Every cake is prepared in small batches so the texture stays soft and the cream stays neat.',
  },
  {
    title: 'Custom Orders',
    text: 'Birthday cakes, anniversary cakes and theme cakes are handled with the details you share.',
  },
  {
    title: 'Local Feel',
    text: 'Made for Zirakpur families who want bakery items that feel warm, tasty and dependable.',
  },
]

function About() {
  const pageRef = useRef(null)
  const canvasRef = useRef(null)
  const threeRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return undefined

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;

      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = v_texCoord;

        float n1 = noise(uv * 2.0 + u_time * 0.05);
        float n2 = noise(uv * 4.0 - u_time * 0.08);
        float mask = smoothstep(
          0.3,
          0.7,
          sin(uv.x * 2.0 + u_time * 0.1) *
          cos(uv.y * 1.5 + u_time * 0.15) * 0.5 + 0.5
        );

        vec3 colorA = vec3(0.988, 0.976, 0.953);
        vec3 colorB = vec3(0.925, 0.918, 0.894);
        vec3 colorC = vec3(0.29, 0.17, 0.16);

        vec3 finalColor = mix(colorA, colorB, mask);
        finalColor = mix(finalColor, colorC, n1 * n2 * 0.08);

        float vignette = 1.0 - length(uv - 0.5) * 0.5;
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const compileShader = (type, source) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return undefined

    const program = gl.createProgram()
    if (!program) return undefined

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      
      return undefined
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    if (!buffer) return undefined

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    let frameId = 0

    const syncSize = () => {
      const width = canvas.clientWidth || 1
      const height = canvas.clientHeight || 1
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    syncSize()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null
    resizeObserver?.observe(canvas)

    const render = (time) => {
      syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)

      if (timeLocation) gl.uniform1f(timeLocation, time * 0.001)
      if (resolutionLocation) gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = window.requestAnimationFrame(render)
    }

    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  useEffect(() => {
    const container = threeRef.current
    if (!container) return undefined


    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const geometry = new THREE.IcosahedronGeometry(1.5, 64)
    const basePositions = geometry.attributes.position.array.slice()
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a2c2a,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
      wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const innerGeo = new THREE.IcosahedronGeometry(1.4, 4)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xfcf9f3,
      roughness: 0.3,
      metalness: 0.1,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerMesh)

    let frameId = 0

    const resize = () => {
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const animate = (timeMs) => {
      const time = timeMs * 0.001

      mesh.rotation.y = time * 0.2
      mesh.rotation.x = time * 0.15

      const scale = 1 + Math.sin(time * 0.5) * 0.05
      mesh.scale.set(scale, scale, scale)

      innerMesh.rotation.y = -time * 0.1
      innerMesh.scale.set(scale, scale, scale)

      const positions = mesh.geometry.attributes.position
      for (let i = 0; i < positions.count; i += 1) {
        const x = basePositions[i * 3]
        const y = basePositions[i * 3 + 1]
        const z = basePositions[i * 3 + 2]
        const noise = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.1
        positions.setXYZ(i, x, y, z + noise * 0.01)
      }
      positions.needsUpdate = true

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    const root = pageRef.current
    if (!root) return undefined

    const items = Array.from(root.querySelectorAll('.reveal'))
    if (!items.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.18 },
    )

    items.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className="overflow-hidden">
      <section className="relative flex min-h-[calc(100vh-92px)] w-full items-center justify-center overflow-hidden bg-background">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div ref={threeRef} className="h-[calc(100vh-92px)] w-full" aria-hidden="true" />
        </div>

        <div className="relative z-20 px-4 text-center">
          <h1 className="text-shadow-premium mx-auto mb-8 max-w-4xl animate-fade-in-up font-headline-xl text-5xl font-bold leading-[1.02] text-primary md:text-[84px]">
            Crafted with Soul.
            <br />
            <span className="italic font-normal">Baked with Heart.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl animate-[fade-in-up_1s_ease-out_0.5s_forwards] font-body-lg text-lg leading-8 text-on-surface-variant opacity-0">
            Experience the warmth of artisanal baking where traditional techniques meet
            contemporary zest in the heart of Zirakpur.
          </p>
          <div className="flex animate-[fade-in-up_1s_ease-out_0.8s_forwards] flex-col justify-center gap-4 opacity-0 md:flex-row">
            <NavLink
              to="/menu"
              className="rounded-full bg-primary-container px-8 py-4 font-label-sm text-xs font-semibold uppercase tracking-[0.08em] text-white transition duration-300 hover:bg-primary"
            >
              Explore Our Menu
            </NavLink>
            <NavLink
              to="/contact"
              className="rounded-full border border-secondary px-8 py-4 font-label-sm text-xs font-semibold uppercase tracking-[0.08em] text-secondary transition duration-300 hover:bg-secondary hover:text-white"
            >
              Our Story
            </NavLink>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-50">
          <span className="font-label-sm text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-primary/30">
            <div className="absolute left-0 top-0 h-1/2 w-full animate-[bounce-down_2s_infinite] bg-primary" />
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-title reveal">
          <p>Why people remember us</p>
          <h2>Made for clean celebrations and easy ordering.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className="deal-card reveal"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
        <div className="reveal">
          <p className="tag">The story</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-[#321716] md:text-5xl">
            A bakery built around cakes that feel special without feeling overdone.
          </h2>
          <p className="mt-5 leading-8 text-[#504441]">
            Our focus is simple: good ingredients, neat finishing, and a process that keeps
            birthday cakes, anniversary cakes and everyday treats looking and tasting fresh.
          </p>
          <p className="mt-4 leading-8 text-[#504441]">
            We keep the design language warm and premium, so the first impression feels like the
            cake itself was made for the moment.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="group overflow-hidden rounded-xl border border-[#d4c3be]/70 bg-white shadow-sm">
            <img
              src="/Images/cakes/Butterscotch Cake.jpeg"
              alt="Butterscotch cake"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="group overflow-hidden rounded-xl border border-[#d4c3be]/70 bg-white shadow-sm sm:mt-10">
            <img
              src="/Images/cakes/Nutella Cake.jpeg"
              alt="Nutella cake"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
