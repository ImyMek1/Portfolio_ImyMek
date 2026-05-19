import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Globe, ExternalLink, Send, ArrowUpRight, Check } from 'lucide-react'
import { gsap } from '@lib/gsap'
import { ease } from '@lib/animations'
import { SpotlightGlow } from '@components/effects'

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
const CONTACT_INFO = [
  { icon: Mail,   label: 'Email',    value: 'imane.maftah19@mail.com', href: 'mailto:imane.maftah19@mail.com' },
  { icon: Phone,  label: 'Phone',    value: '06 60 46 29 26',          href: 'tel:+212660462926'              },
  { icon: MapPin, label: 'Location', value: 'Casablanca, Morocco',     href: null                             },
]

const EXTERNAL_LINKS = [
  { icon: Globe,        label: 'LinkedIn',     display: 'Imane Maftah El Kheir', href: 'https://www.linkedin.com/in/imane-maftah-el-kheir/' },
  { icon: ExternalLink, label: 'GitHub',       display: 'ImyMek1',               href: 'https://github.com/ImyMek1'                         },
  { icon: ExternalLink, label: 'Live Project', display: 'YallaTrip',             href: 'https://yalla-trip.netlify.app/'                    },
]

const PROJECT_TYPES = [
  'Web Development',
  'Photography',
  'Videography',
  'Volunteering / Community',
  'Collaboration',
]

const COLLAB_CATEGORIES = [
  { label: 'Full Stack Development', symbol: '</>', accent: 'var(--color-crimson)'      },
  { label: 'Visual Storytelling',    symbol: '◉',  accent: 'var(--color-violet)'        },
  { label: 'Community Impact',       symbol: '♡',  accent: 'var(--color-rose)'          },
  { label: 'Creative Content',       symbol: '▣',  accent: 'rgba(247,180,50,0.85)'      },
]

/* ════════════════════════════════════════════════════════════
   DECORATIVE CIRCUIT SVG — subtle console texture
════════════════════════════════════════════════════════════ */
function CircuitDeco() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{
        position: 'absolute', top: -8, right: -8,
        width: 160, height: 160,
        opacity: 0.065, pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <path d="M 200 0 L 120 80"  stroke="var(--color-rose)"    strokeWidth="0.9" strokeDasharray="5 5" />
      <path d="M 200 40 L 140 100" stroke="var(--color-crimson)" strokeWidth="0.7" strokeDasharray="3 7" />
      <path d="M 200 90 L 160 130" stroke="var(--color-violet)"  strokeWidth="0.5" strokeDasharray="2 9" />
      <circle cx="120" cy="80"  r="3.5" fill="var(--color-rose)"    />
      <circle cx="140" cy="100" r="2.0" fill="var(--color-crimson)" />
      <circle cx="160" cy="130" r="2.5" fill="var(--color-violet)"  />
      <path d="M 120 80 L 100 100 L 80 100" stroke="var(--color-rose)" strokeWidth="0.6" />
      <circle cx="80" cy="100" r="2" fill="var(--color-rose)" opacity="0.6" />
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════════════════════ */
function ContactForm() {
  const [fields,    setFields]    = useState({ name: '', email: '', type: '', message: '' })
  const [focused,   setFocused]   = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }
  const handleReset  = ()  => { setSubmitted(false); setFields({ name: '', email: '', type: '', message: '' }) }

  const baseInput = {
    width: '100%',
    padding: '11px 14px',
    background: 'color-mix(in srgb, var(--color-surface-1) 55%, transparent)',
    borderRadius: 10,
    color: 'var(--color-text)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    boxSizing: 'border-box',
  }

  const inputStyle = (field) => ({
    ...baseInput,
    border: `1px solid ${focused === field
      ? 'color-mix(in srgb, var(--color-rose) 58%, transparent)'
      : 'color-mix(in srgb, var(--border-soft) 90%, transparent)'}`,
    boxShadow: focused === field
      ? '0 0 0 3px color-mix(in srgb, var(--color-crimson) 10%, transparent), inset 0 1px 0 rgba(255,244,247,0.03)'
      : 'inset 0 1px 0 rgba(255,244,247,0.02)',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.46rem',
    letterSpacing: '0.20em',
    textTransform: 'uppercase',
    color: 'var(--color-text-faint)',
    marginBottom: 7,
  }

  return (
    <div
      className="contact-form glass"
      style={{
        borderRadius: 18,
        padding: 'clamp(18px, 3vw, 28px)',
        border: '1px solid color-mix(in srgb, var(--color-crimson) 20%, var(--border-soft))',
        boxShadow: '0 8px 40px rgba(5,2,7,0.65), inset 0 1px 0 rgba(255,244,247,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CircuitDeco />

      {/* Console header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.div
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: 'var(--color-rose)',
              boxShadow: '0 0 8px 2px color-mix(in srgb, var(--color-rose) 55%, transparent)',
            }}
          />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.49rem',
            letterSpacing: '0.20em', textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            Contact Console
          </span>
        </div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem',
          letterSpacing: '0.12em', color: 'var(--color-text-faint)',
        }}>
          v1.0
        </span>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (

          /* ── Success state ──────────────────────────────── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.42, ease: ease.expo }}
            style={{ textAlign: 'center', padding: '32px 16px 24px' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.14, duration: 0.48, ease: ease.back }}
              style={{
                width: 52, height: 52, borderRadius: '50%', margin: '0 auto 18px',
                background: 'color-mix(in srgb, var(--color-rose) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-rose) 35%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px color-mix(in srgb, var(--color-rose) 18%, transparent)',
              }}
            >
              <Check size={22} color="var(--color-rose)" strokeWidth={2} />
            </motion.div>

            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-rose)', marginBottom: 12,
            }}>
              Message Queued
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.70rem',
              color: 'var(--color-text-soft)', lineHeight: 1.65,
              margin: '0 0 22px',
            }}>
              Message ready — backend integration can be added later.
            </p>

            <motion.button
              onClick={handleReset}
              whileHover={{ background: 'color-mix(in srgb, var(--color-surface-2) 80%, transparent)' }}
              transition={{ duration: 0.18 }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-soft)',
                borderRadius: 9,
                padding: '9px 22px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
              }}
            >
              Send Another
            </motion.button>
          </motion.div>

        ) : (

          /* ── Form state ─────────────────────────────────── */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.32 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Name + Email row */}
            <div className="form-name-email" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  name="name" type="text" placeholder="Your name" required
                  value={fields.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('name')}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  name="email" type="email" placeholder="your@email.com" required
                  value={fields.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('email')}
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label style={labelStyle}>Project Type</label>
              <select
                name="type" required
                value={fields.type}
                onChange={handleChange}
                onFocus={() => setFocused('type')}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle('type'), cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="" disabled style={{ background: '#0d0610' }}>Select a type…</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t} style={{ background: '#0d0610', color: '#fff4f7' }}>{t}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message" rows={5}
                placeholder="Tell me about your project or idea…"
                required
                value={fields.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 110 }}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{
                background: 'color-mix(in srgb, var(--color-crimson) 85%, #000)',
                boxShadow: '0 6px 28px rgba(194,42,77,0.42), 0 0 0 1px rgba(194,42,77,0.28)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: ease.expo }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 24px',
                background: 'var(--color-crimson)',
                border: 'none',
                borderRadius: 12,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.53rem',
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(194,42,77,0.28)',
              }}
            >
              <Send size={11} strokeWidth={1.8} />
              Send Message
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   AVAILABILITY CARD
════════════════════════════════════════════════════════════ */
function AvailabilityCard() {
  return (
    <div
      className="contact-avail glass"
      style={{
        borderRadius: 16,
        padding: '18px 20px',
        border: '1px solid color-mix(in srgb, var(--color-rose) 18%, var(--border-soft))',
        boxShadow: '0 4px 20px rgba(5,2,7,0.45)',
      }}
    >
      {/* Status row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: -3, top: -3,
              width: 14, height: 14, borderRadius: '50%',
              background: 'rgba(74,222,128,0.22)',
            }}
          />
          <div style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(74,222,128,0.9)',
            boxShadow: '0 0 8px 2px rgba(74,222,128,0.35)',
            position: 'relative', zIndex: 1,
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(74,222,128,0.85)',
          }}>
            Open to Work
          </span>
        </div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem',
          letterSpacing: '0.12em', color: 'var(--color-text-faint)',
        }}>
          NOW
        </span>
      </div>

      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.68rem',
        color: 'var(--color-text-soft)', lineHeight: 1.6,
        margin: '0 0 16px',
      }}>
        Available for selected projects and collaborations.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {COLLAB_CATEGORIES.map((cat) => (
          <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.54rem',
              color: cat.accent, flexShrink: 0, width: 18, textAlign: 'center',
            }}>
              {cat.symbol}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: 'var(--color-text-soft)' }}>
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   INFO CARD — email / phone / location
════════════════════════════════════════════════════════════ */
function InfoCard({ icon: Icon, label, value, href }) {
  const inner = (
    <motion.div
      whileHover={href ? { y: -2, background: 'color-mix(in srgb, var(--color-crimson) 7%, transparent)' } : {}}
      transition={{ duration: 0.2, ease: ease.expo }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px',
        borderRadius: 12,
        border: '1px solid var(--border-soft)',
        background: 'color-mix(in srgb, var(--color-surface-1) 45%, transparent)',
        textDecoration: 'none',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
        background: 'color-mix(in srgb, var(--color-crimson) 10%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-crimson) 22%, transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={12} color="var(--color-rose)" strokeWidth={1.8} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--color-text-faint)', marginBottom: 3,
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.68rem',
          color: 'var(--color-text-soft)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {value}
        </div>
      </div>
      {href && <ArrowUpRight size={10} color="var(--color-text-faint)" strokeWidth={1.5} style={{ flexShrink: 0 }} />}
    </motion.div>
  )

  if (!href) return inner

  const isExternal = href.startsWith('http')
  return (
    <a href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ textDecoration: 'none' }}>
      {inner}
    </a>
  )
}

/* ════════════════════════════════════════════════════════════
   LINK ROW — LinkedIn / GitHub / Live
════════════════════════════════════════════════════════════ */
function LinkRow({ icon: Icon, label, display, href, isLast }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2, ease: ease.expo }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--border-dim)',
        textDecoration: 'none',
        color: 'var(--color-text-muted)',
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: 'color-mix(in srgb, var(--color-surface-1) 60%, transparent)',
        border: '1px solid var(--border-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={11} color="var(--color-text-faint)" strokeWidth={1.6} />
      </div>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.48rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--color-text-faint)', flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
        color: 'var(--color-text-soft)', flex: 1,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {display}
      </span>
      <motion.span
        whileHover={{ color: 'var(--color-rose)' }}
        style={{ flexShrink: 0 }}
      >
        <ArrowUpRight size={10} strokeWidth={1.5} color="var(--color-text-faint)" />
      </motion.span>
    </motion.a>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════ */
export default function Contact() {
  const sectionRef = useRef(null)
  const reduced    = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.set(['.contact-form', '.contact-avail'], { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      tl.from('.contact-label',    { y: 14, opacity: 0, duration: 0.65 }, 0.00)
        .from('.contact-title-1',  { y: 36, opacity: 0, duration: 0.85 }, 0.10)
        .from('.contact-title-2',  { y: 36, opacity: 0, duration: 0.85 }, 0.22)
        .from('.contact-subtitle', { y: 16, opacity: 0, duration: 0.70 }, 0.34)
        .from('.contact-intro',    { y: 14, opacity: 0, duration: 0.65 }, 0.44)
        .from('.contact-cards',    { y: 12, opacity: 0, duration: 0.60 }, 0.52)
        .from('.contact-links',    { y: 10, opacity: 0, duration: 0.55 }, 0.60)
        .fromTo('.contact-form',   { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.80 }, 0.30)
        .fromTo('.contact-avail',  { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.64)
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <SpotlightGlow
        color="var(--color-crimson)"
        size="600px"
        intensity={12}
        blur={90}
        style={{ position: 'absolute', top: '5%', right: '10%', pointerEvents: 'none' }}
      />
      <SpotlightGlow
        color="var(--color-violet)"
        size="500px"
        intensity={8}
        blur={110}
        style={{ position: 'absolute', bottom: '5%', left: '0%', pointerEvents: 'none' }}
      />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid       { grid-template-columns: 1fr !important; }
          .contact-left-col   { position: static !important; }
          .form-name-email    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '42% 1fr',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          alignItems: 'start',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* ── LEFT COLUMN ───────────────────────────────── */}
        <div className="contact-left-col" style={{ position: 'sticky', top: '100px' }}>

          {/* Section label */}
          <div className="contact-label" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.48rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--color-text-faint)',
            }}>
              05 / Contact
            </span>
            <div style={{ height: '1px', width: 28, background: 'var(--border-soft)' }} />
          </div>

          {/* Heading */}
          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <h2
              className="contact-title-1 font-editorial"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 0.92,
                color: 'var(--color-text)',
                margin: 0,
              }}
            >
              Let's
            </h2>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            <h2
              className="contact-title-2 font-editorial"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 0.92,
                fontStyle: 'italic',
                color: 'color-mix(in srgb, var(--color-crimson) 6%, transparent)',
                WebkitTextStroke: '1.2px color-mix(in srgb, var(--color-rose) 62%, var(--color-crimson))',
                textShadow: '0 0 30px color-mix(in srgb, var(--color-crimson) 22%, transparent)',
                margin: 0,
              }}
            >
              Talk.
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className="contact-subtitle"
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.80rem',
              color: 'var(--color-text-soft)', lineHeight: 1.5,
              margin: '0 0 10px',
            }}
          >
            Ready to build, capture, create, and collaborate.
          </p>

          {/* Intro */}
          <p
            className="contact-intro"
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.71rem',
              color: 'var(--color-text-muted)', lineHeight: 1.75,
              margin: '0 0 28px',
            }}
          >
            For development projects, creative collaborations, photography,
            videography, or community initiatives — feel free to get in touch.
          </p>

          {/* Contact info cards */}
          <div className="contact-cards" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
            {CONTACT_INFO.map((item) => (
              <InfoCard key={item.label} {...item} />
            ))}
          </div>

          {/* External links */}
          <div className="contact-links">
            {EXTERNAL_LINKS.map((link, i) => (
              <LinkRow key={link.label} {...link} isLast={i === EXTERNAL_LINKS.length - 1} />
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ContactForm />
          <AvailabilityCard />
        </div>
      </div>
    </section>
  )
}
