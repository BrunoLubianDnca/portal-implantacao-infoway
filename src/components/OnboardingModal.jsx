import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Play, HelpCircle } from 'lucide-react';
import './OnboardingModal.css';

const steps = [
  {
    title: 'Bem-vindo à sua jornada! 🚀',
    description: 'Este guia rápido vai te mostrar como dominar a implantação em apenas 3 etapas. Tudo pronto em menos de 15 segundos!',
    icon: <Play size={40} color="#FBA273" />,
    duration: null
  },
  {
    title: 'Seu progresso em tempo real 📊',
    description: 'Acompanhe aqui seu avanço. Cada módulo concluído te aproxima do sucesso total da implantação.',
    icon: <CheckCircle size={40} color="#22c55e" />,
    duration: null
  },
  {
    title: 'Estamos com você 💬',
    description: 'Aprenda a resolver dúvidas e usar o suporte Infoway rapidamente. Tudo fica mais fácil com ajuda certa!',
    icon: <HelpCircle size={40} color="#FBA273" />,
    duration: '~8 minutos'
  }
];

export default function OnboardingModal({ isOpen, onClose, onStart }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onStart) onStart();
      if (onClose) onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="onboarding-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="onboarding-modal" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
            <div className="onboarding-header">
              <span className="progress-text">Etapa {currentStep + 1} de {steps.length}</span>
              <button className="onboarding-close" onClick={onClose}>×</button>
            </div>
            <div className="onboarding-content">
              <div className="step-icon">{steps[currentStep].icon}</div>
              <h3 className="step-title">{steps[currentStep].title}</h3>
              <p className="step-description">{steps[currentStep].description}</p>
              {steps[currentStep].duration && (
                <span className="step-duration">⏱️ {steps[currentStep].duration}</span>
              )}
            </div>
            <div className="onboarding-actions">
              <button className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 0}>Anterior</button>
              <button className="btn btn-primary" onClick={nextStep}>
                {currentStep < steps.length - 1 ? 'Próximo' : 'Quero começar agora 🚀'}
              </button>
              <button className="btn btn-secondary" style={{ marginLeft: 8 }} onClick={handleSkip}>Pular</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
