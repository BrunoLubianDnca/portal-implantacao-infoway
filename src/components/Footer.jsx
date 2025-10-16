import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle, Instagram, Linkedin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo e Descrição */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <img src="/images/Logo Infoway Op01.png" alt="Infoway" />
              </div>
              <span>
                <strong>Infoway Soluções em TI</strong>
                <small>Portal de Implantação</small>
              </span>
            </div>
            <p>Seu ambiente computacional em pleno funcionamento.</p>
            
            <div className="footer-social">
              <a 
                href="https://www.instagram.com/infowayti/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Infoway"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/infowayti/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Infoway"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="footer-section">
            <h4>Links Úteis</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#trilho">Tutoriais</a></li>
            </ul>
          </div>

          {/* Etapas */}
          <div className="footer-section">
            <h4>Etapas de Implantação</h4>
            <ul>
              <li><Link to="/modulo/1">Acesso ao Servidor</Link></li>
              <li><Link to="/modulo/2">Configuração Inicial</Link></li>
              <li><Link to="/modulo/3">Infodrive & Backup</Link></li>
              <li><Link to="/modulo/4">Suporte & FAQ</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-section">
            <h4>Contato</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={18} />
                <a href="mailto:atendimento@infowayti.com.br">atendimento@infowayti.com.br</a>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+5547988188996">(47) 98818-8996</a>
              </li>
              <li>
                <MessageCircle size={18} />
                <a href="https://wa.me/5547988188996" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="footer-address">
              <p><strong>R. XV de Novembro, 759</strong></p>
              <p>Centro | Blumenau, SC</p>
              <p>CEP: 89010-902</p>
              <p>Edifício Hering</p>
              
              <div className="footer-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d536.0887977910968!2d-49.06453719444865!3d-26.921166571467595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df19300200f361%3A0x3368706bea83b0b7!2sInfoway%20Solu%C3%A7%C3%B5es%20em%20TI!5e1!3m2!1spt-BR!2sbr!4v1760621214782!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Infoway"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; InfowayTI. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#privacidade">Privacidade</a>
            <span>•</span>
            <a href="#termos">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
