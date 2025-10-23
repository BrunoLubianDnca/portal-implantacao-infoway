import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // limpar listener de widescreen state
    // (não conseguimos remover two listeners in same return easily; use separate cleanup below)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Buscar:', searchQuery)
    // Implementar lógica de busca
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  const handleNavbarReplay = () => {
    try {
      // emitir evento global que o WidescreenHero escutará
      window.dispatchEvent(new CustomEvent('widescreen:replay'))
    } catch (e) {}
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-container">
              <img 
                src="/images/logo-infoway.png" 
                alt="Infoway" 
                className="logo-image"
              />
            </div>
            <div className="logo-divider"></div>
            <div className="logo-text">
              <span className="logo-title">Portal de Implantação</span>
              <span className="logo-subtitle">Sistema Infoway</span>
            </div>
          </Link>
          

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Implantação
            </button>
            <button onClick={() => scrollToSection('trilho')} className="nav-link">
              Tutoriais
            </button>
            <button onClick={() => scrollToSection('suporte')} className="nav-link">
              Suporte
            </button>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="navbar-search desktop-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('home')} className="nav-link-mobile">
            Implantação
          </button>
          <button onClick={() => scrollToSection('trilho')} className="nav-link-mobile">
            Tutoriais
          </button>
          <button onClick={() => scrollToSection('suporte')} className="nav-link-mobile">
            Suporte
          </button>
          
          <form onSubmit={handleSearch} className="navbar-search mobile-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
