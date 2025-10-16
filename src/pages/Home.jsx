import Hero from '../components/Hero'
import TrilhoImplantacao from '../components/TrilhoImplantacao'
import Suporte from '../components/Suporte'
import './Home.css'

const Home = () => {
  return (
    <main id="home">
      <Hero />
      <TrilhoImplantacao />
      <Suporte />
    </main>
  )
}

export default Home
