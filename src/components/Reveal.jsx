import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={!reduce && { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
