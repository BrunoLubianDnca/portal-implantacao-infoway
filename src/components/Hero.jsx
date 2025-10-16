import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { getConcludedFromStorage } from '../utils/progress'
import './Hero.css'

const Hero = () => {
  const [progressData, setProgressData] = useState({
    completados: 0,
    total: 4,
    porcentagem: 0,
    tempoRestante: '~30min'
  })

  useEffect(() => {
    // Atualizar progresso do localStorage
    const atualizarProgresso = () => {
      const completados = getConcludedFromStorage().length
      const total = 4
      const porcentagem = Math.round((completados / total) * 100)
      
      // Calcular tempo restante (7.5min por módulo)
      const minutosRestantes = (total - completados) * 7.5
      const tempoRestante = minutosRestantes === 0 
        ? 'Concluído!' 
        : `~${Math.ceil(minutosRestantes)}min`

      setProgressData({
        completados,
        total,
        porcentagem,
        tempoRestante
      })
    }

    atualizarProgresso()
    
    // Listener para mudanças no localStorage
    window.addEventListener('storage', atualizarProgresso)
    
    // Polling a cada 2s para capturar mudanças na mesma aba
    const interval = setInterval(atualizarProgresso, 2000)

    return () => {
      window.removeEventListener('storage', atualizarProgresso)
      clearInterval(interval)
    }
  }, [])

  const scrollToTrilho = () => {
    document.getElementById('trilho')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-brand">
              <img src="/images/Logo Infoway Op01.png" alt="Infoway" className="hero-logo" />
              <div className="hero-brand-text">
                <h2 className="hero-brand-title">Infoway</h2>
                <p className="hero-brand-subtitle">Portal de Implantação</p>
              </div>
            </div>

            <h1 className="hero-title-main">
              Implante seu sistema em poucos minutos
            </h1>

            <p className="hero-subtitle">
              Assista ao manual em vídeo e siga as etapas passo a passo.
            </p>

            <div className="hero-buttons">
              <button onClick={scrollToTrilho} className="btn btn-primary btn-hero btn-cta-main">
                <Play size={24} />
                Assistir Manual de Implantação
              </button>
              <a href="#trilho" className="hero-link-secondary">
                Ver todas as etapas →
              </a>
            </div>

            <div className="hero-progress-container">
              <div className="hero-progress-header">
                <span className="progress-label">Seu Progresso</span>
                <span className="progress-percentage">{progressData.porcentagem}% concluído</span>
              </div>
              <div className="hero-progress-bar">
                <motion.div 
                  className="hero-progress-fill" 
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressData.porcentagem}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <strong>{progressData.completados}/{progressData.total}</strong>
                  <span>Etapas Concluídas</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <strong>{progressData.tempoRestante}</strong>
                  <span>Tempo Restante</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual-new"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="video-thumbnail">
              <div className="video-play-overlay">
                <div className="play-button-large" onClick={scrollToTrilho}>
                  <Play size={48} />
                </div>
              </div>
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <Play size={64} />
                  <p>Manual de Implantação</p>
                  <span>Aprenda em 30 minutos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="var(--lighter-gray)"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
