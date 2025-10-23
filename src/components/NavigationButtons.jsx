import { ArrowLeft, ArrowRight, Home, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './NavigationButtons.css'

const NavigationButtons = ({
  onVoltar,
  onProximo,
  podeVoltar = true,
  podeProximo = false,
  textoVoltar = "Voltar",
  textoProximo = "Próximo Módulo",
  mostrarHome = false,
  progressoInfo = null
}) => {
  const [showBlockedMessage, setShowBlockedMessage] = useState(false)

  const handleProximoClick = () => {
    if (podeProximo) {
      onProximo()
    } else {
      setShowBlockedMessage(true)
      setTimeout(() => setShowBlockedMessage(false), 4000)
    }
  }
  return (
    <>
      <nav className="navigation-buttons" aria-label="Navegação do módulo">
        <div className="nav-buttons-container">
          {/* Botão Voltar */}
          <button
            onClick={onVoltar}
            disabled={!podeVoltar}
            className={`nav-btn nav-btn-voltar ${!podeVoltar ? 'disabled' : ''}`}
            aria-label={textoVoltar}
          >
            <ArrowLeft size={20} />
            <span>{textoVoltar}</span>
          </button>

          {/* Botão Home (opcional) */}
          {mostrarHome && (
            <Link to="/" className="nav-btn nav-btn-home" aria-label="Voltar ao início">
              <Home size={20} />
              <span>Início</span>
            </Link>
          )}

          {/* Botão Próximo */}
          <button
            onClick={handleProximoClick}
            disabled={!podeProximo}
            className={`nav-btn nav-btn-proximo ${!podeProximo ? 'disabled' : ''}`}
            aria-label={textoProximo}
          >
            <span>{textoProximo}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </nav>

      {/* Mensagem de bloqueio animada */}
      {showBlockedMessage && progressoInfo && (
        <div className="blocked-message-overlay">
          <div className="blocked-message">
            <AlertCircle size={24} />
            <div className="blocked-message-content">
              <h4>🚀 Quase lá!</h4>
              <p>
                Você concluiu <strong>{progressoInfo.concluidos} de {progressoInfo.total} módulos</strong>.
                Marque este módulo como concluído para continuar!
              </p>
              {progressoInfo.restantes > 1 && (
                <p className="blocked-motivation">
                  🎯 Falta{progressoInfo.restantes === 1 ? '' : 'm'} apenas {progressoInfo.restantes} módulo{progressoInfo.restantes === 1 ? '' : 's'}!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NavigationButtons