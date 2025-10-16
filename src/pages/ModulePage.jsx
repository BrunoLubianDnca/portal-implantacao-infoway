import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import confetti from 'canvas-confetti'
import { 
  ArrowLeft, 
  ArrowRight,
  Download, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Play,
  Loader,
  Award
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import Checklist from '../components/Checklist'
import FAQ from '../components/FAQ'
import './ModulePage.css'
import { isModuleBlocked, getAllowedModuleId } from '../utils/progress'

// Dados dos módulos
const modulosData = {
  1: {
    titulo: 'Acesso ao Servidor',
    videoId: 'NBMuLefgsII',
    descricao: 'Aprenda a acessar o servidor via navegador e configure seu ambiente de trabalho',
    conteudo: [
      {
        tipo: 'titulo',
        texto: '1. Acessando via Navegador'
      },
      {
        tipo: 'paragrafo',
        texto: 'Abra seu navegador preferido (Chrome, Firefox, Edge) e acesse o endereço fornecido pela equipe técnica. O acesso é totalmente baseado em nuvem, não requerendo instalação de software adicional.'
      },
      {
        tipo: 'codigo',
        texto: 'https://servidor.infoway.com.br'
      },
      {
        tipo: 'dica',
        texto: 'Marque a página como favorita para acesso rápido no futuro!'
      },
      {
        tipo: 'titulo',
        texto: '2. Fazendo Login'
      },
      {
        tipo: 'paragrafo',
        texto: 'Utilize as credenciais fornecidas pela equipe via WhatsApp ou e-mail. O acesso é simples e direto.'
      },
      {
        tipo: 'lista',
        itens: [
          'Digite seu nome de usuário',
          'Insira a senha enviada pela equipe',
          'Clique em "Entrar"'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Guarde suas credenciais em local seguro para facilitar acessos futuros!'
      },
      {
        tipo: 'titulo',
        texto: '3. Criando Atalho na Área de Trabalho'
      },
      {
        tipo: 'paragrafo',
        texto: 'Para facilitar o acesso diário, você pode criar um atalho direto na área de trabalho do seu computador.'
      },
      {
        tipo: 'lista',
        itens: [
          'Acesse o servidor pelo navegador',
          'Clique nos três pontos no canto superior direito',
          'Selecione "Mais ferramentas" > "Criar atalho"',
          'Marque "Abrir como janela" e clique em "Criar"'
        ]
      }
    ],
    materiais: [
      { nome: 'Guia de Acesso PDF', link: '#', icone: 'pdf' },
      { nome: 'Checklist de Configuração', link: '#', icone: 'doc' }
    ],
    checklist: [
      'Acessei o servidor pelo navegador',
      'Fiz login com minhas credenciais',
      'Alterei a senha padrão',
      'Criei atalho na área de trabalho'
    ],
    faq: [
      {
        question: 'Não consigo acessar o servidor',
        answer: 'Verifique se você está usando o endereço correto fornecido pela equipe. Certifique-se de que sua conexão com a internet está funcionando.'
      },
      {
        question: 'Esqueci minha senha',
        answer: 'Entre em contato com a equipe interna (Bruno) para solicitar a redefinição de senha.'
      },
      {
        question: 'O atalho não funciona',
        answer: 'Tente criar o atalho novamente ou adicione a página aos favoritos do navegador.'
      }
    ],
    proximoModulo: 2
  },
  2: {
    titulo: 'Configuração Inicial',
    videoId: 'mfDjSwL90Ow',
    descricao: 'Configure a interface virtual e entenda os sistemas integrados',
    conteudo: [
      {
        tipo: 'titulo',
        texto: '1. Interface Virtual'
      },
      {
        tipo: 'paragrafo',
        texto: 'O servidor oferece uma área de trabalho virtual completa, similar ao Windows, mas acessível via navegador.'
      },
      {
        tipo: 'dica',
        texto: 'Você pode trabalhar de qualquer lugar com conexão à internet!'
      },
      {
        tipo: 'titulo',
        texto: '2. Barra de Navegação'
      },
      {
        tipo: 'paragrafo',
        texto: 'A barra inferior permite alternar entre aplicativos abertos, acessar o menu iniciar e visualizar notificações.'
      },
      {
        tipo: 'lista',
        itens: [
          'Menu Iniciar: Acesse todos os programas',
          'Barra de Tarefas: Alterne entre janelas abertas',
          'Área de Notificações: Visualize alertas do sistema',
          'Relógio: Sincronizado automaticamente'
        ]
      },
      {
        tipo: 'titulo',
        texto: '3. Sistemas Integrados'
      },
      {
        tipo: 'paragrafo',
        texto: 'Todos os sistemas da empresa estão pré-instalados e configurados:'
      },
      {
        tipo: 'lista',
        itens: [
          'ERP Corporativo',
          'Sistema de Gestão Financeira',
          'CRM e Atendimento',
          'Ferramentas de Produtividade (Office, etc.)'
        ]
      }
    ],
    materiais: [
      { nome: 'Mapa da Interface', link: '#', icone: 'pdf' },
      { nome: 'Lista de Sistemas', link: '#', icone: 'doc' }
    ],
    checklist: [
      'Explorei a interface virtual',
      'Testei a barra de navegação',
      'Abri os sistemas integrados',
      'Entendi como alternar entre janelas'
    ],
    faq: [
      {
        question: 'Como volto para a área de trabalho?',
        answer: 'Clique no botão "Mostrar Área de Trabalho" na barra de tarefas ou minimize todas as janelas abertas.'
      },
      {
        question: 'Posso instalar programas novos?',
        answer: 'Somente a equipe técnica pode instalar novos programas. Solicite através do suporte.'
      }
    ],
    proximoModulo: 3
  },
  3: {
    titulo: 'Infodrive: Pasta de Rede',
    videoId: 'R5cXyq3kbDQ',
    descricao: 'Compartilhamento de arquivos entre sua máquina e o servidor',
    duracao: '7 minutos',
    formato: 'Vídeo + Diagrama',
    status: 'Em andamento',
    conteudo: [
      {
        tipo: 'titulo',
        texto: 'O que é o Infodrive?'
      },
      {
        tipo: 'paragrafo',
        texto: 'O Infodrive funciona como uma "ponte" entre sua máquina local e o servidor, permitindo transferência fácil de arquivos.'
      },
      {
        tipo: 'titulo',
        texto: '1. Acessando a Pasta Infodrive'
      },
      {
        tipo: 'paragrafo',
        texto: 'A pasta Infodrive aparece automaticamente no seu explorador de arquivos quando você acessa o servidor. Ela funciona como uma pasta compartilhada que sincroniza arquivos entre sua máquina local e o ambiente virtual.'
      },
      {
        tipo: 'titulo',
        texto: '2. Transferindo Arquivos'
      },
      {
        tipo: 'paragrafo',
        texto: 'Para enviar arquivos do seu computador para o servidor, simplesmente copie e cole os arquivos na pasta Infodrive. O processo é bidirecional - você também pode baixar arquivos do servidor para sua máquina.'
      },
      {
        tipo: 'lista',
        itens: [
          'Arraste e solte arquivos diretamente na pasta',
          'Use Ctrl+C e Ctrl+V para copiar/colar',
          'Aguarde a sincronização automática'
        ]
      },
      {
        tipo: 'aviso',
        texto: 'Aguarde sempre a conclusão da transferência antes de fechar a conexão. Arquivos grandes podem levar alguns minutos para sincronizar completamente.'
      },
      {
        tipo: 'titulo',
        texto: '3. Verificando a Sincronização'
      },
      {
        tipo: 'paragrafo',
        texto: 'Após transferir arquivos, verifique se eles aparecem tanto na sua máquina quanto no servidor. Isso garante que a sincronização foi bem-sucedida.'
      },
      {
        tipo: 'diagrama',
        texto: 'Fluxo de Sincronização',
        etapas: ['Sua Máquina', 'Infodrive', 'Servidor']
      }
    ],
    materiais: [
      { nome: 'Guia Passo a Passo', link: '#', icone: 'pdf', descricao: 'PDF com capturas de tela' },
      { nome: 'Solução de Problemas', link: '#', icone: 'doc', descricao: 'FAQ sobre Infodrive' }
    ],
    checklist: [
      'Localizei a pasta Infodrive no explorador',
      'Realizei teste de envio de arquivo',
      'Verifiquei a sincronização nos dois lados',
      'Entendi o processo de transferência bidirecional'
    ],
    faq: [
      {
        question: 'A pasta Infodrive não aparece no meu explorador',
        answer: 'Verifique se você está conectado ao servidor via navegador. A pasta Infodrive só aparece quando há uma conexão ativa. Tente desconectar e reconectar, ou reinicie o explorador de arquivos.'
      },
      {
        question: 'Os arquivos não estão sincronizando',
        answer: 'Aguarde alguns minutos, especialmente para arquivos grandes. Verifique se há espaço suficiente no servidor e se a conexão com a internet está estável. Você pode ver o progresso da sincronização através do ícone na bandeja do sistema.'
      },
      {
        question: 'Posso usar o Infodrive offline?',
        answer: 'Não, o Infodrive requer uma conexão ativa com o servidor para funcionar. Se você precisar trabalhar offline, copie os arquivos para uma pasta local em sua máquina e sincronize quando a conexão for restabelecida.'
      }
    ],
    proximoModulo: 4
  },
  4: {
    titulo: 'Suporte & FAQ',
    videoId: 'HZbRpQzAWtc',
    descricao: 'Saiba quando e como acionar o suporte técnico',
    conteudo: [
      {
        tipo: 'titulo',
        texto: '1. Quando Acionar o Suporte?'
      },
      {
        tipo: 'paragrafo',
        texto: 'Identifique se a questão é dúvida de uso ou problema técnico:'
      },
      {
        tipo: 'titulo',
        texto: '2. Equipe Interna (Bruno)'
      },
      {
        tipo: 'lista',
        itens: [
          'Dúvidas sobre uso dos sistemas',
          'Treinamento de usuários',
          'Gerenciamento de permissões',
          'Solicitações de acesso'
        ]
      },
      {
        tipo: 'titulo',
        texto: '3. Desenvolvedora (Suporte Técnico)'
      },
      {
        tipo: 'lista',
        itens: [
          'Problemas de conexão',
          'Erros do servidor',
          'Falhas de sistema',
          'Questões de infraestrutura'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Para problemas técnicos, sempre acione primeiro a equipe interna que irá intermediar com a desenvolvedora.'
      },
      {
        tipo: 'titulo',
        texto: '4. Canais de Contato'
      },
      {
        tipo: 'paragrafo',
        texto: 'Utilize os canais oficiais para melhor atendimento:'
      },
      {
        tipo: 'lista',
        itens: [
          'WhatsApp: +55 (47) 98818-8996',
          'E-mail: atendimento@infowayti.com.br',
          'Horário: Segunda a Sexta, 8h às 18h | Sábado: 8h às 12h'
        ]
      }
    ],
    materiais: [
      { nome: 'FAQ Completo', link: '#', icone: 'pdf' },
      { nome: 'Contatos de Suporte', link: '#', icone: 'doc' }
    ],
    checklist: [
      'Identifiquei os canais de suporte',
      'Salvei os contatos importantes',
      'Entendi quando acionar cada equipe',
      'Li o FAQ completo'
    ],
    faq: [
      {
        question: 'Como sei se devo chamar a equipe interna ou desenvolvedora?',
        answer: 'Dúvidas de uso → Equipe interna. Problemas técnicos/erros → Desenvolvedora (através da equipe interna).'
      },
      {
        question: 'Qual o horário de atendimento?',
        answer: 'Segunda a Sexta, das 8h às 18h. Sábados das 8h às 12h. Fora desse horário, deixe mensagem que retornaremos.'
      }
    ],
    proximoModulo: null
  }
}

const ModulePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const modulo = modulosData[id]

  // TODOS OS HOOKS PRIMEIRO (sempre executar na mesma ordem)
  // Conclusão do módulo (estado local + localStorage)
  const [concluido, setConcluido] = useState(false)
  
  // Toast notification
  const [toast, setToast] = useState({ visible: false, message: '' })
  const toastTimerRef = useRef(null)
  
  // Auto-advance after video ends
  const playerRef = useRef(null)
  const [showAutoAdvance, setShowAutoAdvance] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const autoTimerRef = useRef(null)
  
  // Alerta para botão bloqueado
  const [showBlockedAlert, setShowBlockedAlert] = useState(false)
  const blockedAlertTimerRef = useRef(null)

  // Video loading state
  const [videoLoading, setVideoLoading] = useState(true)
  const [videoError, setVideoError] = useState(false)

  // Funções auxiliares
  const handleVoltar = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('trilho')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleBlockedClick = () => {
    if (!concluido) {
      setShowBlockedAlert(true)
    }
  }

  const getCategoriaModulo = (id) => {
    if (id <= 2) return 'Configuração Inicial'
    if (id === 3) return 'Armazenamento'
    return 'Suporte'
  }

  const goNextNow = () => {
    handleCancelAuto()
    if (modulo && modulo.proximoModulo) navigate(`/modulo/${modulo.proximoModulo}`)
  }

  const handleCancelAuto = () => {
    setShowAutoAdvance(false)
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
  }

  const handleEnded = () => {
    salvarConclusao(true)
    if (modulo && modulo.proximoModulo) {
      setShowAutoAdvance(true)
      setCountdown(5)
      if (autoTimerRef.current) clearInterval(autoTimerRef.current)
      autoTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(autoTimerRef.current)
            navigate(`/modulo/${modulo.proximoModulo}`)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  // UseEffects
  useEffect(() => {
    try {
      const raw = localStorage.getItem('modulosConcluidos')
      if (raw) {
        const arr = JSON.parse(raw)
        if (Array.isArray(arr) && arr.includes(parseInt(id))) {
          setConcluido(true)
        }
      }
    } catch {}
  }, [id])

  const salvarConclusao = (valor) => {
    // Show toast only on transition false -> true
    if (valor && !concluido) {
      showToast('Módulo concluído!')
      
      // Check if this is the last module and trigger confetti
      const isLastModule = !modulo.proximoModulo
      if (isLastModule) {
        triggerConfetti()
      }
    }
    setConcluido(valor)
    try {
      const raw = localStorage.getItem('modulosConcluidos')
      let arr = []
      if (raw) arr = JSON.parse(raw)
      if (!Array.isArray(arr)) arr = []
      const numId = parseInt(id)
      if (valor) {
        if (!arr.includes(numId)) arr.push(numId)
      } else {
        arr = arr.filter((x) => x !== numId)
      }
      localStorage.setItem('modulosConcluidos', JSON.stringify(arr))
    } catch {}
  }

  // Confetti celebration
  const triggerConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  // showToast function
  const showToast = (message) => {
    setToast({ visible: true, message })
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' })
    }, 3000)
  }

  useEffect(() => {
    // Reset banner on module change
    setShowAutoAdvance(false)
    setCountdown(0)
    setVideoLoading(true)
    setVideoError(false)
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
  }, [id])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC - Voltar
      if (e.key === 'Escape') {
        navigate('/')
      }
      // Arrow Right - Próximo módulo (se disponível e concluído)
      if (e.key === 'ArrowRight' && concluido && modulo.proximoModulo) {
        navigate(`/modulo/${modulo.proximoModulo}`)
      }
      // Arrow Left - Módulo anterior
      if (e.key === 'ArrowLeft') {
        const prevModulo = parseInt(id) - 1
        if (prevModulo >= 1) {
          navigate(`/modulo/${prevModulo}`)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [id, concluido, modulo, navigate])

  // Calculate overall progress
  const totalModulos = Object.keys(modulosData).length
  const completedCount = (() => {
    try {
      const raw = localStorage.getItem('modulosConcluidos')
      if (!raw) return 0
      const arr = JSON.parse(raw)
      return Array.isArray(arr) ? arr.length : 0
    } catch {
      return 0
    }
  })()
  const progressPercentage = (completedCount / totalModulos) * 100

  // VALIDAÇÕES (após todos os hooks)
  // Módulo não encontrado
  if (!modulo) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Módulo não encontrado</h2>
        <Link to="/" className="btn btn-primary">Voltar para Home</Link>
      </div>
    )
  }

  // Enforce gating: block direct access to locked modules
  const bloqueado = isModuleBlocked(parseInt(id), totalModulos)
  if (bloqueado) {
    const allowed = getAllowedModuleId(totalModulos)
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Etapa bloqueada</h2>
        <p>Conclua as etapas anteriores para acessar este módulo.</p>
        <Link to={`/modulo/${allowed}`} className="btn btn-primary">Ir para a próxima etapa liberada</Link>
      </div>
    )
  }

  // Render principal
  return (
    <div className="modulo-page">
      {/* Global Progress Bar */}
      <motion.div 
        className="global-progress-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="global-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      <div className="modulo-header">
        <div className="container-narrow">
          <Breadcrumbs 
            categoria={getCategoriaModulo(parseInt(id))}
            modulo={modulo.titulo}
          />
          
          <button onClick={handleVoltar} className="btn-voltar">
            <ArrowLeft size={20} />
          Voltar ao Dashboard
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
              <h1 className="title-with-bar">{modulo.titulo}</h1>
              <p className="modulo-descricao">{modulo.descricao}</p>
            
              {/* Badges de Info */}
              <div className="modulo-info-badges">
                {/* Progress Badge */}
                <motion.span 
                  className="info-badge badge-progress"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <CheckCircle size={16} />
                  {completedCount} de {totalModulos} concluídos
                </motion.span>
                {modulo.duracao && (
                  <span className="info-badge">{modulo.duracao}</span>
                )}
                {modulo.formato && (
                  <span className="info-badge">{modulo.formato}</span>
                )}
                {(() => {
                  const statusAtual = concluido ? 'Concluído' : (modulo.status || 'Em andamento')
                  const cls = `info-badge status-${statusAtual.toLowerCase().replace(' ', '-')}`
                  return <span className={cls}>{statusAtual}</span>
                })()}
              </div>
          </motion.div>
        </div>
      </div>

      <div className="modulo-content">
        <div className="container-narrow">
          {/* Video Player */}
          <motion.div 
            className="video-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="video-wrapper">
              {/* Video Loading Skeleton */}
              {videoLoading && (
                <div className="video-skeleton">
                  <div className="skeleton-shimmer"></div>
                  <div className="skeleton-content">
                    <Loader className="skeleton-loader" size={48} />
                    <p>Carregando vídeo...</p>
                  </div>
                </div>
              )}
              
              {/* Video Error State */}
              {videoError && (
                <div className="video-error">
                  <AlertCircle size={48} />
                  <p>Erro ao carregar o vídeo</p>
                  <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                    Tentar novamente
                  </button>
                </div>
              )}
              
              <Plyr 
                ref={playerRef}
                source={{
                  type: 'video',
                  sources: [
                    { src: modulo.videoId, provider: 'youtube' }
                  ]
                }}
                options={{
                  controls: [
                    'play-large', 'play', 'progress', 'current-time',
                    'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'
                  ],
                  youtube: { rel: 0, modestbranding: 1 }
                }}
                onReady={() => setVideoLoading(false)}
                onError={() => {
                  setVideoLoading(false)
                  setVideoError(true)
                }}
                onEnded={handleEnded}
              />
            </div>
            <div className="video-info">
              <Play size={18} />
                <span>Tutorial em Vídeo</span>
            </div>
          </motion.div>

          {/* Auto-Advance Banner */}
          <AnimatePresence>
            {showAutoAdvance && modulo.proximoModulo && (
              <motion.div 
                className="auto-advance"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="auto-advance-content">
                  <div className="auto-advance-icon">
                    <Award size={32} />
                  </div>
                  <div className="auto-advance-text">
                    <strong>Parabéns! Módulo concluído</strong>
                    <p>Avançando para o próximo módulo em <strong>{countdown}s</strong></p>
                  </div>
                  <div className="countdown-circle">
                    <svg className="countdown-svg" viewBox="0 0 36 36">
                      <path
                        className="countdown-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="countdown-progress"
                        strokeDasharray={`${(countdown / 5) * 100}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="countdown-number">{countdown}</span>
                  </div>
                </div>
                <div className="auto-advance-actions">
                  <button className="btn btn-secondary" onClick={handleCancelAuto}>Continuar aqui</button>
                  <button className="btn btn-primary" onClick={goNextNow}>Ir para próximo →</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

            {/* Toast */}
            {toast.visible && (
              <div className="toast-success" role="status" aria-live="polite">
                {toast.message}
              </div>
            )}

            {/* Conteúdo do Módulo */}
            <motion.div
              className="secao-titulo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2>Conteúdo do Módulo</h2>
            </motion.div>

            {/* Tutorial Content */}
          <motion.div 
            className="tutorial-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {modulo.conteudo.map((item, index) => {
              switch (item.tipo) {
                case 'titulo':
                  return <h2 key={index} className="content-titulo">{item.texto}</h2>
                
                case 'paragrafo':
                  return <p key={index} className="content-paragrafo">{item.texto}</p>
                
                case 'codigo':
                  return (
                    <div key={index} className="content-codigo">
                      <code>{item.texto}</code>
                    </div>
                  )
                
                case 'lista':
                  return (
                    <ul key={index} className="content-lista">
                      {item.itens.map((subitem, subindex) => (
                        <li key={subindex}>
                          <CheckCircle size={18} />
                          <span>{subitem}</span>
                        </li>
                      ))}
                    </ul>
                  )
                
                case 'dica':
                  return (
                    <div key={index} className="content-box dica">
                      <Lightbulb size={20} />
                      <span>{item.texto}</span>
                    </div>
                  )
                
                case 'aviso':
                  return (
                    <div key={index} className="content-box aviso">
                      <AlertCircle size={20} />
                      <span>{item.texto}</span>
                    </div>
                  )
                
                case 'diagrama':
                  return (
                    <div key={index} className="content-diagrama">
                      <h3 className="diagrama-titulo">{item.texto}</h3>
                      <div className="diagrama-fluxo">
                        {item.etapas.map((etapa, etapaIndex) => (
                          <div key={etapaIndex} className="diagrama-etapa">
                            <div className="diagrama-box">{etapa}</div>
                            {etapaIndex < item.etapas.length - 1 && (
                              <div className="diagrama-seta">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                
                default:
                  return null
              }
            })}
          </motion.div>

          {/* Checklist */}
          {modulo.checklist && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Checklist 
                items={modulo.checklist}
                onComplete={() => salvarConclusao(true)}
              />
            </motion.div>
          )}

          {/* Materiais Complementares */}
          {modulo.materiais && modulo.materiais.length > 0 && (
            <motion.div 
              className="materiais-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3>📎 Materiais Complementares</h3>
              <div className="materiais-grid">
                {modulo.materiais.map((material, index) => (
                  <a key={index} href={material.link} className="material-card">
                    <Download size={20} />
                    <div className="material-text">
                      <span className="material-name">{material.nome}</span>
                      {material.descricao && (
                        <small className="material-desc">{material.descricao}</small>
                      )}
                    </div>
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ */}
          {modulo.faq && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <FAQ items={modulo.faq} />
            </motion.div>
          )}

          {/* Atalhos de Teclado */}
          <motion.div
            className="keyboard-shortcuts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <span className="shortcut-hint">
              <kbd>←</kbd> Anterior
            </span>
            <span className="shortcut-hint">
              <kbd>ESC</kbd> Voltar ao início
            </span>
            {concluido && modulo.proximoModulo && (
              <span className="shortcut-hint">
                <kbd>→</kbd> Próximo
              </span>
            )}
          </motion.div>

          {/* Navegação */}
          <motion.div 
            className="modulo-navegacao"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {/* Módulo Anterior */}
            {parseInt(id) > 1 ? (
              <Link to={`/modulo/${parseInt(id) - 1}`} className="btn btn-secondary">
                <ArrowLeft size={20} />
                Módulo Anterior
              </Link>
            ) : (
              <span />
            )}

            {/* Marcar como Concluído */}
            <button
              className={`btn ${concluido ? 'btn-success' : 'btn-primary'}`}
              onClick={() => salvarConclusao(!concluido)}
            >
              <CheckCircle size={20} />
              {concluido ? 'Concluído' : 'Marcar como Concluído'}
            </button>

            {/* Próximo Módulo */}
            {modulo.proximoModulo ? (
              <>
                {concluido ? (
                  <Link 
                    to={`/modulo/${modulo.proximoModulo}`}
                    className="btn btn-primary"
                    title="Avançar para o próximo módulo"
                  >
                    Próximo Módulo
                    <ArrowRight size={20} />
                  </Link>
                ) : (
                  <button
                    className={`btn btn-primary disabled ${showBlockedAlert ? 'shake-horizontal' : ''}`}
                    onClick={handleBlockedClick}
                    title="⚠️ Marque como concluído antes de avançar"
                  >
                    Próximo Módulo
                    <ArrowRight size={20} />
                  </button>
                )}
                
                {/* Modal de Bloqueio */}
                <AnimatePresence>
                  {showBlockedAlert && (
                    <>
                      <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowBlockedAlert(false)}
                      />
                      <motion.div
                        className="blocked-modal"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", duration: 0.4 }}
                      >
                        <div className="blocked-modal-icon">
                          <AlertCircle size={48} />
                        </div>
                        <h3>Ops! Módulo não concluído</h3>
                        <p>Você precisa marcar este módulo como concluído antes de avançar para o próximo.</p>
                        <div className="blocked-modal-actions">
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              setShowBlockedAlert(false)
                              salvarConclusao(true)
                            }}
                          >
                            <CheckCircle size={18} />
                            Marcar como Concluído
                          </button>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => setShowBlockedAlert(false)}
                          >
                            Entendi
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <button onClick={handleVoltar} className="btn btn-primary">
                Concluir Implantação
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ModulePage
