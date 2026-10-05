import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { WEDDING_DATE } from '../data'

const LABELS = ['days', 'hours', 'mins', 'secs']

export default function Countdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const ms = Math.max(0, WEDDING_DATE.getTime() - now)
  const values = [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60]
  return (
    <div className="countdown">
      {values.map((v, i) => (
        <div className="count-unit" key={i}>
          <div className="flip">
            {/* keyed by value so each tick re-plays the flip */}
            <motion.span key={v} initial={{ rotateX: -75, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }}>
              {String(v).padStart(2, '0')}
            </motion.span>
          </div>
          <small>{LABELS[i]}</small>
        </div>
      ))}
    </div>
  )
}
