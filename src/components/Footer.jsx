import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-12 w-full max-w-container-max mx-auto gap-gutter">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="font-headline-md text-headline-md text-primary">Bawra Bakehouse</div>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left max-w-xs">
            © 2026 Bawra Bakehouse. Passionately Eggless. Shiva Complex, Zirakpur.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md"
            >
              Facebook
            </a>
            <NavLink
              to="/about"
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md"
            >
              Our Story
            </NavLink>
            <NavLink
              to="/contact"
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md"
            >
              Contact
            </NavLink>
          </div>
          <div className="flex gap-4">
            <NavLink
              to="/menu"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container group transition-all"
            >
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                favorite
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
