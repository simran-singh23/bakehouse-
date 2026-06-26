import { NavLink } from 'react-router-dom'
import logo from '../assets/bawra-logo.png'

function Header() {
  const links = [
    ['/', 'Home'],
    ['/menu', 'Menu'],
    ['/desserts', 'Desserts'],
    ['/ice-creams', 'Ice Creams'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="mx-auto flex flex-col gap-4 px-margin-desktop py-4 w-full max-w-container-max md:flex-row md:items-center md:justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Bawra Bakehouse logo"
            className="h-12 w-12 rounded-full border-2 border-primary-fixed-dim object-cover shadow-sm"
          />
          <span>
            <span className="block text-headline-md font-headline-md text-primary tracking-tight">
              Bawra Bakehouse
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-secondary">
              Cakes . Desserts . Savouries
            </span>
          </span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap gap-4">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-label-md text-label-md transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/menu"
            className="bg-primary text-on-primary px-5 py-2 rounded-lg font-label-md text-label-md hover:scale-95 transition-all duration-150 active:scale-90 inline-block text-center shadow-md shadow-primary/10"
          >
            Order Now
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
