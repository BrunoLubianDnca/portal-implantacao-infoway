import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, Lock, Play } from 'lucide-react'
import './ProgressSidebar.css'
import { getStatuses } from '../utils/progress'

const baseModulos = [
  { id: 1, titulo: 'Acesso ao Servidor', status: 'concluido' },
  { id: 2, titulo: 'Configuração Inicial', status: 'concluido' },
  { id: 3, titulo: 'Infodrive: Pasta de Rede', status: 'em-andamento' },
  { id: 4, titulo: 'Suporte & FAQ', status: 'bloqueado' }
]

const ProgressSidebar = ({ progressoGeral = 50 }) => {
  const [modulos, setModulos] = useState(baseModulos)
  const location = useLocation()

  // Sync completion status from localStorage
  useEffect(() => {
    const { statuses } = getStatuses(baseModulos.length)
    setModulos((curr) => curr.map((m) => {
      const s = statuses.find((x) => x.id === m.id)
      return { ...m, status: s?.status || m.status }
    }))
  }, [location.pathname])

  const getStatusInfo = (status) => {
    switch (status) {
      case 'concluido':
        return {
          icon: CheckCircle,
          color: 'green',
          label: 'Concluído',
          bgClass: 'bg-green-100',
          textClass: 'text-green-600',
          borderClass: 'border-green-200'
        }
      case 'em-andamento':
        return {
          icon: Play,
          color: 'orange',
          label: 'Em andamento',
          bgClass: 'bg-orange-100',
          textClass: 'text-orange-600',
          borderClass: 'border-orange-200'
        }
      default:
        return {
          icon: Lock,
          color: 'gray',
          label: 'Não iniciado',
          bgClass: 'bg-gray-100',
          textClass: 'text-gray-400',
          borderClass: 'border-gray-200'
        }
    }
  }

  const modulosConcluidos = modulos.filter(m => m.status === 'concluido').length
  const totalModulos = modulos.length

  return (
    <div className="progress-sidebar">
      <div className="progress-header">
        <h3>Progresso Geral</h3>
        <div className="progress-card">
          <div className="progress-stats">
            <span className="progress-count">{modulosConcluidos} de {totalModulos} módulos</span>
            <span className="progress-percentage">{progressoGeral}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressoGeral}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="modulos-list">
        {modulos.map((modulo) => {
          const statusInfo = getStatusInfo(modulo.status)
          const Icon = statusInfo.icon
          const isActive = modulo.status === 'em-andamento'
          const isBlocked = modulo.status === 'bloqueado'

          return (
            <Link 
              key={modulo.id} 
              to={`/modulo/${modulo.id}`}
              className={`modulo-item ${isActive ? 'active' : ''} ${isBlocked ? 'bloqueado' : ''}`}
              onClick={(e) => { if (isBlocked) e.preventDefault() }}
            >
              <div className={`modulo-icon ${statusInfo.bgClass}`}>
                <Icon size={16} className={statusInfo.textClass} />
              </div>
              <div className="modulo-info">
                <p className="modulo-titulo">{modulo.titulo}</p>
                <p className={`modulo-status ${statusInfo.textClass}`}>
                  {statusInfo.label}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressSidebar
