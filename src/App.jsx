import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProgressSidebar from './components/ProgressSidebar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isModulePage = location.pathname.startsWith('/modulo/')

  return (
    <div className="app">
      <Navbar />
      {isModulePage && <ProgressSidebar progressoGeral={50} />}
      <div className={isModulePage ? 'main-with-sidebar' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modulo/:id" element={<ModulePage />} />
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
