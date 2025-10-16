import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQ.css'

const FAQ = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="faq-container">
      <div className="faq-header">
        <HelpCircle size={24} className="faq-header-icon" />
        <h3 className="faq-title">Dúvidas Frequentes</h3>
      </div>

      {/* Search Box */}
      {items.length > 3 && (
        <div className="faq-search">
          <input
            type="text"
            placeholder="Buscar em perguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="faq-search-input"
          />
        </div>
      )}
      
      <div className="faq-items">
        <AnimatePresence initial={false}>
          {filteredItems.length === 0 ? (
            <motion.div
              className="faq-no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>Nenhuma pergunta encontrada para "{searchTerm}"</p>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={index}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  layout
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-content">
                      <Lightbulb size={18} className="faq-question-icon" />
                      <span>{item.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="faq-icon" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <motion.div
                          className="faq-answer-content"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <p>{item.answer}</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FAQ
