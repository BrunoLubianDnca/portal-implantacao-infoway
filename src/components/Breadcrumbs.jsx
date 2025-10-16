import { Home, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Breadcrumbs.css'

const Breadcrumbs = ({ modulo, categoria }) => {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('trilho')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li>
          <button onClick={handleHomeClick} className="breadcrumb-link">
            <Home size={16} />
            <span>Início</span>
          </button>
        </li>
        
        {categoria && (
          <>
            <li>
              <ChevronRight size={16} className="breadcrumb-separator" />
            </li>
            <li>
              <span className="breadcrumb-current">{categoria}</span>
            </li>
          </>
        )}
        
        {modulo && (
          <>
            <li>
              <ChevronRight size={16} className="breadcrumb-separator" />
            </li>
            <li>
              <span className="breadcrumb-active">{modulo}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
