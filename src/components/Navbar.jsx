import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <Link to="/" className="navbar__logo">
          <div className="logo-icon">🔬</div>
          <span>Innovare</span>
        </Link>

        <div className={`navbar__links${menuOpen ? ' open' : ''}`} id="navLinks">
          <Link to="/" className={isActive('/') ? 'active' : ''}>Início</Link>
          <Link to="/sobre" className={isActive('/sobre') ? 'active' : ''}>Sobre</Link>
          <Link to="/como-funciona" className={isActive('/como-funciona') ? 'active' : ''}>Como Funciona</Link>
          <Link to="/editais" className={isActive('/editais') ? 'active' : ''}>Editais</Link>
          <Link to="/indicadores" className={isActive('/indicadores') ? 'active' : ''}>Indicadores</Link>
        </div>

        <div className="navbar__actions">
          <Link to="/login" className="btn btn-ghost">Entrar</Link>
          <Link to="/login" className="btn btn-primary">Cadastrar</Link>
        </div>

        <div
          className={`navbar__hamburger${menuOpen ? ' active' : ''}`}
          id="hamburger"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
