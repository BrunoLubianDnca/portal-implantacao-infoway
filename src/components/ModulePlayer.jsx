import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader, CheckCircle, Award } from 'lucide-react';

const ModulePlayer = ({ videoId, titulo, videoLoading, setVideoLoading, concluido, proximoModulo, onComplete, showAutoAdvance, countdown, handleCancelAuto, goNextNow }) => (
  <div className="video-container">
    <div className="video-wrapper">
      {videoLoading && (
        <div className="video-skeleton">
          <div className="skeleton-shimmer"></div>
          <div className="skeleton-content">
            <Loader className="skeleton-loader" size={48} />
            <p>Carregando vídeo...</p>
          </div>
        </div>
      )}
      <div className="video-responsive">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={titulo}
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
    {!concluido && proximoModulo && (
      <motion.div
        className="quick-complete-banner"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p>Terminou de assistir?</p>
        <button 
          className="btn btn-primary btn-complete-advance"
          onClick={onComplete}
        >
          <CheckCircle size={20} />
          Concluir e Avançar →
        </button>
      </motion.div>
    )}
    <AnimatePresence>
      {showAutoAdvance && proximoModulo && (
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
                <path className="countdown-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="countdown-progress" strokeDasharray={`${(countdown / 5) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
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
  </div>
);

export default ModulePlayer;
