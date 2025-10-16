import { motion } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  HelpCircle,
  FileText,
  Phone,
  ExternalLink
} from 'lucide-react';
import './Suporte.css';

const canaisSuporte = [
  {
    titulo: 'WhatsApp',
    descricao: 'Atendimento rápido e direto',
    icone: MessageCircle,
    classeCor: 'bg-whatsapp',
    link: 'https://wa.me/5547988188996',
    disponibilidade: 'Seg-Sex: 8h-18h | Sáb: 8h-12h'
  },
  {
    titulo: 'E-mail',
    descricao: 'Para questões detalhadas',
    icone: Mail,
    classeCor: 'bg-email',
    link: 'mailto:atendimento@infowayti.com.br',
    disponibilidade: 'Resposta em 24h'
  },
  {
    titulo: 'FAQ',
    descricao: 'Perguntas frequentes',
    icone: HelpCircle,
    classeCor: 'bg-faq',
    link: '#faq',
    disponibilidade: 'Disponível 24/7'
  }
];

const Suporte = () => {
  return (
    <section id="suporte" className="suporte-section">
      <div className="container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="header-icon">
              <Phone size={40} />
            </div>
            <h2 className="title-with-bar">Precisa de Ajuda?</h2>
            <p>Estamos aqui para garantir que sua implantação seja um sucesso. Escolha o canal de suporte mais conveniente:</p>
          </motion.div>
        </div>

        <div className="canais-grid">
          {canaisSuporte.map((canal, index) => {
            const Icon = canal.icone;

            return (
              <motion.a
                key={canal.titulo}
                href={canal.link}
                className="canal-card"
                target={canal.link.startsWith('http') ? '_blank' : undefined}
                rel={canal.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="canal-icon">
                  <Icon size={24} />
                </div>
                <h3>{canal.titulo}</h3>
                <p>{canal.descricao}</p>

                <div className="canal-info">
                  {canal.disponibilidade}
                </div>

                <div className="canal-link">
                  <span>Acessar</span>
                  <ExternalLink size={14} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Suporte;
