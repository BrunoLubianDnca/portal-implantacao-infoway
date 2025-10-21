
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProgressSidebar from './components/ProgressSidebar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import AuthScreen from './pages/AuthScreen'
import './App.css'


function AppContent() {
  const location = useLocation()
  const isModulePage = location.pathname.startsWith('/modulo/')
  
  // Rastrear navegação de páginas
  useEffect(() => {
    // Google Analytics já rastreia automaticamente via gtag
    // Não precisa de código adicional aqui
  }, [location])

  // Verifica se usuário está cadastrado
  const usuario = localStorage.getItem('usuario')

  // Se não estiver cadastrado, força tela de cadastro
  if (!usuario && location.pathname !== '/auth') {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="app">
      <Navbar />
      {isModulePage && <ProgressSidebar progressoGeral={50} />}
      <div className={isModulePage ? 'main-with-sidebar' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modulo/:id" element={<ModulePage />} />
          <Route path="/auth" element={<AuthScreen />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
