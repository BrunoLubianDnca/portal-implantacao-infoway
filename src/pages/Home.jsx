// Temporário: usar WidescreenHero para testes visuais/funcionais
import WidescreenHero from '../components/WidescreenHero'
import TrilhoImplantacao from '../components/TrilhoImplantacao'
import Suporte from '../components/Suporte'
import WelcomeCard from '../components/WelcomeCard';
import WelcomePop from '../components/WelcomePop';
import './Home.css'
import { useEffect, useState } from 'react';

const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPop, setShowPop] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      const parsed = JSON.parse(user);
      setUsuario(parsed);
      setShowWelcome(true);
      setShowPop(true);
    }
  }, []);

  return (
    <main id="home">
      <WelcomePop nome={usuario?.nome} open={showPop} onClose={() => setShowPop(false)} />
      
      <WidescreenHero
        videoSrc="/Videos/Inicio.mp4"
        poster="/images/trilho/trailer-poster.jpg"
        title="Bem-vindo ao Portal de Implantação"
        subtitle="Assista ao vídeo e comece a implantação"
        onPrimary={() => console.log('CTA concluído')}
        scrollToId="trilho"
      />
      <div id="trilho">
        <TrilhoImplantacao />
      </div>
      <Suporte />
    </main>
  );
}

export default Home
