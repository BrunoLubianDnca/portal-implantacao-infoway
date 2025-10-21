import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ToastSuccess = ({ nome, open, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          style={{
            position: 'fixed',
            bottom: '5%',
            right: window.innerWidth > 600 ? '5%' : '50%',
            left: window.innerWidth > 600 ? 'auto' : '50%',
            transform: window.innerWidth > 600 ? 'none' : 'translateX(-50%)',
            zIndex: 99999,
            background: '#fff',
            border: '2px solid #ff6600',
            borderRadius: 14,
            boxShadow: '0 4px 24px rgba(255,102,0,0.12)',
            padding: '1.2rem 2rem',
            minWidth: 280,
            maxWidth: 340,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ marginBottom: 8 }}
          >
            <svg width="38" height="38" fill="none"><circle cx="19" cy="19" r="19" fill="#2ecc40"/><path d="M12 20.5l4 4 8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
          </motion.div>
          <p style={{ fontWeight: 700, fontSize: '1.08rem', color: '#222', marginBottom: 2 }}>Cadastro concluído!</p>
          <p style={{ color: '#444', fontSize: '1rem', marginBottom: 8 }}>Bem-vindo, {nome}. Sua implantação está pronta para começar.</p>
          <button
            onClick={() => { onClose(); navigate('/modulo/1'); }}
            style={{
              background: 'linear-gradient(90deg,#ff6600 60%,#ffb366 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1rem',
              padding: '0.7rem 1.2rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(255,102,0,0.08)',
              marginTop: 4
            }}
          >Iniciar Módulo 1 →</button>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 8,
              right: 12,
              background: 'none',
              border: 'none',
              fontSize: 22,
              color: '#ff6600',
              cursor: 'pointer'
            }}
            aria-label="Fechar"
          >×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastSuccess;
