import { useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'

type NavbarProps = {
  onNavigate: (path: string) => void
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function navigate(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <header className="site-header fixed-header">
      <a className="brand" href="/" aria-label="Acharya Punit Tiwari home" onClick={(event) => navigate(event, '/')}>
        <span className="brand-mark">
          <img className="om-logo" src="/om-logo.svg" alt="" />
        </span>
        <span className="brand-name">
          आचार्य <strong>Punit Tiwari</strong>
          <small>VEDIC PUJA &amp; ANUSHTHAN</small>
        </span>
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="main-navigation"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav
        id="main-navigation"
        className={mobileMenuOpen ? 'main-nav is-open' : 'main-nav'}
        aria-label="Main navigation"
      >
        <a href="/" onClick={(event) => navigate(event, '/')}>Home</a>
        <a href="/services" onClick={(event) => navigate(event, '/services')}>Services</a>
        <a href="/blogs" onClick={(event) => navigate(event, '/blogs')}>Blogs</a>
        <a href="/contact" onClick={(event) => navigate(event, '/contact')}>Contact</a>
      </nav>
    </header>
  )
}

export default Navbar
