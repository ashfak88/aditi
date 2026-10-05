import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FlowerLotus } from '@phosphor-icons/react'

// "Open our invitation" card shown over the intro video.
export default function WelcomeCard({ onDone }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className={'welcome-card ' + (open ? 'is-open' : '')}
      animate={open && !reduce ? { scale: 1.04, opacity: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="welcome-names">
        <small>Together with our families</small>
        <h1>
          Aarav <i>&amp;</i> Ananya
        </h1>
        <p>invite you to celebrate their wedding</p>
        <span>14 · 02 · 2027</span>
      </div>
      <motion.button
        aria-label="Open Aarav and Ananya's invitation"
        className="open-invite"
        onClick={() => {
          setOpen(true)
          onDone()
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="seal">
          <FlowerLotus size={25} weight="fill" />
        </span>
        <b>Open our invitation</b>
        <small>Tap to enter</small>
      </motion.button>
    </motion.div>
  )
}
