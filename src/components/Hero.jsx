import React, { useState, useEffect, useRef } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { getConcludedFromStorage } from '../utils/progress'
import './Hero.css'

const Hero = () => {
  // Progresso (preservado)
  const [progressData, setProgressData] = useState({
    completados: 0,
    total: 4,
    porcentagem: 0,
    tempoRestante: '~30min'
  })

  useEffect(() => {
    const atualizarProgresso = () => {
      const completados = getConcludedFromStorage().length
      const total = 4
      const porcentagem = Math.round((completados / total) * 100)
      const minutosRestantes = (total - completados) * 7.5
      const tempoRestante = minutosRestantes === 0 ? 'Concluído!' : `~${Math.ceil(minutosRestantes)}min`
      setProgressData({ completados, total, porcentagem, tempoRestante })
    }
    atualizarProgresso()
    window.addEventListener('storage', atualizarProgresso)
    const interval = setInterval(atualizarProgresso, 2000)
    return () => { window.removeEventListener('storage', atualizarProgresso); clearInterval(interval) }
  }, [])

  // Video controls
  const videoRef = useRef(null)
  const [autoplayAllowed, setAutoplayAllowed] = useState(false)
  const [showUnmute, setShowUnmute] = useState(false)
  const [showPlayOverlay, setShowPlayOverlay] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Try to play muted (should work); then try to unmute and play
    const tryPlay = async () => {
      try {
        v.muted = true
        v.preload = 'auto'
        await v.play()
        setAutoplayAllowed(true)
        // try to unmute briefly
        try {
          v.muted = false
          await v.play()
          // if succeeds, re-mute (we'll keep muted until user interacts)
          v.muted = true
        } catch (e) {
          // unmute blocked — show control
          v.muted = true
          setShowUnmute(true)
        }
      } catch (err) {
        // autoplay blocked entirely
        setAutoplayAllowed(false)
        // show central play overlay so user can manually start
        setShowPlayOverlay(true)
      }
    }

    tryPlay()

    // Space key toggles play/pause
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (v.paused) v.play().catch(() => {})
        else v.pause()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleUnmute = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      v.muted = false
      await v.play()
      setShowUnmute(false)
    } catch (e) {
      // still blocked; keep showing control
      setShowUnmute(true)
    }
  }

  const handlePlayOverlay = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      await v.play()
      setAutoplayAllowed(true)
      setShowPlayOverlay(false)
      // keep muted until user explicitly unmutes
      v.muted = true
    } catch (e) {
      // still blocked
      setShowPlayOverlay(true)
    }
  }

  const handleStartNow = async () => {
    // animate fade-out
    setIsFadingOut(true)
    // small delay to let animation run
    setTimeout(() => {
      const v = videoRef.current
      if (v) {
        try { v.pause() } catch(e){}
        try { v.muted = true } catch(e){}
      }
      // scroll to main content
      const target = document.getElementById('main-content') || document.getElementById('trilho') || document.getElementById('home')
      if (target) target.scrollIntoView({ behavior: 'smooth' })
      setIsFadingOut(false)
    }, 400)
  }

  return (
    <section className={`hero hero--fullscreen ${isFadingOut ? 'is-fading' : ''}`}>
      {/* Video background */}
      <video
        ref={videoRef}
        className="video-bg"
        src="/images/trilho/portal/Inicio.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay gradient */}
      <div className="overlay-gradient absolute inset-0 z-10 pointer-events-none" />

      {/* Controls: unmute */}
      {showUnmute && (
        <div className="absolute top-4 right-4 z-20">
          <button className="btn-unmute" onClick={handleUnmute}>
            <Play /> Ativar som
          </button>
        </div>
      )}

      {/* Play overlay when autoplay is blocked */}
      {showPlayOverlay && (
        <div className="play-overlay">
          <button className="play-btn" onClick={handlePlayOverlay} aria-label="Tocar vídeo">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3.868v16.264C5 21.29 6.188 22 7.18 21.194l12.64-8.632C20.798 11.85 20.798 10.15 19.82 9.438L7.18 0.806C6.188 0 5 0.71 5 1.994v1.874z" fill="white"/></svg>
          </button>
        </div>
      )}

      {/* Conteúdo central */}
      <div className="relative z-20 container text-center">
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="hero-title">Bem-vindo ao Portal</motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.95 }} transition={{ duration: 0.9, delay: 0.1 }} className="hero-sub">Aprenda com nossos tutoriais</motion.p>

        <div className="mt-8">
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleStartNow} className="btn btn-primary">
            Começar agora
          </motion.button>
        </div>

        {/* Progresso (pequeno) */}
        <div className="mt-10 text-left max-w-xl mx-auto text-white/90">
          <strong>Progresso: {progressData.porcentagem}%</strong>
        </div>
      </div>
    </section>
  )
}

export default Hero
