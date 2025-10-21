import React, { useState } from 'react';
import Joyride from 'react-joyride';

const TOUR_KEY = 'onboarding_tour_completed';

const steps = [
  {
    target: '.navbar',
    content: 'Aqui você navega entre as principais áreas do portal.',
  },
  {
    target: '.hero',
    content: 'Esta é a seção de destaque inicial do portal.',
  },
  {
    target: '.trilho-implantacao',
    content: 'Acompanhe os módulos do processo de implantação aqui.',
  },
  {
    target: '.checklist',
    content: 'Use o checklist para garantir que todos os passos foram concluídos.',
  },
  {
    target: '.faq',
    content: 'Encontre respostas para dúvidas frequentes nesta seção.',
  },
  {
    target: '.progress-sidebar',
    content: 'Veja seu progresso geral na implantação.',
  },
  {
    target: '.suporte',
    content: 'Precisa de ajuda? Acesse o suporte por aqui.',
  },
  {
    target: '.whatsapp-float',
    content: 'Fale com nosso suporte via WhatsApp a qualquer momento.',
  },
];

export default function OnboardingTour() {
  const [run, setRun] = useState(() => {
    return !localStorage.getItem(TOUR_KEY);
  });

  const handleTourEnd = () => {
    localStorage.setItem(TOUR_KEY, 'true');
    setRun(false);
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={e => {
        if (e.status === 'finished' || e.status === 'skipped') {
          handleTourEnd();
        }
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
}
