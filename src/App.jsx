import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, CalendarBlank, FlowerLotus, MapPin, Sparkle } from '@phosphor-icons/react'
import { atmosphereLanterns, events, media } from './data'
import { downloadWeddingIcs } from './calendar'
import Reveal from './components/Reveal'
import Countdown from './components/Countdown'
import WelcomeCard from './components/WelcomeCard'
import ScratchSection from './components/ScratchSection'
import Credit from './components/Credit'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [playing, setPlaying] = useState(false)
  const video = useRef(null)
  const root = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const leafY = useTransform(scrollYProgress, [0, 1], [0, 180])

  // Scroll-driven GSAP choreography (starts once the intro is finished).
  useEffect(() => {
    if (reduce || !introDone || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-copy>*', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
      gsap.to('.hero-art', {
        scale: 1.09,
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.utils.toArray('.event').forEach((el, i) =>
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 ? -42 : 42, rotate: 0.5 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', end: 'top 58%', scrub: 0.8 },
          },
        ),
      )
      gsap.fromTo(
        '.ceremony-image img',
        { scale: 1.18, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: '.ceremony-image', start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
      gsap.fromTo(
        '.story-inner',
        { clipPath: 'inset(0 50% 0 50%)', opacity: 0.4 },
        {
          clipPath: 'inset(0 0% 0 0%)',
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.story', start: 'top 80%', end: 'center 55%', scrub: 1 },
        },
      )
      gsap.to('.map i', { y: -10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut' })
      gsap.utils.toArray('.atmos-lantern').forEach((el, i) => {
        const depth = Number(el.dataset.depth || 0.4)
        gsap.to(el, {
          yPercent: -90 * depth,
          x: Math.sin(i) * 18 * depth,
          rotation: i % 2 ? 4 : -4,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1.2 + depth },
        })
        gsap.to(el.querySelector('.lantern-flame'), {
          scaleY: 1.18,
          opacity: 0.72,
          repeat: -1,
          yoyo: true,
          duration: 0.7 + i * 0.08,
          ease: 'sine.inOut',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [introDone, reduce])

  const startIntro = () => {
    const v = video.current
    if (v) {
      v.currentTime = 0
      setPlaying(true)
      v.play().catch(() => setPlaying(false))
    }
  }

  return (
    <main ref={root}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <div className="lantern-atmosphere" aria-hidden="true">
        {atmosphereLanterns.map((l, i) => (
          <span
            key={i}
            className="atmos-lantern"
            data-depth={l.d}
            style={{ left: `${l.x}%`, top: `${l.y}%`, '--scale': l.s, '--blur': `${l.b}px`, '--delay': `${-i * 0.6}s` }}
          >
            <i className="lantern-chain" />
            <i className="lantern-cap" />
            <i className="lantern-body">
              <b className="lantern-flame" />
            </i>
            <i className="lantern-tail" />
          </span>
        ))}
      </div>

      {!introDone && (
        <div className={'welcome ' + (playing ? 'intro-playing' : '')}>
          <video
            ref={video}
            className="welcome-video"
            muted
            playsInline
            preload="auto"
            poster={media.openingPoster}
            onEnded={() => setIntroDone(true)}
            aria-label="Aarav and Ananya's illustrated wedding invitation opening"
          >
            <source src={media.openingVideo} type="video/mp4" />
          </video>
          <div className="welcome-shade" />
          <div className="garland-edge" />
          {!playing && <WelcomeCard onDone={startIntro} />}
          {playing && (
            <button className="skip-intro" onClick={() => setIntroDone(true)}>
              Skip intro
            </button>
          )}
        </div>
      )}

      <section className="hero">
        <img
          className="hero-art"
          src={media.hero}
          alt="Aarav and Ananya before a South Indian temple, framed by jasmine and lotus flowers"
        />
        <div className="hero-scrim" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: +!!introDone, y: introDone ? 0 : 24 }}
          transition={{ delay: 0.15, duration: 1 }}
        >
          <p className="mantra" style={{fontSize: '14px', marginBottom: '15px', color: '#8c2f39'}}>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br/>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</p>
          <p className="blessing">With the blessings of our families</p>
          <h1>
            Aditi <span>&amp;</span> Eshaan
          </h1>
          <div className="date-rule">
            <i />
            20 · 11 · 2026
            <i />
          </div>
          <p>Muzaffarpur, Bihar</p>
        </motion.div>
        <motion.div className="leaf-float left" style={{ y: reduce ? 0 : leafY }} />
        <motion.div className="leaf-float right" style={{ y: reduce ? 0 : leafY }} />
        <div className="scroll-cue">
          <ArrowDown size={20} />
          <span>Our celebration</span>
        </div>
      </section>

      <section className="count-section">
        <Reveal>
          <p className="kicker">Until we say “I do”</p>
          <h2>Counting every heartbeat</h2>
          <Countdown />
        </Reveal>
      </section>

      <ScratchSection />

      <section className="story ornamental">
        <Reveal className="story-inner">
          <FlowerLotus size={34} weight="thin" />
          <p className="script">A celebration of love</p>
          <h2>Two paths, one forever</h2>
          <p>
            From chance hellos to a thousand shared dreams, we found home in each other. With joyful hearts, we invite you to witness the beginning of our forever.
          </p>
          <div className="signature">
            Aditi <i>&amp;</i> Eshaan
          </div>
        </Reveal>
      </section>

      <section className="parents-section" style={{textAlign: 'center', padding: '40px 20px', background: 'var(--ivory)'}}>
        <Reveal>
          <div className="parent-profile" style={{marginBottom: '40px'}}>
            <div className="profile-img" style={{width: '120px', height: '120px', borderRadius: '50%', background: '#ebd7b2', margin: '0 auto 15px', border: '3px solid var(--gold)'}}></div>
            <p className="script" style={{margin: '0', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)'}}>Bride</p>
            <h3 style={{fontFamily: 'Parisienne, cursive', fontSize: '32px', color: 'var(--olive)', margin: '5px 0'}}>Aditi</h3>
            <p style={{fontSize: '14px', color: 'var(--ink)', fontStyle: 'italic', margin: '5px 0'}}>Daughter of</p>
            <p style={{fontSize: '16px', color: 'var(--ink)', margin: '0'}}>Vishal Sarraf & Annu Sarraf</p>
          </div>
          
          <div className="parent-profile">
            <div className="profile-img" style={{width: '120px', height: '120px', borderRadius: '50%', background: '#ebd7b2', margin: '0 auto 15px', border: '3px solid var(--gold)'}}></div>
            <p className="script" style={{margin: '0', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)'}}>Groom</p>
            <h3 style={{fontFamily: 'Parisienne, cursive', fontSize: '32px', color: 'var(--olive)', margin: '5px 0'}}>Eshaan</h3>
            <p style={{fontSize: '14px', color: 'var(--ink)', fontStyle: 'italic', margin: '5px 0'}}>Son of</p>
            <p style={{fontSize: '16px', color: 'var(--ink)', margin: '0'}}>Sanjay Singh & Swera Singh</p>
          </div>
        </Reveal>
      </section>

      <section className="ceremony-moment">
        <div className="floating-glass lotus-one">✿</div>
        <div className="floating-glass lotus-two">❀</div>
        <div className="floating-diya">◒</div>
        <div className="ceremony-image">
          <img src={media.ceremony} loading="lazy" alt="Aarav and Ananya sharing a joyful haldi and mehendi moment" />
        </div>
        <Reveal className="ceremony-caption">
          <p className="script">Painted in sunshine</p>
          <h2>Before forever begins</h2>
          <p>Turmeric on our cheeks, henna on our hands, and every favorite person gathered close.</p>
          <span>Swipe through our celebrations below</span>
        </Reveal>
      </section>

      <section className="events">
        <Reveal>
          <h2>Wedding festivities</h2>
          <p className="section-intro">Five beautiful moments. One unforgettable celebration.</p>
        </Reveal>
        <div className="event-list">
          {events.map((e, i) => (
            <Reveal key={e.name} className={'event ' + (i === 3 ? 'featured' : '')}>
              <div className="event-number">0{i + 1}</div>
              <div>
                <span className="event-icon">{e.icon}</span>
                <h3>{e.name}</h3>
                <p>{e.note}</p>
                <dl>
                  <div><dt>Date</dt><dd>{e.date}</dd></div>
                  <div><dt>Time</dt><dd>{e.time}</dd></div>
                  <div><dt>Venue</dt><dd>{e.venue}</dd></div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="venue ornamental">
        <Reveal>
          <MapPin size={38} weight="thin" />
          <p className="script">Meet us in Muzaffarpur</p>
          <h2>Landmark</h2>
          <p>Chowk, Main Road, above Reliance Digital, Maripur, Muzaffarpur, Bihar 842001</p>
          <div className="map google-map">
            <iframe
              title="Google Map of Landmark, Muzaffarpur"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Landmark%2C%20Maripur%2C%20Muzaffarpur&z=15&output=embed"
            />
            <div className="map-overlay">
              <span>
                <MapPin size={19} weight="fill" />
                Engagement venue
              </span>
              <b>Landmark, Muzaffarpur</b>
              <small>Pinch or drag to explore</small>
            </div>
          </div>
          <div className="actions">
            <a
              className="button primary"
              href="https://www.google.com/maps/search/?api=1&query=Landmark+Maripur+Muzaffarpur"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={19} />
              Open in Google Maps
            </a>
            <button className="button secondary" onClick={downloadWeddingIcs}>
              <CalendarBlank size={19} />
              Add to Calendar
            </button>
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="flower-float" style={{ position: 'absolute', top: '55%', right: '10%', color: 'var(--rose)', opacity: 0.8, animation: 'glassFloat 4s ease-in-out infinite alternate' }}>
          <FlowerLotus size={64} weight="thin" />
        </div>
        <div className="flower-float" style={{ position: 'absolute', top: '65%', left: '8%', color: 'var(--gold)', opacity: 0.7, animation: 'glassFloat 5s ease-in-out infinite alternate-reverse' }}>
          <FlowerLotus size={48} weight="light" />
        </div>
        <div className="flower-float" style={{ position: 'absolute', top: '78%', right: '15%', color: 'var(--olive)', opacity: 0.5, animation: 'glassFloat 6s ease-in-out infinite alternate' }}>
          <FlowerLotus size={32} weight="thin" />
        </div>
        <div className="flower-float" style={{ position: 'absolute', top: '52%', left: '18%', color: 'var(--coral)', opacity: 0.6, animation: 'glassFloat 4.5s ease-in-out infinite alternate-reverse' }}>
          <FlowerLotus size={40} weight="light" />
        </div>
        <img src={media.footer} loading="lazy" alt="Aditi and Eshaan wedding illustration" />
        <div className="footer-overlay" />
        <Reveal className="footer-copy">
          <Sparkle size={27} weight="thin" />
          <p>We cannot wait to celebrate with you</p>
          <h2>
            Aditi <i>&amp;</i> Eshaan
          </h2>
          <span>20 November 2026 · Muzaffarpur</span>
        </Reveal>
        <Credit />
      </footer>
    </main>
  )
}
