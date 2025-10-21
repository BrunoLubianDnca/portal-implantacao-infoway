import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User } from 'lucide-react'
import './WhatsAppFloat.css'

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chatMode, setChatMode] = useState('menu') // 'menu', 'chat', 'agent'
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Número do WhatsApp da Infoway
  const whatsappNumber = '55 47 98818-8996' // Formato: +55 47 98818-8996 (sem o +, apenas números e espaços)

  // Scroll automático para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Inicia o chat automaticamente quando abre
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startBotChat()
    }
  }, [isOpen])

  // Base de conhecimento do chatbot (respostas automáticas)
  const knowledgeBase = {
    // Horários e Atendimento
    horario: {
      keywords: ['horario', 'horário', 'atendimento', 'aberto', 'funciona', 'disponível', 'hora'],
      answer: '**Horário de Atendimento**\n\nEstamos disponíveis:\n• Segunda a sexta: 8h às 18h\n• Sábados: até as 12h\n• Domingos e feriados: fechado\n\nFora desse horário, deixe sua mensagem que retornaremos no próximo dia útil.',
      quickActions: ['Falar com atendente', 'Menu principal']
    },
    
    // Acesso ao Sistema
    acesso: {
      keywords: ['acesso', 'login', 'entrar', 'senha', 'usuario', 'usuário', 'credenciais', 'acessar'],
      answer: '**Como Acessar o Sistema**\n\n1. Acesse o link enviado por e-mail ou WhatsApp\n2. Digite seu usuário\n3. Insira a senha fornecida pela equipe\n4. Clique em "Entrar"\n\nDica: Salve o link nos favoritos para acesso rápido!',
      quickActions: ['Esqueci minha senha', 'Falar com atendente']
    },
    
    // Senha
    senha: {
      keywords: ['senha', 'esqueci', 'recuperar', 'redefinir', 'trocar senha', 'perdi'],
      answer: '**Recuperação de Senha**\n\nPara recuperar sua senha:\n1. Entre em contato com nossa equipe\n2. Informe seu nome e empresa\n3. Receberá nova senha em até 30 minutos\n\nPor segurança, não enviamos senhas por e-mail.',
      quickActions: ['Falar com atendente agora']
    },
    
    // Prazo de Implantação
    prazo: {
      keywords: ['prazo', 'quanto tempo', 'demora', 'implantação', 'implantacao', 'duração', 'dias', 'minutos'],
      answer: '**Prazo de Implantação**\n\nTempo médio: 30 a 40 minutos\n\nO processo é rápido e simples:\n✓ Configuração inicial do sistema\n✓ Cadastro dos usuários\n✓ Ajustes personalizados\n✓ Teste de funcionalidades\n\nApós a implantação, você já pode começar a usar o sistema!',
      quickActions: ['Ver status da implantação', 'Menu principal']
    },
    
    // Tutoriais e Treinamento
    tutorial: {
      keywords: ['tutorial', 'treinamento', 'aprender', 'curso', 'video', 'vídeo', 'modulo', 'módulo', 'ajuda'],
      answer: '**Tutoriais do Portal**\n\nTodos os tutoriais estão disponíveis neste portal!\n\nComo usar:\n• Clique em "Tutoriais" no menu\n• Siga a ordem dos módulos\n• Assista aos vídeos\n• Complete os checklists\n\nOs tutoriais ficam disponíveis 24/7 para você rever quando precisar!',
      quickActions: ['Ir para tutoriais', 'Tenho dúvidas específicas']
    },
    
    // Suporte Técnico
    suporte: {
      keywords: ['problema', 'erro', 'bug', 'não funciona', 'nao funciona', 'travou', 'lento', 'suporte'],
      answer: '**Suporte Técnico**\n\nPara problemas técnicos, informe:\n\n1. O que você estava fazendo\n2. Mensagem de erro (se houver)\n3. Navegador que está usando\n4. Print da tela (se possível)\n\nNosso time técnico responde em até 2 horas úteis!',
      quickActions: ['Falar com suporte agora']
    },
    
    // Preços e Valores
    preco: {
      keywords: ['preço', 'preco', 'valor', 'quanto custa', 'custo', 'investimento', 'plano'],
      answer: '**Valores e Planos**\n\nNossos planos são personalizados conforme:\n• Tamanho da empresa\n• Número de usuários\n• Módulos necessários\n• Suporte desejado\n\nEntre em contato com nossa equipe comercial para um orçamento personalizado!',
      quickActions: ['Falar com comercial']
    },
    
    // Contato e Localização
    contato: {
      keywords: ['contato', 'telefone', 'email', 'e-mail', 'endereço', 'endereco', 'localização'],
      answer: '**Fale Conosco**\n\nWhatsApp: Clique no botão abaixo\nE-mail: contato@infoway.com.br\nSite: www.infoway.com.br\n\nAtendimento: Seg-Sex 8h-18h | Sáb 8h-12h',
      quickActions: ['Falar no WhatsApp', 'Menu principal']
    },

    // Backup e Recuperação de Dados
    backup: {
      keywords: ['backup', 'recuperação', 'recuperacao', 'dados', 'perdi dados', 'restaurar', 'sincronizar', 'sincronizacao', 'sincronização'],
      answer: '**Sistema de Backup Automático**\n\nSua tranquilidade é nossa prioridade!\n\nComo funciona:\n• Backup automático diário do seu banco de dados\n• Retenção de 7 dias de histórico\n• Sincronização em tempo real\n• Recuperação rápida em caso de necessidade\n\nSegurança:\n• Todos os dados criptografados\n• Armazenamento redundante\n• Monitoramento 24/7\n\nVocê não precisa se preocupar! Nós cuidamos de tudo automaticamente.',
      quickActions: ['Tenho mais dúvidas', 'Menu principal']
    }
  }

  // Função de IA simples para detectar intenção
  const detectIntent = (userMessage) => {
    const msg = userMessage.toLowerCase().trim()
    
    // Busca na base de conhecimento
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => msg.includes(keyword))) {
        return { intent: key, data }
      }
    }
    
    return null
  }

  // Inicia o chat com bot
  const startBotChat = () => {
    setChatMode('chat')
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Olá! Seja bem-vindo ao Suporte Infoway.\n\nDigite sua dúvida que vou te ajudar.\n\nPergunte sobre:\n• Horários de atendimento\n• Como acessar o sistema\n• Recuperar senha\n• Prazos de implantação\n• Tutoriais e treinamentos\n• Backup e dados\n• Suporte técnico',
        timestamp: new Date()
      }
    ])
  }

  // Envia mensagem do usuário
  const handleSendUserMessage = () => {
    if (!inputMessage.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputMessage('')

    // Simula "digitando..." do bot
    setTimeout(() => {
      const intent = detectIntent(inputMessage)
      
      if (intent) {
        // Bot encontrou resposta
        const botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: intent.data.answer,
          quickActions: intent.data.quickActions,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
      } else {
        // Bot não entendeu - direciona para WhatsApp
        const botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Não encontrei uma resposta pronta para isso.\n\nMas não se preocupe! Vou te conectar com nossa equipe pelo WhatsApp agora. Eles vão te ajudar com tudo!',
          quickActions: ['Falar no WhatsApp agora'],
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
        
        // Direciona automaticamente após 2 segundos
        setTimeout(() => {
          redirectToWhatsApp()
        }, 2000)
      }
    }, 1000)
  }

  // Ação rápida clicada
  const handleQuickAction = (action) => {
    if (action === 'Falar com atendente' || action === 'Falar com atendente agora' || 
        action === 'Falar com suporte agora' || action === 'Falar com comercial' ||
        action === 'Falar no WhatsApp' || action === 'Falar no WhatsApp agora') {
      redirectToWhatsApp()
    } else if (action === 'Menu principal') {
      startBotChat()
    } else if (action === 'Esqueci minha senha') {
      setInputMessage('Esqueci minha senha')
      handleSendUserMessage()
    } else if (action === 'Ver status da implantação' || action === 'Ver status da minha implantação') {
      redirectToWhatsApp('Olá! Gostaria de verificar o status da implantação da minha empresa.')
    } else if (action === 'Ir para tutoriais') {
      const trilhoSection = document.getElementById('trilho')
      if (trilhoSection) {
        window.scrollTo({ top: trilhoSection.offsetTop - 80, behavior: 'smooth' })
      }
      setIsOpen(false)
    } else if (action === 'Tenho dúvidas específicas') {
      redirectToWhatsApp('Olá! Estou com dúvidas específicas sobre os tutoriais.')
    }
  }

  // Redireciona para WhatsApp (abre em nova aba, sem sair do site)
  const redirectToWhatsApp = (customMsg = null) => {
    let finalMessage = customMsg || 'Olá! Gostaria de falar sobre o Sistema Infoway.'
    
    // Se houver histórico de chat, inclui contexto
    if (messages.length > 0 && !customMsg) {
      const lastUserMsg = messages.filter(m => m.sender === 'user').pop()
      if (lastUserMsg) {
        finalMessage = `Olá! Vim do Portal de Implantação com a seguinte dúvida:\n\n"${lastUserMsg.text}"\n\nPode me ajudar?`
      }
    }
    
    const encodedMessage = encodeURIComponent(finalMessage)
    const cleanNumber = whatsappNumber.replace(/\D/g, '') // Remove tudo que não é número
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`
    
    console.log('Abrindo WhatsApp em nova aba:', whatsappUrl) // Debug
    
    // Abre em nova aba/janela, mantendo o site aberto
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    
    // Reseta após um tempo (mantém o chat aberto por uns segundos depois)
    setTimeout(() => {
      setInputMessage('')
    }, 500)
  }

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        className={`whatsapp-float-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.span
            className="whatsapp-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            1
          </motion.span>
        )}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="whatsapp-modal"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="whatsapp-modal-header">
              <div className="whatsapp-modal-avatar">
                <img src="/images/avatar-suporte.png" alt="Infoway" />
              </div>
              <div className="whatsapp-modal-info">
                <h3>Suporte Infoway</h3>
                <p className="online-status">
                  <span className="status-dot"></span>
                  Assistente Virtual Online
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="whatsapp-modal-content">
              <div className="chat-container">
                  <div className="chat-messages">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        className={`chat-message ${msg.sender}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.sender === 'bot' && (
                          <div className="message-avatar bot-avatar">
                            <img src="/images/avatar-suporte.png" alt="Suporte" />
                          </div>
                        )}
                        <div className="message-content">
                          <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                          {msg.quickActions && (
                            <div className="quick-actions">
                              {msg.quickActions.map((action, idx) => (
                                <button
                                  key={idx}
                                  className="quick-action-btn"
                                  onClick={() => handleQuickAction(action)}
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {msg.sender === 'user' && (
                          <div className="message-avatar user">
                            <User size={16} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
            </div>

            {/* Footer com Input */}
            {isOpen && (
              <div className="whatsapp-modal-footer chat-input">
                <input
                  type="text"
                  placeholder="Digite sua dúvida..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendUserMessage()}
                />
                <button
                  className="send-btn"
                  onClick={handleSendUserMessage}
                  disabled={!inputMessage.trim()}
                  title="Enviar mensagem"
                >
                  <Send size={20} />
                </button>
                <button
                  className="whatsapp-direct-btn"
                  onClick={() => redirectToWhatsApp(inputMessage || undefined)}
                  title="Ir direto para WhatsApp"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppFloat
