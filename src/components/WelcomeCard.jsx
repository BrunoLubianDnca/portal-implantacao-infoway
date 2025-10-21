import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeCard = ({ usuario, open, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 8000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!usuario) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            background: 'rgba(255,255,255,0.98)',
            border: '2px solid #ff6600',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(255,102,0,0.12)',
            padding: '2.2rem 2.5rem',
            minWidth: 320,
            maxWidth: 420,
            textAlign: 'center',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ marginBottom: 8 }}
          >
            <svg width="44" height="44" fill="none"><circle cx="22" cy="22" r="22" fill="#2ecc40"/><path d="M14 24.5l5 5 11-11" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
          </motion.div>
          <h2 style={{ fontWeight: 800, fontSize: '1.45rem', color: '#222', marginBottom: 2 }}>Cadastro concluído!</h2>
          <p style={{ fontSize: '1.08rem', color: '#222', marginBottom: 2 }}>Bem-vindo, {usuario.nome} <span style={{fontSize:'1.2rem'}}>👋</span></p>
          <p style={{ color: '#444', fontSize: '1rem', marginBottom: 8 }}>Sua implantação da Infoway está pronta para começar.</p>
          <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: 8 }}>
            <span style={{ color: '#ff6600', fontWeight: 500 }}>CNPJ:</span> {usuario.cnpj}<br />
            <span style={{ color: '#ff6600', fontWeight: 500 }}>Empresa:</span> {usuario.empresa}
          </div>
          <div style={{ color: '#222', fontSize: '1rem', marginBottom: 8 }}>
            <strong>Próximo passo:</strong><br />
            Clique abaixo para iniciar o primeiro módulo da sua implantação.
          </div>
          <button
            onClick={() => { onClose(); navigate('/modulo/1'); }}
            style={{
              background: 'linear-gradient(90deg,#ff6600 60%,#ffb366 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1.08rem',
              padding: '0.9rem 1.5rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(255,102,0,0.08)',
              marginTop: 4
            }}
          >🚀 Iniciar Módulo 1</button>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 18,
              background: 'none',
              border: 'none',
              fontSize: 26,
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

export default WelcomeCard;
