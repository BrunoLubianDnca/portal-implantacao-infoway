import React, { useEffect, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './WidescreenHero.css'

const WidescreenHero = ({
  videoSrc,
  poster,
  title,
  subtitle,
  onPrimary,
  className = '',
  scrollToId = null,
  onTrack = null,
  nextFocusId = null
}) => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const hasCalledOnPrimaryRef = useRef(false)
  const [showPoster, setShowPoster] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [hiddenAfterFinish, setHiddenAfterFinish] = useState(false)
  const timeouts = useRef(new Set())
  const overlayFallbackRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [soundPending, setSoundPending] = useState(false)
  const [interactionRequired, setInteractionRequired] = useState(false)
  const [ctaLocked, setCtaLocked] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const shouldReduceMotion = useReducedMotion()
  const [srMessage, setSrMessage] = useState('')

  // tentativa de autoplay com som; se falhar, muda para muted e pede interação
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted = false
    const playPromise = v.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setMuted(v.muted)
        })
        .catch(() => {
          // fallback seguro
          v.muted = true
          setMuted(true)
          setInteractionRequired(true)
          v.play().catch(() => {})
        })
    }

    return () => {}
  }, [videoSrc])

  // Global keyboard handler: Space toggles play/pause
  useEffect(() => {
    const handler = (e) => {
      // evitar quando foco estiver em inputs (preserve behavior)
      const tag = document.activeElement && document.activeElement.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
      // suporte cross-browser para tecla Space
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      // limpar timeouts caso existam
      timeouts.current.forEach(id => clearTimeout(id))
      timeouts.current.clear()
    }
  }, [])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setErrorMsg('Não foi possível reproduzir o vídeo'))
    } else {
      v.pause(); setIsPlaying(false)
    }
  }, [])

  const handleToggleSound = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      setSoundPending(true)
      if (v.muted) {
        // tocar um cue sonoro curto imediatamente para dar feedback
        tryPlayCue()
        // tentar retroceder um pouquinho para recuperar o impacto inicial
        try {
          const seekBack = 0.8
          const newTime = Math.max(0, (v.currentTime || 0) - seekBack)
          // ajustar currentTime se possível
          if (!Number.isNaN(newTime)) v.currentTime = newTime
        } catch (e) {}

        v.muted = false
        setMuted(false)
        // esperar um curto período para o seek estabilizar
        await new Promise(r => setTimeout(r, 120))
        // tentar tocar com som (pode falhar por buffer) com retries
        let played = false
        let attempts = 0
        const maxAttempts = 3
        while (!played && attempts < maxAttempts) {
          try {
            attempts++
            await v.play()
            played = true
            setIsPlaying(true)
            setInteractionRequired(false)
            break
          } catch (err) {
            // aguardar backoff antes da próxima tentativa
            await new Promise(r => setTimeout(r, 150 * attempts))
          }
        }
        if (!played) {
          // falhou em reproduzir com som; reverter para mudo e avisar
          try { v.muted = true } catch (e) {}
          setMuted(true)
          setErrorMsg('Não foi possível reproduzir com som no momento')
          const id = window.setTimeout(() => setErrorMsg(''), 4000)
          timeouts.current.add(id)
        }
      } else {
        v.muted = true
        setMuted(true)
      }
      setSoundPending(false)
    } catch (err) {
      setErrorMsg('Não foi possível habilitar o som após a interação')
      // auto-hide (registrado para limpeza)
      const id = window.setTimeout(() => setErrorMsg(''), 4000)
      timeouts.current.add(id)
      setSoundPending(false)
    }
  }

  // tenta tocar um cue sonoro curto usando WebAudio (sem arquivos externos)
  const tryPlayCue = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      // muitos navegadores exigem resume em user gesture; chamada aqui é user gesture
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        ctx.resume().catch(() => {})
      }
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(880, ctx.currentTime)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      o.stop(ctx.currentTime + 0.13)
      // desconectar levemente após terminar
      o.onended = () => {
        try { o.disconnect(); g.disconnect(); if (typeof ctx.close === 'function') ctx.close().catch(()=>{}) } catch(e) {}
      }
    } catch (e) {
      // silent
    }
  }

  const handleCTA = () => {
    if (ctaLocked) return
    setCtaLocked(true)
    // Telemetria: notificar que o CTA foi acionado
    try {
      const payload = { event: 'hero_cta', video: videoSrc, timestamp: Date.now() }
      if (typeof onTrack === 'function') {
        onTrack(payload)
      } else if (typeof window !== 'undefined' && window.gtag) {
        try { window.gtag('event', 'hero_cta', { event_label: videoSrc }) } catch (e) {}
      } else if (typeof window !== 'undefined' && window.analytics && typeof window.analytics.track === 'function') {
        try { window.analytics.track('hero_cta', payload) } catch (e) {}
      }
    } catch (e) {}
    // update srMessage for screen readers
  setSrMessage('Iniciando')
  const srId = window.setTimeout(() => setSrMessage(''), 2000)
  timeouts.current.add(srId)
    // iniciar scroll suave para um alvo explícito se fornecido
    try {
      let scrollTarget = null
      if (scrollToId) {
        // aceitar id com ou sem '#'
        const id = scrollToId.startsWith('#') ? scrollToId.slice(1) : scrollToId
        scrollTarget = document.getElementById(id)
      }
      if (!scrollTarget) {
        const el = containerRef.current
        if (el && el.parentElement) {
          // próximo elemento depois do container
          const sibling = el.parentElement.children
          for (let i = 0; i < sibling.length; i++) {
            if (sibling[i] === el && i + 1 < sibling.length) {
              scrollTarget = sibling[i + 1]
              break
            }
          }
        }
      }

        if (scrollTarget && scrollTarget.scrollIntoView) {
          const id = setTimeout(() => {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 50)
          timeouts.current.add(id)
        }
    } catch (e) {
      // silent
    }
    // iniciar alteração visual: colapsar e mostrar poster
    setCollapsed(true)
    if (shouldReduceMotion) {
      setShowPoster(true)
    } else {
      setTimeout(() => setShowPoster(true), 120)
    }
    // a animação tratará pausar e mutar o vídeo no fim
    setShowOverlay(false)
  // forçar finalização rápida para evitar overlay preso
  setTimeout(() => finalizeFlow(), 80)
    // fallback: se a animação não disparar onAnimationComplete (por HMR, reduced motion, ou crash),
    // garanta que o fluxo finalize após um timeout seguro.
    try {
      const fallbackMs = shouldReduceMotion ? 50 : 120
      if (overlayFallbackRef.current) clearTimeout(overlayFallbackRef.current)
      const id = window.setTimeout(() => {
        try { handleOverlayAnimationComplete() } catch (e) {}
      }, fallbackMs)
      overlayFallbackRef.current = id
      timeouts.current.add(id)
      // attempt an even faster fallback in case the animation is blocked
      const quickId = window.setTimeout(() => {
        try { if (!hiddenAfterFinish) handleOverlayAnimationComplete() } catch (e) {}
      }, 80)
      timeouts.current.add(quickId)
    } catch (e) {}
  }

  const [showOverlay, setShowOverlay] = useState(true)

  const videoVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  const overlayVariants = {
    enter: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -12, scale: shouldReduceMotion ? 1 : 0.98 }
  }

  // quando a animação do overlay terminar e ele estiver saindo, pausar video e chamar callback
  const handleOverlayAnimationComplete = (definition) => {
    // evitar execução duplicada
    if (hiddenAfterFinish) return
    if (!showOverlay) {
      const v = videoRef.current
      if (v) {
        try { v.pause(); v.muted = true } catch (e) {}
      }
      // marcar aria-hidden e remover do fluxo para a11y
      if (containerRef.current) {
        try { containerRef.current.setAttribute('aria-hidden', 'true') } catch (e) {}
      }
      setHiddenAfterFinish(true)
      // garantir chamada única de onPrimary
      if (onPrimary && !hasCalledOnPrimaryRef.current) {
        hasCalledOnPrimaryRef.current = true
        try { onPrimary() } catch (e) {}
      }
      // desbloquear CTA após callback (opcional)
      setCtaLocked(false)
      // limpar fallback se existir
      try { if (overlayFallbackRef.current) { clearTimeout(overlayFallbackRef.current); timeouts.current.delete(overlayFallbackRef.current); overlayFallbackRef.current = null } } catch(e){}
      // mover foco para próximo elemento significativo, se fornecido
      try {
        if (nextFocusId) {
          const id = nextFocusId.startsWith('#') ? nextFocusId.slice(1) : nextFocusId
          const nextEl = document.getElementById(id)
          if (nextEl && typeof nextEl.focus === 'function') {
            nextEl.focus()
          }
        } else if (scrollToId) {
          const id = scrollToId.startsWith('#') ? scrollToId.slice(1) : scrollToId
          const nextEl = document.getElementById(id)
          if (nextEl && typeof nextEl.focus === 'function') nextEl.focus()
        } else if (containerRef.current) {
          // fallback: focar o próximo elemento irmão
          const el = containerRef.current
          if (el && el.parentElement) {
            const siblings = Array.from(el.parentElement.children)
            const idx = siblings.indexOf(el)
            if (idx >= 0 && idx + 1 < siblings.length) {
              const candidate = siblings[idx + 1]
              if (candidate && typeof candidate.focus === 'function') candidate.focus()
            }
          }
        }
      } catch (e) {}
      // notificar outros componentes (ex: Navbar) que o hero foi finalizado
      try {
        if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
          window.dispatchEvent(new CustomEvent('widescreen:state', { detail: { hiddenAfterFinish: true } }))
        }
      } catch (e) {}
    }
  }

  // finaliza o fluxo forçando as mesmas ações de handleOverlayAnimationComplete
  const finalizeFlow = () => {
    if (hiddenAfterFinish) return
    try {
      const v = videoRef.current
      if (v) {
        try { v.pause(); v.muted = true } catch (e) {}
      }
      if (containerRef.current) {
        try { containerRef.current.setAttribute('aria-hidden', 'true') } catch (e) {}
      }
      setHiddenAfterFinish(true)
      if (onPrimary && !hasCalledOnPrimaryRef.current) {
        hasCalledOnPrimaryRef.current = true
        try { onPrimary() } catch (e) {}
      }
      setCtaLocked(false)
      // notificar estado finalizado
      try {
        if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
          window.dispatchEvent(new CustomEvent('widescreen:state', { detail: { hiddenAfterFinish: true } }))
        }
      } catch (e) {}
      try { if (overlayFallbackRef.current) { clearTimeout(overlayFallbackRef.current); timeouts.current.delete(overlayFallbackRef.current); overlayFallbackRef.current = null } } catch(e){}
    } catch (e) {}
  }

  const handleReplay = () => {
    // reexibir o hero para rever o trailer; não chamamos onPrimary novamente
    try {
      if (containerRef.current) containerRef.current.removeAttribute('aria-hidden')
    } catch (e) {}
    setHiddenAfterFinish(false)
    setShowOverlay(true)
    setCollapsed(false)
    setShowPoster(false)
    // reset video and play muted
    const v = videoRef.current
    if (v) {
      try {
        v.currentTime = 0
        v.muted = true
        v.play().then(() => setIsPlaying(true)).catch(() => {})
      } catch (e) {}
    }
    // notificar que o hero foi reaberto / botão deve sumir
    try {
      if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
        window.dispatchEvent(new CustomEvent('widescreen:state', { detail: { hiddenAfterFinish: false } }))
      }
    } catch (e) {}
  }

  // ouvir evento global de replay disparado por outros componentes (ex: Navbar)
  useEffect(() => {
    const onGlobalReplay = () => {
      try { handleReplay() } catch (e) {}
    }
    window.addEventListener('widescreen:replay', onGlobalReplay)
    return () => window.removeEventListener('widescreen:replay', onGlobalReplay)
  }, [])

  // auto-hide interactionRequired message
  useEffect(() => {
    if (interactionRequired) {
      const id = window.setTimeout(() => setInteractionRequired(false), 4000)
      timeouts.current.add(id)
      return () => {
        clearTimeout(id)
        timeouts.current.delete(id)
      }
    }
  }, [interactionRequired])

  // auto-hide generic error message too (if set elsewhere)
  useEffect(() => {
    if (errorMsg) {
      const id = window.setTimeout(() => setErrorMsg(''), 4000)
      timeouts.current.add(id)
      return () => {
        clearTimeout(id)
        timeouts.current.delete(id)
      }
    }
  }, [errorMsg])

  return (
  <div ref={containerRef} className={`widescreen-hero ${className}`.trim()} role="region" aria-label={title || 'Hero'}>
    <motion.div className={`widescreen-viewport ${collapsed ? 'collapsed' : ''} ${hiddenAfterFinish ? 'hidden-after-finish' : ''}`} layout>
        <AnimatePresence>
  <motion.video
    key={videoSrc}
    ref={videoRef}
    className="widescreen-video"
    src={videoSrc}
    poster={poster}
    playsInline
    controls={false}
    autoPlay
    muted={muted}
    // manter o vídeo visível; apenas o overlay é animado
    initial="visible"
    animate="visible"
    variants={videoVariants}
    transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      />
        </AnimatePresence>

        {/* Poster element that appears when showPoster is true */}
        <AnimatePresence>
          {showPoster && poster && (
            <motion.div
              className="widescreen-poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ backgroundImage: `url(${poster})` }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showOverlay && (
            <motion.div
              className="widescreen-overlay"
              initial="enter"
              animate="enter"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              onAnimationComplete={handleOverlayAnimationComplete}
            >
              <div className="widescreen-content">
          {/* aria-live region para leitores de tela */}
          <div className="sr-only" aria-live="polite">{srMessage || interactionRequired ? (interactionRequired ? 'Ação necessária: clique para ativar áudio' : srMessage) : ''}</div>
                {title && <h1 className="widescreen-title">{title}</h1>}
                {subtitle && <h2 className="widescreen-subtitle">{subtitle}</h2>}

                <div className="widescreen-actions">
                  <button
                    className="btn-primary widescreen-cta"
                    onClick={handleCTA}
                    aria-label="Ação principal"
                    disabled={ctaLocked}
                    tabIndex={0}
                  >
                    {isPlaying ? 'Continuar' : 'Começar'}
                  </button>

                  <button
                    className={`btn-icon widescreen-sound ${soundPending ? 'pending' : ''}`}
                    onClick={handleToggleSound}
                    aria-pressed={!muted}
                    aria-label={muted ? 'Ativar som' : 'Desativar som'}
                    disabled={soundPending}
                  >
                    {soundPending ? (
                      <span className="widescreen-spinner" aria-hidden></span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                        {muted ? (
                          <path d="M19 5l-1.41 1.41L21.17 10H17v4h4.17l-3.58 3.59L19 19l5-5-5-5z" fill="currentColor"/>
                        ) : (
                          <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                    )}
                  </button>
                </div>

                {/* loading indicator near top-right when video is not yet playing */}
                {(!isPlaying && !interactionRequired) && (
                  <div className="widescreen-loading" aria-hidden>
                    <span className="widescreen-spinner"></span>
                  </div>
                )}

                {interactionRequired && (
                  <div className="widescreen-interaction" role="alert">
                    Para ativar o áudio, clique no ícone de som ou em "Começar".
                  </div>
                )}

                {errorMsg && <div className="widescreen-error" role="status">{errorMsg}</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      
      </motion.div>

      {/* botão sutil 'Ver trailer' exibido APÓS o hero sair (hiddenAfterFinish) */}
      {hiddenAfterFinish && (
        <button
          type="button"
          className="widescreen-replay-inline"
          onClick={handleReplay}
          aria-label="Ver trailer novamente"
          title="Ver trailer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
            <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
          </svg>
          Ver trailer
        </button>
      )}

    </div>
  )
}

WidescreenHero.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPrimary: PropTypes.func,
  className: PropTypes.string
}

WidescreenHero.propTypes = Object.assign({}, WidescreenHero.propTypes, {
  scrollToId: PropTypes.string,
  onTrack: PropTypes.func
})
WidescreenHero.propTypes = Object.assign({}, WidescreenHero.propTypes, {
  nextFocusId: PropTypes.string
})
// notar: usamos parâmetros padrão na assinatura da função em vez de defaultProps

export default WidescreenHero
