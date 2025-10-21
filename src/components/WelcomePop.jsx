
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomePop.css';

const WelcomePop = ({ nome, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="welcome-pop"
        >
          <span style={{ fontSize: '1.3rem', marginRight: 6 }}>👋</span>
          <strong style={{ fontWeight: 500 }}>Bem-vindo, {nome}!</strong><br />
          <span style={{ fontWeight: 400 }}>Sua implantação já vai começar.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePop;
