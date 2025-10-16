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
  const whatsappNumber = '5547988188996' // +55 47 98818-8996

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
      answer: '🕐 **Horário de Atendimento**\n\nEstamos disponíveis:\n• Segunda a Sexta: 8h às 18h\n• Sábados Até as  12h , \ndomingos e feriados: Fechado\n\n📱 Fora desse horário, deixe sua mensagem que retornamos no próximo dia útil!',
      quickActions: ['Falar com atendente', 'Menu principal']
    },
    
    // Acesso ao Sistema
    acesso: {
      keywords: ['acesso', 'login', 'entrar', 'senha', 'usuario', 'usuário', 'credenciais', 'acessar'],
      answer: '🔑 **Como Acessar o Sistema**\n\n1️⃣ Acesse o link enviado por e-mail ou WhatsApp\n2️⃣ Digite seu usuário\n3️⃣ Insira a senha fornecida pela equipe\n4️⃣ Clique em "Entrar"\n\n💡 *Dica:* Salve o link nos favoritos para acesso rápido!',
      quickActions: ['Esqueci minha senha', 'Falar com atendente']
    },
    
    // Senha
    senha: {
      keywords: ['senha', 'esqueci', 'recuperar', 'redefinir', 'trocar senha', 'perdi'],
      answer: '🔐 **Recuperação de Senha**\n\nPara recuperar sua senha:\n1️⃣ Entre em contato com nossa equipe\n2️⃣ Informe seu nome e empresa\n3️⃣ Receberá nova senha em até 30 minutos\n\n⚠️ Por segurança, não enviamos senhas por e-mail.',
      quickActions: ['Falar com atendente agora']
    },
    
    // Prazo de Implantação
    prazo: {
      keywords: ['prazo', 'quanto tempo', 'demora', 'implantação', 'implantacao', 'duração', 'dias'],
      answer: '⏱️ **Prazo de Implantação**\n\n📅 Tempo médio: **30 a 45 dias úteis**\n\nO prazo varia conforme:\n• Complexidade da empresa\n• Quantidade de usuários\n• Dados a serem migrados\n• Customizações solicitadas\n\n✅ Você receberá um cronograma detalhado no início do processo!',
      quickActions: ['Ver status da minha implantação', 'Menu principal']
    },
    
    // Tutoriais e Treinamento
    tutorial: {
      keywords: ['tutorial', 'treinamento', 'aprender', 'curso', 'video', 'vídeo', 'modulo', 'módulo', 'ajuda'],
      answer: '📚 **Tutoriais do Portal**\n\nTodos os tutoriais estão disponíveis neste portal!\n\n🎯 **Como usar:**\n• Clique em "Tutoriais" no menu\n• Siga a ordem dos módulos\n• Assista aos vídeos\n• Complete os checklists\n\n💡 Os tutoriais ficam disponíveis 24/7 para você rever quando precisar!',
      quickActions: ['Ir para tutoriais', 'Tenho dúvidas específicas']
    },
    
    // Suporte Técnico
    suporte: {
      keywords: ['problema', 'erro', 'bug', 'não funciona', 'nao funciona', 'travou', 'lento', 'suporte'],
      answer: '🔧 **Suporte Técnico**\n\nPara problemas técnicos, informe:\n\n1️⃣ O que você estava fazendo\n2️⃣ Mensagem de erro (se houver)\n3️⃣ Navegador que está usando\n4️⃣ Print da tela (se possível)\n\n⚡ Nosso time técnico responde em até 2 horas úteis!',
      quickActions: ['Falar com suporte agora']
    },
    
    // Preços e Valores
    preco: {
      keywords: ['preço', 'preco', 'valor', 'quanto custa', 'custo', 'investimento', 'plano'],
      answer: '💰 **Valores e Planos**\n\nNossos planos são personalizados conforme:\n• Tamanho da empresa\n• Número de usuários\n• Módulos necessários\n• Suporte desejado\n\n📞 Entre em contato com nossa equipe comercial para um orçamento personalizado!',
      quickActions: ['Falar com comercial']
    },
    
    // Contato e Localização
    contato: {
      keywords: ['contato', 'telefone', 'email', 'e-mail', 'endereço', 'endereco', 'localização'],
      answer: '📞 **Fale Conosco**\n\n📱 WhatsApp: Clique no botão abaixo\n📧 E-mail: contato@infoway.com.br\n🌐 Site: www.infoway.com.br\n\n⏰ Atendimento: Seg-Sex, 8h-18h | Sáb: 8h-12h',
      quickActions: ['Falar no WhatsApp', 'Menu principal']
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
        text: '👋 Olá! Seja bem-vindo ao Suporte Infoway!\n\nDigite sua dúvida que vou te ajudar.\n\n💡 *Pergunte sobre:*\n• Horários de atendimento\n• Como acessar o sistema\n• Recuperar senha\n• Prazos de implantação\n• Tutoriais e treinamentos\n• Suporte técnico',
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
          text: '🤔 Hmm, não encontrei uma resposta pronta para isso.\n\nMas não se preocupe! Vou te conectar com nossa equipe pelo WhatsApp agora. Eles vão te ajudar com tudo! 😊',
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
    } else if (action === 'Ver status da minha implantação') {
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

  // Redireciona para WhatsApp
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
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    
    // Reseta
    setTimeout(() => {
      setIsOpen(false)
      setChatMode('chat')
      setMessages([])
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
                >
                  <Send size={20} />
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
