import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  MonitorPlay, 
  Settings, 
  HardDrive, 
  HeadphonesIcon,
  Clock,
  ArrowRight,
  CheckCircle,
  Lock,
  AlertCircle,
  Play
} from 'lucide-react'
import './TrilhoImplantacao.css'
import { getAllowedModuleId } from '../utils/progress'

const etapas = [
  {
    id: 1,
    titulo: 'Acesso ao Servidor',
    descricao: 'Aprenda a acessar o servidor via navegador, fazer login e configurar o atalho na área de trabalho',
    icone: MonitorPlay,
    tempo: '5 min',
  cor: '#FE5000',
    topicos: ['Login via navegador', 'Credenciais', 'Atalho desktop'],
    imagem: '/images/trilho/Modulo-1.png'
  },
  {
    id: 2,
    titulo: 'Configuração Inicial',
    descricao: 'Configure a interface virtual, entenda a barra de navegação e acesse os sistemas integrados',
    icone: Settings,
    tempo: '10 min',
    cor: '#FF6A26',
    topicos: ['Interface virtual', 'Navegação', 'Sistemas'],
    imagem: '/images/trilho/Modulo-2.png'
  },
  {
    id: 3,
    titulo: 'Infodrive & Backup',
    descricao: 'Configure a pasta de rede, sincronização automática e entenda o sistema de backup',
    icone: HardDrive,
    tempo: '8 min',
  cor: '#FF8A4D',
    topicos: ['Pasta de rede', 'Sincronização', 'Backup automático'],
    imagem: '/images/trilho/Modulo-3.png' // Cloud/Storage
  },
  {
    id: 4,
    titulo: 'Suporte & FAQ',
    descricao: 'Saiba quando e como acionar o suporte técnico e consulte as perguntas frequentes',
    icone: HeadphonesIcon,
    tempo: '7 min',
  cor: '#FFB287',
    topicos: ['Canais de suporte', 'FAQ', 'Contatos'],
    imagem: '/images/trilho/Modulo-4.png' // Support/Headset
  }
]

const TrilhoImplantacao = () => {
  const allowed = getAllowedModuleId(etapas.length)
  const isLocal = window.location.hostname === 'localhost'
  const [shakeId, setShakeId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [tooltipMobileId, setTooltipMobileId] = useState(null)
  
  const liberarTudo = () => {
    localStorage.setItem('modulosConcluidos', JSON.stringify(etapas.map(e => e.id)))
    window.location.reload()
  }

  const handleBlockedClick = (id) => {
    setShakeId(id)
    // Mobile: mostrar tooltip ao clicar
    if (window.innerWidth <= 768) {
      setTooltipMobileId(tooltipMobileId === id ? null : id)
    }
    setTimeout(() => setShakeId(null), 500)
  }

  const getModulosPendentes = (moduloId) => {
    const concluidos = (() => {
      try {
        const raw = localStorage.getItem('modulosConcluidos')
        if (!raw) return []
        return JSON.parse(raw)
      } catch {
        return []
      }
    })()
    const pendentes = []
    for (let i = 1; i < moduloId; i++) {
      if (!concluidos.includes(i)) {
        pendentes.push(i)
      }
    }
    return pendentes
  }

  return (
    <section id="trilho" className="trilho-section">
      <div className="container">
        {isLocal && (
          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <button className="btn btn-secondary" onClick={liberarTudo} style={{ fontSize: '0.9rem' }}>
              Liberar todas as etapas (teste)
            </button>
          </div>
        )}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="title-with-bar">Sua Jornada de Implantação</h2>
            <p>Complete cada etapa em sequência. Vídeos, checklists e suporte disponíveis em cada passo.</p>
          </motion.div>
        </div>

        <div className="etapas-grid">
          {etapas.map((etapa, index) => {
            const Icon = etapa.icone
            const bloqueado = etapa.id > allowed
            const pendentes = bloqueado ? getModulosPendentes(etapa.id) : []
            const isConcluido = (() => {
              try {
                const raw = localStorage.getItem('modulosConcluidos')
                if (!raw) return false
                const arr = JSON.parse(raw)
                return arr.includes(etapa.id)
              } catch {
                return false
              }
            })()
            
            const isProximaEtapa = !bloqueado && !isConcluido && etapa.id === allowed
            
            return (
              <motion.div
                key={etapa.id}
                className={`etapa-card ${bloqueado ? 'bloqueado' : ''} ${isConcluido ? 'concluida' : ''} ${isProximaEtapa ? 'proxima-etapa' : ''} ${shakeId === etapa.id ? 'shake' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={!bloqueado ? { y: -10 } : {}}
                onMouseEnter={() => setHoveredId(etapa.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Imagem de Fundo */}
                <div className="etapa-image" style={{ backgroundImage: `url(${etapa.imagem})` }}>
                  <div className="etapa-image-overlay"></div>
                </div>

                <div className="etapa-number" style={{ background: etapa.cor }}>
                  {etapa.id}
                </div>

                <div className="etapa-icon" style={{ background: `${etapa.cor}15` }}>
                  <Icon size={32} color={etapa.cor} />
                </div>

                <h3>{etapa.titulo}</h3>
                <p>{etapa.descricao}</p>

                <div className="etapa-topicos">
                  {etapa.topicos.map((topico, idx) => (
                    <span key={idx} className="topico">
                      <CheckCircle size={14} />
                      {topico}
                    </span>
                  ))}
                </div>

                <div className="etapa-footer">
                  <div className="etapa-tempo">
                    <Clock size={16} />
                    <span>{etapa.tempo}</span>
                  </div>
                  
                  {bloqueado ? (
                    <button 
                      className="btn-acessar disabled"
                      onClick={() => handleBlockedClick(etapa.id)}
                    >
                      <Lock size={16} />
                      Bloqueado
                    </button>
                  ) : (
                    <Link 
                      to={`/modulo/${etapa.id}`}
                      className={`btn-acessar ${isProximaEtapa ? 'btn-proxima' : ''}`}
                    >
                      {isConcluido ? (
                        <>
                          <CheckCircle size={18} />
                          Revisar Etapa
                        </>
                      ) : isProximaEtapa ? (
                        <>
                          <Play size={18} />
                          Começar Agora
                        </>
                      ) : (
                        <>
                          Acessar
                          <ArrowRight size={18} />
                        </>
                      )}
                    </Link>
                  )}
                </div>

                {index < etapas.length - 1 && (
                  <div className="etapa-connector">
                    <ArrowRight size={24} />
                  </div>
                )}
                
                {/* Lock Overlay com Tooltip */}
                {bloqueado && (
                  <>
                    <div className="etapa-lock-overlay">
                      <Lock size={32} className="lock-icon" />
                    </div>
                    
                    {/* Tooltip avançado com Timeline */}
                    <AnimatePresence>
                      {(hoveredId === etapa.id || tooltipMobileId === etapa.id) && (
                        <motion.div
                          className="etapa-tooltip"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="tooltip-header">
                            <Lock size={18} />
                            <strong>Módulo Bloqueado</strong>
                          </div>
                          <p className="tooltip-description">
                            🔒 Para acessar este módulo, complete {pendentes.length === 1 ? 'a etapa anterior' : 'as etapas anteriores'}:
                          </p>
                          
                          {/* Timeline Visual */}
                          <div className="tooltip-timeline">
                            {pendentes.map((id, idx) => (
                              <div key={id} className="timeline-item">
                                <div className="timeline-marker">
                                  <div className="timeline-dot pending"></div>
                                  {idx < pendentes.length - 1 && <div className="timeline-line"></div>}
                                </div>
                                <div className="timeline-content">
                                  <div className="timeline-title">
                                    <span className="timeline-number">Módulo {id}</span>
                                    <span className="timeline-badge">Pendente</span>
                                  </div>
                                  <div className="timeline-subtitle">{etapas.find(e => e.id === id)?.titulo}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="tooltip-footer">
                            <ArrowRight size={14} />
                            <span>Complete na ordem para desbloquear</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Badge de Concluído */}
                {isConcluido && (
                  <motion.div
                    className="etapa-badge-concluida"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  >
                    <CheckCircle size={16} />
                    Concluído
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrilhoImplantacao
