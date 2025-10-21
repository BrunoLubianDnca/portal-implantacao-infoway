import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Play,
  Loader,
  Award,
  Image,
  X,
  HeadphonesIcon,
  Shield,
  Sparkles
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
    duracao: '5 minutos',
    formato: 'Vídeo + Tutorial',
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
        texto: 'https://nomedaempresa.infowaycloud.com.br/'
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
        tipo: 'imagem-opcional',
        src: '/images/trilho/tela-login.png',
        alt: 'Tela de login do servidor Infoway',
        label: 'Ver exemplo da tela de login'
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
        answer: 'Entre em contato com a equipe de suporte para solicitar a redefinição de senha.'
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
    duracao: '10 minutos',
    formato: 'Vídeo + Tutorial Interativo',
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
        texto: '3. Sistemas e Programas Disponíveis'
      },
      {
        tipo: 'paragrafo',
        texto: 'Seu ambiente Cloud já está configurado com todos os sistemas contratados da Linha Visual SCI:'
      },
      {
        tipo: 'sistemas-sci',
        sistemas: [
          {
            icone: '/images/trilho/Sci/ico_practice.png',
            nome: 'SCI VISUAL Practice',
            descricao: 'Folha de Pagamento e RH'
          },
          {
            icone: '/images/trilho/Sci/ico_suprema.png',
            nome: 'SCI VISUAL Suprema',
            descricao: 'Escrita Fiscal'
          },
          {
            icone: '/images/trilho/Sci/ico_sucessor.png',
            nome: 'SCI VISUAL Sucessor',
            descricao: 'Contabilidade'
          },
          {
            icone: '/images/trilho/Sci/ico_controller.png',
            nome: 'SCI VISUAL Controller',
            descricao: 'Gestão de Serviços'
          },
          {
            icone: null,
            nome: 'SCI VISUAL SYNDIKOS',
            descricao: 'Administração de Condomínios'
          }
        ]
      },
      {
        tipo: 'paragrafo',
        texto: 'Também incluímos ferramentas essenciais para seu trabalho:'
      },
      {
        tipo: 'lista',
        itens: [
          'WPS Office (editor de textos, planilhas e apresentações)',
          'Infodrive (gerenciador de arquivos na nuvem - 5 GB gratuitos)'
        ]
      },
      {
        tipo: 'dica',
        texto: 'O Infodrive oferece 5 GB de espaço gratuito, suficiente para a maioria dos usuários. Se precisar de mais recursos (backup automático, controle de permissões), há uma versão paga disponível.'
      },
      {
        tipo: 'destaque',
        texto: 'IMPORTANTE: Estes são os únicos programas incluídos no ambiente padrão. Não realizamos instalação de softwares adicionais que não fazem parte do escopo de serviços Cloud da Infoway.'
      }
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
        question: 'Quais programas já estão instalados no servidor?',
        answer: 'Seu ambiente vem com todos os sistemas da Linha Visual SCI (Practice, Suprema, Sucessor, Controller e SYNDIKOS), além de WPS Office, navegadores web e Infodrive. Estes são os únicos programas incluídos no ambiente padrão.'
      },
      {
        question: 'Quanto espaço tenho no Infodrive?',
        answer: 'O Infodrive oferece 5 GB de espaço gratuito, suficiente para a maioria dos usuários que acessam via web. Se precisar de mais recursos como backup automático e controle de permissões, há uma versão paga disponível.'
      },
      {
        question: 'Posso solicitar instalação de outros programas?',
        answer: 'Não. O ambiente Cloud da Infoway é fornecido com os programas padrão listados acima. Não realizamos instalação de softwares adicionais, pois isso foge do escopo dos serviços Cloud contratados.'
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
        tipo: 'imagem-opcional',
        src: '/images/trilho/infodrive-explorador.png',
        alt: 'Localização da pasta Infodrive no Windows Explorer',
        label: 'Ver onde fica a pasta Infodrive'
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
        tipo: 'imagem-opcional',
        src: '/images/trilho/infodrive-sincronizando.png',
        alt: 'Ícone de sincronização do Infodrive',
        label: 'Ver ícone de sincronização'
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
    titulo: 'Suporte Infoway – Quando e Como Acionar',
    videoId: 'HZbRpQzAWtc',
    descricao: 'Entenda o escopo do suporte Infoway e quando acionar',
    useTabs: true,
    tabs: {
      suporte: {
        label: 'Suporte',
        icon: 'HeadphonesIcon',
        conteudo: [
      {
        tipo: 'titulo',
        texto: '1. Suporte Prestado pela Infoway'
      },
      {
        tipo: 'paragrafo',
        texto: 'Nosso suporte cobre toda a parte do servidor em nuvem. Também oferecemos suporte básico aos sistemas contábeis como SCI, Domínio, Contmatic, Questor, entre outros.'
      },
      {
        tipo: 'lista',
        itens: [
          'Acesso ao servidor em nuvem',
          'Configuração do Infodrive',
          'Instalação de certificados digitais',
          'Configuração do acesso em outras máquinas',
          'Suporte básico aos sistemas contábeis'
        ]
      },
      {
        tipo: 'titulo',
        texto: '2. Atualização dos Sistemas'
      },
      {
        tipo: 'paragrafo',
        texto: 'Fazemos a atualização dos sistemas contábeis e dos sistemas de governo.'
      },
      {
        tipo: 'dica',
        texto: 'Já estamos trabalhando na automação desse processo para facilitar ainda mais!'
      },
      {
        tipo: 'destaque',
        texto: 'IMPORTANTE: Sempre que houver uma nova atualização disponível, é necessário nos acionar para podermos aplicá-la.'
      },
      {
        tipo: 'titulo',
        texto: '3. Problemas Específicos dos Sistemas'
      },
      {
        tipo: 'paragrafo',
        texto: 'Problemas mais específicos ou erros internos dos sistemas contábeis (como erros de cálculo ou funcionamento específico):'
      },
      {
        tipo: 'dica',
        texto: 'Sempre nos procure primeiro! Vamos te orientar e, se necessário, encaminhar para o suporte correto.'
      },
      {
        tipo: 'destaque',
        texto: 'IMPORTANTE: Devem ser tratados diretamente com o suporte técnico especializado de cada sistema.'
      },
      {
        tipo: 'titulo',
        texto: '4. Quando Acionar o Suporte Infoway?'
      },
      {
        tipo: 'paragrafo',
        texto: 'Entre em contato conosco quando:'
      },
      {
        tipo: 'lista',
        itens: [
          'Não conseguir acessar o servidor',
          'O Infodrive não estiver funcionando',
          'Precisar atualizar o sistema',
          'Precisar configurar acesso em nova máquina',
          'Tiver dúvidas sobre certificados digitais',
          'Encontrar qualquer problema no servidor'
        ]
      },
      {
        tipo: 'titulo',
        texto: '5. Canais de Contato'
      },
      {
        tipo: 'paragrafo',
        texto: 'Utilize nossos canais oficiais para atendimento rápido:'
      },
      {
        tipo: 'lista',
        itens: [
          'WhatsApp: +55 (47) 98818-8996',
          'E-mail: atendimento@infowayti.com.br',
          'Horário: Segunda a Sexta, 8h às 18h | Sábado: 8h às 12h'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Fora do horário comercial, deixe sua mensagem que retornaremos no próximo dia útil!'
      }
        ]
      },
      seguranca: {
        label: 'Segurança',
        icon: 'Shield',
        conteudo: [
      {
        tipo: 'titulo',
        texto: '1. Backup e Segurança dos Seus Dados'
      },
      {
        tipo: 'paragrafo',
        texto: 'Seu ambiente em nuvem conta com proteção automática e conformidade com as normas de segurança da informação.'
      },
      {
        tipo: 'lista',
        itens: [
          'Backup diário automático de todos os seus dados',
          'Retenção de 7 dias (última semana disponível)',
          'Conformidade com a LGPD (Lei Geral de Proteção de Dados)',
          'Redundância técnica para garantir disponibilidade',
          'Possibilidade de solicitar cópia dos backups'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Como Solicitar Restauração: Entre em contato pelo WhatsApp ou e-mail informando a data do backup que precisa (dentro dos últimos 7 dias). Nossa equipe fará a restauração em até 4 horas úteis.'
      },
      {
        tipo: 'titulo',
        texto: '2. O Que NÃO Está Incluído no Suporte Cloud'
      },
      {
        tipo: 'paragrafo',
        texto: 'Para manter o foco no servidor em nuvem, alguns serviços não fazem parte do escopo do suporte Infoway:'
      },
      {
        tipo: 'lista-negativa',
        itens: [
          'Suporte técnico a notebooks e computadores pessoais',
          'Problemas de internet ou rede local da sua empresa',
          'Configurações de roteadores e switches',
          'Manutenção de hardware (impressoras físicas, scanners, etc.)',
          'Instalação de programas em máquinas locais',
          'Suporte a softwares não relacionados ao servidor'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Dica: Para problemas de infraestrutura local, você pode solicitar suporte técnico separado. Entre em contato conosco para orçamento e agendamento.'
      },
      {
        tipo: 'titulo',
        texto: '3. Acesso Administrativo ao Servidor'
      },
      {
        tipo: 'paragrafo',
        texto: 'Por questões de segurança, estabilidade e compliance, apenas a equipe técnica da Infoway possui acesso administrativo ao servidor em nuvem.'
      },
      {
        tipo: 'lista',
        itens: [
          'Garante que configurações críticas não sejam alteradas acidentalmente',
          'Mantém a segurança e integridade do ambiente',
          'Assegura conformidade com normas técnicas e legais',
          'Permite suporte mais ágil quando necessário'
        ]
      },
      {
        tipo: 'paragrafo',
        texto: 'Se você precisar de qualquer ajuste administrativo (instalação de programas, configurações de sistema, alterações de permissões), basta entrar em contato conosco!'
      }
        ]
      },
      dicas: {
        label: 'Boas Práticas',
        icon: 'Sparkles',
        conteudo: [
      {
        tipo: 'titulo',
        texto: '1. Serviços Inclusos na Sua Implantação'
      },
      {
        tipo: 'paragrafo',
        texto: 'Durante o processo de implantação, nossa equipe Realiza  diversos serviços para garantir que seu ambiente Ficar pronto para uso:'
      },
      {
        tipo: 'lista',
        itens: [
          'Criação e configuração completa do ambiente Cloud',
          'Migração de todos os seus dados para o servidor',
          'Configuração das rotinas automáticas de backup',
          'Instalação e configuração de impressoras',
          'Criação de usuários e definição de acessos',
          'Otimização de desempenho para seu sistema'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Tudo isso foi feito para você começar a trabalhar imediatamente, sem preocupações técnicas!'
      },
      {
        tipo: 'titulo',
        texto: '2. Boas Práticas e Recomendações'
      },
      {
        tipo: 'paragrafo',
        texto: 'Para aproveitar ao máximo seu ambiente Cloud, siga estas orientações:'
      },
      {
        tipo: 'lista',
        itens: [
          'Nunca compartilhe suas credenciais de acesso',
          'Em caso de dúvidas, sempre nos consulte antes de tentar resolver sozinho',
          'Solicite atualizações de sistema regularmente',
          'Feche programas que não está usando para otimizar performance'
        ]
      },
      {
        tipo: 'dica',
        texto: 'Configure lembretes de pagamento! Manter a mensalidade em dia garante acesso ininterrupto ao seu ambiente Cloud e evita qualquer risco de perda de dados ou interrupção do serviço.'
      }
        ]
      }
    },
    checklist: [
      'Entendi o que o suporte Infoway atende',
      'Salvei os contatos de atendimento',
      'Sei quando acionar o suporte',
      'Compreendi a diferença entre Infoway e SCI',
      'Entendi como funciona o backup (7 dias)',
      'Sei o que NÃO está incluído no suporte'
    ],
    faq: [
      {
        question: 'O que a Infoway atende?',
        answer: 'Atendemos toda a parte do servidor em nuvem (acesso, Infodrive, certificados, atualizações) e damos suporte básico aos sistemas contábeis como SCI, Domínio, Contmatic, Questor, entre outros.'
      },
      {
        question: 'Como funciona a atualização dos sistemas?',
        answer: 'Fazemos a atualização dos sistemas contábeis e dos sistemas de governo. Sempre que houver uma atualização disponível, entre em contato conosco para aplicá-la. Estamos trabalhando para automatizar esse processo!'
      },
      {
        question: 'Quando devo acionar o suporte do próprio sistema?',
        answer: 'Problemas específicos ou erros internos dos sistemas contábeis (erros de cálculo, funcionalidades específicas) devem ser tratados com o suporte especializado de cada sistema. Mas sempre nos procure primeiro - vamos orientar e encaminhar se necessário!'
      },
      {
        question: 'Como funciona o backup dos meus dados?',
        answer: 'Realizamos backup diário automático com retenção de 7 dias. Isso significa que você pode solicitar a restauração de dados de qualquer um dos últimos 7 dias. Para solicitar, entre em contato pelo WhatsApp ou e-mail informando a data desejada.'
      },
      {
        question: 'Posso instalar programas no servidor?',
        answer: 'Não. O ambiente Cloud da Infoway é fornecido com os programas padrão (sistemas SCI, WPS Office, navegadores). Não realizamos instalação de softwares adicionais, pois isso foge do escopo dos serviços Cloud contratados.'
      },
      {
        question: 'O que acontece se eu atrasar o pagamento?',
        answer: 'Para garantir a continuidade do serviço, é importante manter os pagamentos em dia. Em caso de atraso prolongado, o acesso pode ser temporariamente suspenso. Recomendamos configurar lembretes ou débito automático para evitar qualquer interrupção no seu trabalho.'
      },
      {
        question: 'Quanto tempo leva para o suporte responder?',
        answer: 'Durante horário comercial, respondemos em até 2 horas. Problemas urgentes são priorizados e atendidos imediatamente.'
      },
      {
        question: 'Posso ligar diretamente?',
        answer: 'Sim! O WhatsApp +55 (47) 98818-8996 aceita ligações durante nosso horário de atendimento: Seg-Sex 8h-18h | Sáb 8h-12h.'
      },
      {
        question: 'Meus dados estão seguros e em conformidade com a LGPD?',
        answer: 'Sim! Seu ambiente Cloud está em total conformidade com a LGPD (Lei Geral de Proteção de Dados). A Infoway atua como operadora dos dados, seguindo todas as normas de segurança da informação, com backup diário, redundância técnica e proteção contra riscos cibernéticos.'
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
  
  // Lightbox para imagens
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' })
  // Tabs para Módulo 4
  const [activeTab, setActiveTab] = useState('suporte')

  // Remove loading após 3 segundos (fallback)
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (videoLoading) {
        setVideoLoading(false)
      }
    }, 3000)
    
    return () => clearTimeout(loadingTimeout)
  }, [videoLoading])

  // ESC para fechar lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightbox.open) {
          closeLightbox()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightbox.open])

  // Rastrear entrada no módulo
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'visualizar_modulo', {
        modulo_id: id,
        page_title: `Módulo ${id}`
      })
    }
  }, [id])

  // Focus trap no lightbox (acessibilidade)
  useEffect(() => {
    if (!lightbox.open) return

    const lightboxElement = document.querySelector('.lightbox-overlay')
    if (!lightboxElement) return

    const focusableElements = lightboxElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus no botão fechar ao abrir
    if (firstElement) {
      setTimeout(() => firstElement.focus(), 100)
    }

    const handleTab = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        // Tab normal
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    lightboxElement.addEventListener('keydown', handleTab)
    return () => lightboxElement.removeEventListener('keydown', handleTab)
  }, [lightbox.open])

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
  
  // Lightbox functions
  const openLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt })
  }

  const closeLightbox = () => {
    setLightbox({ open: false, src: '', alt: '' })
  }

  const salvarConclusao = (valor) => {
    // Show toast only on transition false -> true
    if (valor && !concluido) {
      showToast('Módulo concluído!')
      
      // Rastrear conclusão do módulo
      if (window.gtag) {
        window.gtag('event', 'concluir_modulo', {
          modulo_id: id,
          metodo: 'checklist'
        })
      }
      
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
      
      // Check if ALL modules are now completed
      if (valor && arr.length === 4) {
        setTimeout(() => {
          triggerGrandFinaleConfetti()
        }, 500)
      }
    } catch {}
  }

  // Confetti celebration for completing a module
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

  // Grand finale confetti when ALL 4 modules are completed
  const triggerGrandFinaleConfetti = () => {
    const duration = 5000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 45, spread: 360, ticks: 80, zIndex: 10000 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    // Initial burst from center
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      colors: ['#FF6B35', '#F7931E', '#FFC107', '#4CAF50', '#2196F3'],
      zIndex: 10000
    })

    // Continuous celebration
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 70 * (timeLeft / duration)
      
      // Left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF6B35', '#F7931E', '#FFC107']
      })
      // Right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#4CAF50', '#2196F3', '#9C27B0']
      })
      // Center bursts
      if (Math.random() > 0.7) {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF6B35', '#FFC107', '#4CAF50'],
          zIndex: 10000
        })
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#2196F3', '#9C27B0', '#F7931E'],
          zIndex: 10000
        })
      }
    }, 200)

    // Show special toast message
    showToast('Parabéns! Você completou todos os módulos!')
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
    
    // Carregar estado de conclusão do localStorage
    try {
      const raw = localStorage.getItem('modulosConcluidos')
      if (raw) {
        const arr = JSON.parse(raw)
        if (Array.isArray(arr) && arr.includes(parseInt(id))) {
          setConcluido(true)
        } else {
          setConcluido(false)
        }
      } else {
        setConcluido(false)
      }
    } catch {
      setConcluido(false)
    }

    // Pré-carregar imagens do módulo em cache
    if (modulo && modulo.conteudo) {
      modulo.conteudo.forEach(item => {
        if (item.tipo === 'imagem-opcional' && item.src) {
          const img = document.createElement('img')
          img.src = item.src
        }
      })
    }
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
                {/* Progress Badge - Destaque */}
                <motion.span 
                  className="info-badge badge-progress"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{ 
                    fontSize: '1rem',
                    fontWeight: '600',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <CheckCircle size={18} />
                  Módulo {id} de {totalModulos} • {completedCount} concluídos
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
          <div 
            key={`video-container-${id}`}
            className="video-container"
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
              
              {/* YouTube Iframe Direct */}
              <div className="video-responsive">
                <iframe
                  src={`https://www.youtube.com/embed/${modulo.videoId}?rel=0&modestbranding=1`}
                  title={modulo.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setVideoLoading(false)}
                ></iframe>
              </div>
            </div>
            <div className="video-info">
              <Play size={18} />
                <span>Tutorial em Vídeo</span>
            </div>
            
            {/* Botão rápido de conclusão */}
            {!concluido && modulo.proximoModulo && (
              <motion.div
                className="quick-complete-banner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p>Terminou de assistir?</p>
                <button 
                  className="btn btn-primary btn-complete-advance"
                  onClick={() => {
                    salvarConclusao(true)
                    if (window.gtag) {
                      window.gtag('event', 'concluir_modulo_via_botao', {
                        modulo_id: id
                      })
                    }
                    showToast('Módulo concluído!')
                    setTimeout(() => {
                      navigate(`/modulo/${modulo.proximoModulo}`)
                    }, 500)
                  }}
                >
                  <CheckCircle size={20} />
                  Concluir e Avançar →
                </button>
              </motion.div>
            )}
            
            {/* Indicador de scroll - Apenas no último módulo */}
            {parseInt(id) === 4 && !concluido && (
              <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <button 
                  className="btn-scroll-down"
                  onClick={() => {
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: 'smooth'
                    })
                  }}
                  aria-label="Rolar para baixo"
                >
                  <span>Role para baixo para concluir</span>
                  <motion.div
                    className="scroll-arrow"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ↓
                  </motion.div>
                </button>
              </motion.div>
            )}
          </div>

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
            {/* Tabs para Módulo 4 */}
            {modulo.useTabs && modulo.tabs && (
              <div className="content-tabs">
                <div className="tabs-header">
                  {Object.entries(modulo.tabs).map(([key, tab]) => {
                    const IconComponent = tab.icon === 'HeadphonesIcon' ? HeadphonesIcon : 
                                         tab.icon === 'Shield' ? Shield : Sparkles
                    return (
                      <button
                        key={key}
                        className={`tab-button ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}
                        title={key !== 'suporte' ? 'Clique para ver mais' : ''}
                      >
                        <IconComponent className="tab-icon" size={20} />
                        <span className="tab-label">{tab.label}</span>
                        {key !== 'suporte' && (
                          <span className="tab-tooltip">
                            <span className="tooltip-arrow">👉</span>
                            Clique para ver mais
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="tabs-content">
                  {modulo.tabs[activeTab].conteudo.map((item, index) => {
                    switch (item.tipo) {
                      case 'titulo':
                        return <h2 key={index} className="content-titulo">{item.texto}</h2>
                      
                      case 'paragrafo':
                        return <p key={index} className="content-paragrafo">{item.texto}</p>
                      
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
                      
                      case 'lista-negativa':
                        return (
                          <ul key={index} className="content-lista content-lista-negativa">
                            {item.itens.map((subitem, subindex) => (
                              <li key={subindex}>
                                <X size={18} style={{ color: '#ef4444' }} />
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
                      
                      case 'destaque':
                        return (
                          <div key={index} className="content-box destaque-importante">
                            <AlertCircle size={20} />
                            <span>{item.texto}</span>
                          </div>
                        )
                      
                      default:
                        return null
                    }
                  })}
                </div>
                <div className="tabs-footer">
                  <p className="tabs-footer-text">
                    💡 <strong>Saiba Mais:</strong> Explore as outras abas para informações adicionais
                  </p>
                </div>
              </div>
            )}

            {/* Conteúdo normal para módulos sem tabs */}
            {!modulo.useTabs && modulo.conteudo && modulo.conteudo.map((item, index) => {
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
                
                case 'lista-negativa':
                  return (
                    <ul key={index} className="content-lista content-lista-negativa">
                      {item.itens.map((subitem, subindex) => (
                        <li key={subindex}>
                          <X size={18} style={{ color: '#ef4444' }} />
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
                
                case 'destaque':
                  return (
                    <div key={index} className="content-box destaque-importante">
                      <AlertCircle size={20} />
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
                
                case 'sistemas-sci':
                  return (
                    <div key={index} className="sistemas-sci-grid">
                      {item.sistemas.map((sistema, sysIndex) => (
                        <div key={sysIndex} className="sistema-card">
                          {sistema.icone && (
                            <div className="sistema-icone">
                              <img src={sistema.icone} alt={sistema.nome} />
                            </div>
                          )}
                          <div className="sistema-info">
                            <h4 className="sistema-nome">{sistema.nome}</h4>
                            <p className="sistema-descricao">{sistema.descricao}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                
                case 'imagem-opcional':
                  return (
                    <button 
                      key={index}
                      className="btn-ver-imagem"
                      onClick={() => openLightbox(item.src, item.alt)}
                      type="button"
                    >
                      <Image size={18} />
                      {item.label}
                    </button>
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
                    title="Marque como concluído antes de avançar"
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

      {/* Lightbox para imagens opcionais */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div 
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <h2 id="lightbox-title" className="sr-only">{lightbox.alt}</h2>
            <button 
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Fechar imagem (ESC)"
            >
              <X size={24} />
            </button>
            <motion.div 
              className="lightbox-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightbox.src} 
                alt={lightbox.alt}
                className="lightbox-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModulePage
