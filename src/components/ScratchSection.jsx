import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

// "Save our date" — gold scratch card (canvas).
export default function ScratchSection() {
  const canvas = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const drawing = useRef(false)
  const strokes = useRef(0)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const dpr = Math.min(devicePixelRatio, 2)
    const r = c.getBoundingClientRect()
    c.width = r.width * dpr
    c.height = r.height * dpr
    const ctx = c.getContext('2d')
    ctx.scale(dpr, dpr)
    const g = ctx.createLinearGradient(0, 0, r.width, r.height)
    g.addColorStop(0, '#d7a94f')
    g.addColorStop(0.5, '#f0d08a')
    g.addColorStop(1, '#a76d1c')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, r.width, r.height)
    ctx.fillStyle = '#633f1f'
    ctx.textAlign = 'center'
    ctx.font = '11px Marcellus, serif'
    ctx.fillText('SCRATCH TO REVEAL OUR DATE', r.width / 2, r.height / 2 - 6)
    ctx.font = '25px serif'
    ctx.fillText('❋', r.width / 2, r.height / 2 + 29)
  }, [])

  const scratch = (e) => {
    if (!drawing.current || revealed) return
    const c = canvas.current
    const r = c.getBoundingClientRect()
    const ctx = c.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 24, 0, Math.PI * 2)
    ctx.fill()
    if (++strokes.current > 42) {
      setRevealed(true)
      c.style.opacity = '0'
      navigator.vibrate?.(35)
    }
  }

  return (
    <section className={'scratch-section ' + (revealed ? 'revealed' : '')}>
      <div className="float-field" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ '--i': i }}>❀</i>
        ))}
      </div>
      <Reveal>
        <p className="script">Save our date</p>
        <h2>A day written in the stars</h2>
        <div className="scratch-card">
          <div className="date-reveal">
            <small>Sunday</small>
            <b>14</b>
            <span>February · 2027</span>
            <em>Madurai</em>
          </div>
          <canvas
            ref={canvas}
            onPointerDown={(e) => {
              drawing.current = true
              e.currentTarget.setPointerCapture(e.pointerId)
              scratch(e)
            }}
            onPointerMove={scratch}
            onPointerUp={() => (drawing.current = false)}
            onPointerCancel={() => (drawing.current = false)}
          />
        </div>
        <p className="scratch-hint">{revealed ? 'We will see you there ♡' : 'Use your finger to uncover the date'}</p>
      </Reveal>
    </section>
  )
}
