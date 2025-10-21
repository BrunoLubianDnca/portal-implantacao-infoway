import Hero from '../components/Hero'
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
      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto 2rem' }}>
        <div className="video-play-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', width: '100%', height: '405px' }}>
          <div className="play-button-large" style={{ background: 'rgba(0,0,0,0.45)', borderRadius: '50%', padding: '1rem', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play "><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>
      <Hero />
      <TrilhoImplantacao />
      <Suporte />
    </main>
  );
}

export default Home
