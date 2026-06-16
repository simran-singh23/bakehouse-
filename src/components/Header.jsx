import { NavLink } from 'react-router-dom'

function Header() {
  const links = [
    ['/', 'Home'],
    ['/menu', 'Menu'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/90 backdrop-blur">

      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4
       md:flex-row md:items-center md:justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full
           bg-rose-700 text-xl font-bold text-white shadow-sm">
            
            B
          </span>
          <span>
            <span className="block text-xl font-bold text-stone-950">Bawra Bake House</span>
            <span className="block text-xs font-medium uppercase tracking-wider text-rose-700">
              Cakes . Desserts . Savouries
            </span>
          </span>
        </NavLink>

        <div className="flex flex-wrap gap-2">
          {links.map(([to, label]) => (
            <NavLink key={to}
              to={to}
              className={({ isActive }) =>

                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                 
                  ? 'bg-rose-700 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-rose-50 hover:text-rose-800'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
