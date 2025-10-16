import { useState } from 'react'
import { CheckCircle, Circle, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Checklist.css'

const Checklist = ({ items, onComplete }) => {
  const [checkedItems, setCheckedItems] = useState({})
  const [justChecked, setJustChecked] = useState(null)

  const handleCheck = (index) => {
    const newCheckedItems = {
      ...checkedItems,
      [index]: !checkedItems[index]
    }
    setCheckedItems(newCheckedItems)

    // Trigger animation for newly checked item
    if (newCheckedItems[index]) {
      setJustChecked(index)
      setTimeout(() => setJustChecked(null), 600)
    }

    // Check if all items are completed
    const allCompleted = items.every((_, i) => newCheckedItems[i])
    if (allCompleted && onComplete) {
      onComplete()
    }
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const progress = (completedCount / items.length) * 100
  const allCompleted = completedCount === items.length && items.length > 0

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {allCompleted ? (
            <span className="checklist-title-completed">
              <Sparkles size={20} />
              Checklist Concluída!
            </span>
          ) : (
            'Checklist de Conclusão'
          )}
        </motion.h3>
        <motion.span 
          className="checklist-progress"
          key={completedCount}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {completedCount} de {items.length} concluídos
        </motion.span>
      </div>

      <div className="checklist-progress-bar">
        <motion.div 
          className="checklist-progress-fill" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="checklist-items">
        {items.map((item, index) => (
          <motion.label 
            key={index} 
            className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <input
              type="checkbox"
              checked={checkedItems[index] || false}
              onChange={() => handleCheck(index)}
              className="checklist-checkbox"
            />
            <motion.div 
              className="checklist-icon"
              animate={justChecked === index ? {
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {checkedItems[index] ? (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <CheckCircle size={20} className="checked" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unchecked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Circle size={20} className="unchecked" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <span className={`checklist-label ${checkedItems[index] ? 'completed' : ''}`}>
              {item}
            </span>
            {justChecked === index && (
              <motion.div
                className="check-sparkle"
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.label>
        ))}
      </div>

      {allCompleted && (
        <motion.div
          className="checklist-celebration"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Parabéns! Você completou todas as tarefas!
        </motion.div>
      )}
    </div>
  )
}

export default Checklist
