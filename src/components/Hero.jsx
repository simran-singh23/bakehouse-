import { NavLink } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero-photo min-h-[82vh]">
      <div className="mx-auto flex min-h-[82vh] max-w-6xl items-center px-5 py-20">
        <div className="max-w-2xl animate-rise text-white">
          <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
            Baked fresh near Patiala Chowk, Zirakpur
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">Bawra Bake House</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-rose-50">
            Soft cakes, creamy desserts and hot savouries made for birthdays, small parties and
            everyday cravings.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NavLink to="/menu" className="btn-main">
              See Menu
            </NavLink>
            <NavLink to="/contact" className="btn-light">
              Visit Shop
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
