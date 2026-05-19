import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Camera, Film, Scissors, Layers,
  Eye, Send, ArrowUpRight, Aperture,
} from 'lucide-react'
import { gsap } from '@lib/gsap'
import { ease } from '@lib/animations'
import { SpotlightGlow } from '@components/effects'

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
const FILTERS = ['All', 'Photography', 'Videography', 'Editing', 'Content']

const GALLERY_ITEMS = [
  {
    id: 1,
    type: 'photo',
    category: 'Photography',
    title: 'Photography',
    tagline: 'Light · Composition · Emotion',
    desc: 'Portraits, lifestyle moments, urban details, and emotional compositions.',
    cta: 'View Collection',
    accent: 'var(--color-rose)',
    icon: Camera,
  },
  {
    id: 2,
    type: 'video',
    category: 'Videography',
    title: 'Videography',
    tagline: 'Motion · Scene · Story',
    desc: 'Motion, scenes, storytelling, and cinematic sequences.',
    cta: 'Watch Reel',
    accent: 'var(--color-crimson)',
    icon: Film,
  },
  {
    id: 3,
    type: 'edit',
    category: 'Editing',
    title: 'Editing',
    tagline: 'Color · Rhythm · Identity',
    desc: 'Color, rhythm, transitions, and polished visual identity.',
    cta: 'Explore Edit',
    accent: 'var(--color-violet)',
    icon: Scissors,
  },
  {
    id: 4,
    type: 'content',
    category: 'Content',
    title: 'Content Creation',
    tagline: 'Visual · Community · Digital',
    desc: 'Visual content for community, events, and digital communication.',
    cta: 'See Content',
    accent: 'rgba(247,180,50,0.90)',
    icon: Layers,
  },
]

const CREATIVE_TOOLS = [
  { slug: 'Ps', name: 'Photoshop',     bg: 'rgba(49,168,255,0.10)',  bd: 'rgba(49,168,255,0.24)',  fg: '#31A8FF' },
  { slug: 'Pr', name: 'Premiere',      bg: 'rgba(234,119,255,0.10)', bd: 'rgba(234,119,255,0.24)', fg: '#ea77ff' },
  { slug: 'Lr', name: 'Lightroom',     bg: 'rgba(144,192,255,0.10)', bd: 'rgba(144,192,255,0.24)', fg: '#90c0ff' },
  { slug: 'Ae', name: 'After Effects', bg: 'rgba(153,153,255,0.10)', bd: 'rgba(153,153,255,0.24)', fg: '#9999FF' },
  { slug: 'Cv', name: 'Canva',         bg: 'rgba(0,196,204,0.10)',   bd: 'rgba(0,196,204,0.24)',   fg: '#00C4CC' },
  { slug: 'Cc', name: 'CapCut',        bg: 'rgba(255,255,255,0.05)', bd: 'rgba(255,255,255,0.14)', fg: 'rgba(255,255,255,0.65)' },
]

const PROCESS_STEPS = [
  { num: '01', label: 'Concept',  desc: 'Vision, mood, narrative',    icon: Eye      },
  { num: '02', label: 'Capture',  desc: 'Shoot, record, document',    icon: Camera   },
  { num: '03', label: 'Edit',     desc: 'Color, cut, refine',          icon: Scissors },
  { num: '04', label: 'Deliver',  desc: 'Publish, share, impact',     icon: Send     },
]

const STEP_COLORS = [
  'var(--color-rose)',
  'var(--color-crimson)',
  'var(--color-violet)',
  'rgba(34,211,238,0.80)',
]

/* ════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
════════════════════════════════════════════════════════════ */
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily:    'JetBrains Mono, monospace',
        fontSize:      '0.5rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding:       '6px 14px',
        borderRadius:  9999,
        border:        active
          ? '1px solid color-mix(in srgb, var(--color-rose) 40%, var(--border-soft))'
          : '1px solid var(--border-dim)',
        background:    active
          ? 'color-mix(in srgb, var(--color-crimson) 12%, transparent)'
          : 'transparent',
        color:         active ? 'var(--color-text)' : 'var(--color-text-muted)',
        cursor:        'pointer',
        transition:    'all 0.25s ease',
        whiteSpace:    'nowrap',
      }}
    >
      {label}
    </button>
  )
}

/* ════════════════════════════════════════════════════════════
   ABSTRACT VISUALS
════════════════════════════════════════════════════════════ */

/* ── Featured cinematic visual ───────────────────────────── */
function CinematicVisual() {
  const RING_DOTS = [0, 60, 120, 180, 240, 300]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Deep background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(145deg, rgba(8,2,12,0.95) 0%, rgba(18,4,14,0.92) 55%, rgba(8,2,12,0.95) 100%)',
      }} />

      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(224,68,109,0.055) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />

      {/* Light leak — top left warm */}
      <div style={{
        position: 'absolute', top: '-22%', left: '-8%',
        width: '52%', height: '68%',
        background: 'radial-gradient(ellipse, rgba(194,42,77,0.11) 0%, rgba(157,78,221,0.06) 42%, transparent 72%)',
        transform: 'rotate(-22deg)',
        pointerEvents: 'none',
      }} />

      {/* Light leak — bottom right cool */}
      <div style={{
        position: 'absolute', bottom: '-18%', right: '-6%',
        width: '44%', height: '56%',
        background: 'radial-gradient(ellipse, rgba(157,78,221,0.09) 0%, rgba(194,42,77,0.05) 45%, transparent 72%)',
        transform: 'rotate(18deg)',
        pointerEvents: 'none',
      }} />

      {/* ── Aperture ring cluster ─── */}
      <div style={{
        position: 'absolute',
        right: '9%', top: '50%', transform: 'translateY(-50%)',
        width: 218, height: 218,
        pointerEvents: 'none',
      }}>
        {/* Outer ring — rotates slowly */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1px solid rgba(224,68,109,0.18)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {RING_DOTS.map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x = 50 + 50 * Math.cos(rad)
            const y = 50 + 50 * Math.sin(rad)
            return (
              <div key={angle} style={{
                position: 'absolute',
                left: `${x}%`, top: `${y}%`,
                width: 3, height: 3, borderRadius: '50%',
                background: 'rgba(224,68,109,0.48)',
                transform: 'translate(-50%,-50%)',
              }} />
            )
          })}
        </motion.div>

        {/* Static inner rings */}
        {[0.78, 0.57, 0.38].map((scale, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${scale * 100}%`, height: `${scale * 100}%`,
            left: `${(1 - scale) * 50}%`, top: `${(1 - scale) * 50}%`,
            borderRadius: '50%',
            border: `1px solid rgba(224,68,109,${0.14 + i * 0.07})`,
            background: i === 2
              ? 'radial-gradient(circle, rgba(194,42,77,0.15) 0%, rgba(157,78,221,0.08) 60%, transparent 100%)'
              : 'transparent',
          }} />
        ))}

        {/* Center glow */}
        <div style={{
          position: 'absolute', left: '41%', top: '41%', width: '18%', height: '18%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194,42,77,0.60) 0%, rgba(157,78,221,0.30) 55%, transparent 100%)',
          boxShadow: '0 0 18px rgba(194,42,77,0.45), 0 0 40px rgba(157,78,221,0.18)',
        }} />
      </div>

      {/* Film strip — bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 20,
        background: 'rgba(4,1,8,0.82)',
        borderTop: '1px solid rgba(255,244,247,0.05)',
        display: 'flex', alignItems: 'center', padding: '0 4px', gap: 2,
        overflow: 'hidden',
      }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} style={{
            width: 13, height: 12, flexShrink: 0, borderRadius: 1,
            border: '1px solid rgba(255,244,247,0.07)',
            background: i % 6 === 2 ? 'rgba(194,42,77,0.12)' : 'transparent',
          }} />
        ))}
      </div>

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 72% 50%, transparent 32%, rgba(5,1,8,0.55) 72%, rgba(5,1,8,0.88) 100%)',
      }} />

      {/* Left text fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(9,2,5,0.97) 0%, rgba(9,2,5,0.54) 36%, rgba(9,2,5,0.04) 60%)',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(9,2,5,0.80) 0%, transparent 42%)',
      }} />
    </div>
  )
}

/* ── Small gallery card visuals ──────────────────────────── */
function GalleryVisual({ type }) {
  const FADE = 'linear-gradient(to right, rgba(9,2,5,0.97) 0%, rgba(9,2,5,0.52) 38%, rgba(9,2,5,0.04) 60%)'
  const FADE_B = 'linear-gradient(to top, rgba(9,2,5,0.78) 0%, transparent 40%)'

  /* Photography — aperture rings + bokeh */
  if (type === 'photo') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(224,68,109,0.06) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }} />
      {/* Aperture */}
      <div style={{ position: 'absolute', right: '7%', top: '50%', transform: 'translateY(-50%)', width: 95, height: 95 }}>
        {[1.0, 0.72, 0.48, 0.26].map((scale, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${scale * 100}%`, height: `${scale * 100}%`,
            left: `${(1 - scale) * 50}%`, top: `${(1 - scale) * 50}%`,
            borderRadius: '50%',
            border: `1px solid rgba(224,68,109,${0.16 + i * 0.09})`,
            background: i === 3
              ? 'radial-gradient(circle, rgba(224,68,109,0.28) 0%, transparent 100%)'
              : 'transparent',
          }} />
        ))}
        <div style={{
          position: 'absolute', left: '40%', top: '40%', width: '20%', height: '20%',
          borderRadius: '50%', background: 'rgba(224,68,109,0.62)',
          boxShadow: '0 0 10px rgba(224,68,109,0.52)',
        }} />
      </div>
      {/* Bokeh */}
      {[[80, 18, 4], [88, 70, 3], [62, 80, 5]].map(([x, y, r], i) => (
        <div key={i} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          width: r * 2, height: r * 2, borderRadius: '50%',
          background: 'rgba(224,68,109,0.38)',
          boxShadow: `0 0 ${r * 4}px rgba(224,68,109,0.26)`,
          transform: 'translate(-50%,-50%)',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
      <div style={{ position: 'absolute', inset: 0, background: FADE_B }} />
    </div>
  )

  /* Videography — clapperboard stripe + waveform */
  if (type === 'video') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Clapperboard stripe */}
      <div style={{
        position: 'absolute', top: 0, right: '5%', width: '55%', height: 9,
        display: 'flex', overflow: 'hidden',
      }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            background: i % 2 === 0 ? 'rgba(194,42,77,0.32)' : 'rgba(194,42,77,0.08)',
          }} />
        ))}
      </div>
      {/* Waveform */}
      <div style={{
        position: 'absolute', right: '5%', top: '22%', width: '50%', height: '52%',
        display: 'flex', alignItems: 'center', gap: 3,
      }}>
        {[0.35, 0.68, 0.45, 0.88, 0.55, 0.92, 0.42, 0.70, 0.30, 0.60, 0.50, 0.76].map((h, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 2, alignSelf: 'center',
            height: `${h * 100}%`,
            background: `rgba(194,42,77,${0.18 + h * 0.42})`,
          }} />
        ))}
      </div>
      {/* Play triangle */}
      <div style={{
        position: 'absolute', right: '28%', top: '60%',
        width: 0, height: 0,
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderLeft: '10px solid rgba(194,42,77,0.55)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
      <div style={{ position: 'absolute', inset: 0, background: FADE_B }} />
    </div>
  )

  /* Editing — color grade + timeline */
  if (type === 'edit') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', right: '5%', top: '15%',
        width: '54%', height: '70%', borderRadius: 8,
        background: 'rgba(4,1,8,0.85)', border: '1px solid rgba(157,78,221,0.14)',
        overflow: 'hidden', padding: '7px 8px',
      }}>
        {/* Color grade bars */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 6, height: 30 }}>
          {[
            'rgba(157,78,221,0.55)', 'rgba(194,42,77,0.50)',
            'rgba(97,218,251,0.44)', 'rgba(247,180,50,0.44)',
            'rgba(74,222,128,0.40)',
          ].map((c, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 3, background: c }} />
          ))}
        </div>
        {/* Timeline tracks */}
        {[0.82, 0.60, 0.92, 0.52].map((w, i) => (
          <div key={i} style={{
            height: 5, borderRadius: 2, marginBottom: 4,
            background: `rgba(157,78,221,${0.08 + i * 0.03})`,
            border: '1px solid rgba(157,78,221,0.13)',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              height: '100%', width: `${w * 100}%`, borderRadius: 2,
              background: `rgba(157,78,221,${0.28 + i * 0.06})`,
            }} />
          </div>
        ))}
        {/* Playhead */}
        <div style={{
          position: 'absolute', left: '57%', top: '16%', bottom: '6%',
          width: 1, background: 'rgba(224,68,109,0.62)',
        }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
      <div style={{ position: 'absolute', inset: 0, background: FADE_B }} />
    </div>
  )

  /* Content Creation — social grid mockup */
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', right: '4%', top: '8%',
        width: '56%', height: '84%', borderRadius: 8,
        background: 'rgba(4,1,8,0.84)', border: '1px solid rgba(247,180,50,0.14)',
        overflow: 'hidden', padding: '6px',
      }}>
        {/* Header */}
        <div style={{
          height: 8, borderRadius: 3, marginBottom: 4,
          background: 'rgba(247,180,50,0.08)', border: '1px solid rgba(247,180,50,0.12)',
        }} />
        {/* 3×3 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {[
            { bg: 'rgba(247,180,50,0.28)', line: true },
            { bg: 'rgba(194,42,77,0.20)',  line: false },
            { bg: 'rgba(157,78,221,0.20)', line: true  },
            { bg: 'rgba(247,180,50,0.14)', line: false },
            { bg: 'rgba(247,180,50,0.22)', line: true  },
            { bg: 'rgba(194,42,77,0.16)',  line: false },
            { bg: 'rgba(157,78,221,0.16)', line: true  },
            { bg: 'rgba(247,180,50,0.18)', line: false },
            { bg: 'rgba(194,42,77,0.12)',  line: true  },
          ].map((cell, i) => (
            <div key={i} style={{
              height: 24, borderRadius: 3,
              background: cell.bg, padding: '3px 4px',
            }}>
              {cell.line && (
                <div style={{ width: '68%', height: 2, background: 'rgba(255,244,247,0.20)', borderRadius: 1 }} />
              )}
            </div>
          ))}
        </div>
        {/* Engagement strip */}
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {[36, 20, 28].map((w, i) => (
            <div key={i} style={{
              width: w, height: 4, borderRadius: 2,
              background: `rgba(247,180,50,${0.22 - i * 0.06})`,
            }} />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
      <div style={{ position: 'absolute', inset: 0, background: FADE_B }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   FEATURED CREATIVE CARD
════════════════════════════════════════════════════════════ */
function FeaturedCreativeCard() {
  return (
    <motion.div
      className="creative-featured glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 18,
        border:       '1px solid color-mix(in srgb, var(--color-crimson) 26%, var(--border-soft))',
        boxShadow:    '0 6px 32px rgba(5,2,7,0.65), inset 0 1px 0 rgba(255,244,247,0.05)',
        minHeight:    238,
        cursor:       'default',
      }}
      whileHover={{
        boxShadow: '0 24px 58px rgba(5,2,7,0.84), 0 0 44px rgba(194,42,77,0.13), inset 0 1px 0 rgba(255,244,247,0.07)',
        borderColor: 'color-mix(in srgb, var(--color-crimson) 40%, var(--border-soft))',
      }}
      transition={{ duration: 0.35, ease: ease.expo }}
    >
      {/* Visual with slow float */}
      <div style={{ position: 'absolute', inset: -8, overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CinematicVisual />
        </motion.div>
      </div>

      {/* Content */}
      <div className="creative-featured-content" style={{
        position:  'relative', zIndex: 2,
        padding:   'clamp(20px, 2.8vw, 32px)',
        maxWidth:  '52%',
        display:   'flex', flexDirection: 'column', gap: 12,
        minHeight: 238, justifyContent: 'center',
      }}>
        {/* Header: three discipline icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 11px', borderRadius: 8,
            background: 'rgba(194,42,77,0.09)',
            border: '1px solid rgba(194,42,77,0.22)',
          }}>
            <Camera   size={9} strokeWidth={1.5} color="var(--color-rose)"    />
            <Film     size={9} strokeWidth={1.5} color="var(--color-crimson)" />
            <Scissors size={9} strokeWidth={1.5} color="var(--color-violet)"  />
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--color-crimson)', opacity: 0.78,
          }}>
            Featured · 2024
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize:      'clamp(1.55rem, 2.6vw, 2.3rem)',
            fontWeight:    300, lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: '0 0 5px',
          }}>
            Visual Storytelling
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize:   '0.88rem', fontStyle: 'italic', fontWeight: 300,
            color:      'var(--color-text-soft)', margin: 0, opacity: 0.78,
          }}>
            Photography · Videography · Editing
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize:   'clamp(0.67rem, 0.92vw, 0.76rem)',
          color:      'var(--color-text-muted)', lineHeight: 1.78, margin: 0,
        }}>
          Photography and video creation focused on mood, composition, light, and meaningful moments.
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['Cinematic', 'Storytelling', 'Portrait', 'Motion'].map((tag) => (
            <span key={tag} style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '0.43rem', letterSpacing: '0.09em',
              padding:       '3px 9px', borderRadius: 6,
              background:    'color-mix(in srgb, var(--color-crimson) 10%, rgba(9,2,5,0.8))',
              border:        '1px solid color-mix(in srgb, var(--color-crimson) 22%, transparent)',
              color:         'color-mix(in srgb, var(--color-crimson) 80%, var(--color-text-soft))',
              flexShrink:    0,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'default' }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2, ease: ease.expo }}
          >
            <span style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '0.48rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--color-rose)', opacity: 0.85,
            }}>
              Explore Story
            </span>
            <ArrowUpRight size={9} strokeWidth={1.5} color="var(--color-rose)" style={{ opacity: 0.85 }} />
          </motion.div>
          <div style={{ width: 1, height: 10, background: 'var(--border-dim)' }} />
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'default' }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2, ease: ease.expo }}
          >
            <span style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '0.48rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--color-text-muted)',
            }}>
              View Work
            </span>
            <ArrowUpRight size={9} strokeWidth={1.5} color="var(--color-text-muted)" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   GALLERY CARD (small)
════════════════════════════════════════════════════════════ */
function GalleryCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const { icon: Icon, accent } = item

  return (
    <motion.div
      className="creative-gallery-card glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 15,
        border:       `1px solid color-mix(in srgb, ${accent} 20%, var(--border-soft))`,
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        minHeight:    168,
        cursor:       'default',
      }}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, ease: ease.expo, delay: index * 0.08 }}
      whileHover={{
        y: -6,
        boxShadow: `0 22px 52px rgba(5,2,7,0.80), 0 0 30px color-mix(in srgb, ${accent} 16%, transparent), inset 0 1px 0 rgba(255,244,247,0.06)`,
        borderColor: `color-mix(in srgb, ${accent} 34%, var(--border-soft))`,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <GalleryVisual type={item.type} />

      <div className="creative-card-content" style={{
        position:  'relative', zIndex: 2,
        padding:   '15px 16px',
        maxWidth:  '60%',
        display:   'flex', flexDirection: 'column', gap: 8,
        minHeight: 168,
      }}>
        {/* Icon + category chip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9, flexShrink: 0,
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            border:     `1px solid color-mix(in srgb, ${accent} 26%, transparent)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={12} strokeWidth={1.5} color={accent} />
          </div>
          <span style={{
            fontFamily:    'JetBrains Mono, monospace', fontSize: '0.41rem',
            letterSpacing: '0.12em',
            color:         `color-mix(in srgb, ${accent} 68%, var(--color-text-faint))`,
            padding:       '1px 7px', borderRadius: 9999,
            background:    `color-mix(in srgb, ${accent} 9%, transparent)`,
            border:        `1px solid color-mix(in srgb, ${accent} 18%, transparent)`,
          }}>
            {item.category}
          </span>
        </div>

        {/* Title + tagline */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize:      'clamp(0.95rem, 1.35vw, 1.12rem)',
            fontWeight:    300, lineHeight: 1.05,
            letterSpacing: '-0.02em', margin: '0 0 3px',
          }}>
            {item.title}
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize:   '0.74rem', fontStyle: 'italic', fontWeight: 300,
            color:      'var(--color-text-soft)', margin: 0, opacity: 0.7,
          }}>
            {item.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.59rem',
          color:      'var(--color-text-muted)', lineHeight: 1.65, margin: 0,
          flex: 1,
        }}>
          {item.desc}
        </p>

        {/* Hover reveal CTA */}
        <div style={{ minHeight: 18 }}>
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <span style={{
                  fontFamily:    'JetBrains Mono, monospace', fontSize: '0.43rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color:         accent,
                }}>
                  {item.cta}
                </span>
                <ArrowUpRight size={8} strokeWidth={1.5} color={accent} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   TOOLS PANEL
════════════════════════════════════════════════════════════ */
function ToolsPanel() {
  return (
    <motion.div
      className="creative-tools glass"
      style={{
        borderRadius: 16, padding: '18px 20px',
        border:       '1px solid color-mix(in srgb, var(--color-crimson) 20%, var(--border-soft))',
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        display:      'flex', flexDirection: 'column', gap: 16,
      }}
      whileHover={{ boxShadow: '0 16px 44px rgba(5,2,7,0.72), inset 0 1px 0 rgba(255,244,247,0.06)' }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <Aperture size={10} strokeWidth={1.5} color="var(--color-crimson)" />
        <span style={{
          fontFamily:    'JetBrains Mono, monospace', fontSize: '0.46rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color:         'var(--color-text-soft)', opacity: 0.72,
        }}>
          Creative Tools
        </span>
      </div>

      {/* Tool badges grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 10px' }}>
        {CREATIVE_TOOLS.map((tool, i) => (
          <motion.div
            key={tool.slug}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: ease.expo }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: tool.bg, border: `1px solid ${tool.bd}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem',
                fontWeight: 700, color: tool.fg,
              }}>
                {tool.slug}
              </span>
            </div>
            <span style={{
              fontFamily:    'JetBrains Mono, monospace', fontSize: '0.38rem',
              letterSpacing: '0.10em', textTransform: 'uppercase',
              color:         'var(--color-text-faint)', textAlign: 'center',
              lineHeight:    1.3,
            }}>
              {tool.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   CINEMATIC PROCESS PANEL
════════════════════════════════════════════════════════════ */
function ProcessPanel() {
  return (
    <motion.div
      className="creative-process glass"
      style={{
        borderRadius: 16, padding: '18px 20px',
        border:       '1px solid color-mix(in srgb, var(--color-violet) 22%, var(--border-soft))',
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        display:      'flex', flexDirection: 'column', gap: 16,
        overflow:     'hidden', position: 'relative',
      }}
      whileHover={{
        boxShadow: '0 16px 44px rgba(5,2,7,0.72), 0 0 22px rgba(157,78,221,0.08), inset 0 1px 0 rgba(255,244,247,0.06)',
      }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <Film size={10} strokeWidth={1.5} color="var(--color-violet)" />
        <span style={{
          fontFamily:    'JetBrains Mono, monospace', fontSize: '0.46rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color:         'var(--color-text-soft)', opacity: 0.72,
        }}>
          Cinematic Process
        </span>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PROCESS_STEPS.map((step, i) => {
          const StepIcon = step.icon
          const color = STEP_COLORS[i]
          const isLast = i === PROCESS_STEPS.length - 1
          return (
            <motion.div
              key={step.num}
              style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: ease.expo }}
            >
              {/* Number + vertical connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: `color-mix(in srgb, ${color} 10%, transparent)`,
                  border:     `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 10px color-mix(in srgb, ${color} 14%, transparent)`,
                }}>
                  <StepIcon size={10} strokeWidth={1.5} color={color} />
                </div>
                {!isLast && (
                  <div style={{
                    width: 1, height: 18, marginTop: 3,
                    background: `linear-gradient(to bottom, color-mix(in srgb, ${color} 24%, transparent), transparent)`,
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: isLast ? 0 : 14, paddingTop: 4 }}>
                <div style={{
                  fontFamily:    'JetBrains Mono, monospace', fontSize: '0.50rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color:         `color-mix(in srgb, ${color} 80%, var(--color-text-soft))`,
                  marginBottom: 2,
                }}>
                  {step.num} · {step.label}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.53rem',
                  color:      'var(--color-text-muted)', lineHeight: 1.5,
                }}>
                  {step.desc}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════ */
export default function Creative() {
  const sectionRef = useRef(null)
  const reduced    = useReducedMotion()
  const [filter, setFilter] = useState('All')

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter)

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.set(['.creative-featured', '.creative-tools', '.creative-process'], { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        defaults: { ease: 'expo.out' },
      })

      tl.from('.creative-label',    { y: 14, opacity: 0, duration: 0.65 }, 0.00)
        .from('.creative-title-1',  { y: 36, opacity: 0, duration: 0.85 }, 0.10)
        .from('.creative-title-2',  { y: 36, opacity: 0, duration: 0.85 }, 0.22)
        .from('.creative-subtitle', { y: 16, opacity: 0, duration: 0.70 }, 0.34)
        .from('.creative-intro',    { y: 14, opacity: 0, duration: 0.65 }, 0.42)
        .from('.creative-filters',  { y: 12, opacity: 0, duration: 0.60 }, 0.52)

        .fromTo('.creative-featured',
          { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.80 }, 0.28)
        .fromTo('.creative-tools',
          { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.65)
        .fromTo('.creative-process',
          { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.75)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="creative"
      ref={sectionRef}
      style={{
        position:      'relative',
        paddingTop:    'clamp(88px, 11vh, 130px)',
        paddingBottom: 'clamp(72px, 9vh, 110px)',
        overflow:      'hidden',
      }}
    >
      <SpotlightGlow
        color="var(--color-violet)"
        size="520px" intensity={7} blur={130}
        style={{ position: 'absolute', top: '28%', right: '6%', transform: 'translate(28%,-50%)', zIndex: 0 }}
      />
      <SpotlightGlow
        color="var(--color-crimson)"
        size="400px" intensity={5} blur={120}
        style={{ position: 'absolute', bottom: '22%', left: '4%', transform: 'translate(-28%, 28%)', zIndex: 0 }}
      />

      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0,
        left:  'clamp(1.25rem, 3.5vw, 3.5rem)',
        right: 'clamp(1.25rem, 3.5vw, 3.5rem)',
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(157,78,221,0.18) 20%, rgba(157,78,221,0.18) 80%, transparent)',
        zIndex: 1,
      }} />

      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        padding:  '0 clamp(1.25rem, 3.5vw, 3.5rem)',
        position: 'relative', zIndex: 1,
      }}>
        <div
          className="creative-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '26% 74%',
            gap:                 'clamp(2rem, 4vw, 4.5rem)',
            alignItems:          'start',
          }}
        >
          {/* ── LEFT: Sidebar ──────────────────────────────── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1.3rem',
            position: 'sticky', top: '100px',
          }}>
            <span className="creative-label section-label" style={{ letterSpacing: '0.3em' }}>
              03 / Creative
            </span>

            <div>
              <h2
                className="creative-title-1 font-editorial text-text"
                style={{
                  fontSize:      'clamp(2.1rem, 3.6vw, 4rem)',
                  fontWeight:    300, lineHeight: 0.93,
                  letterSpacing: '-0.03em',
                  margin: '0 0 0.04em', display: 'block',
                }}
              >
                Photo
              </h2>
              <h2
                className="creative-title-2 font-editorial"
                style={{
                  fontSize:      'clamp(2.1rem, 3.6vw, 4rem)',
                  fontWeight:    300, lineHeight: 0.93,
                  fontStyle:     'italic', letterSpacing: '-0.03em',
                  margin: 0, display: 'block',
                  color:            'color-mix(in srgb, var(--color-violet) 8%, transparent)',
                  WebkitTextStroke: '1.2px color-mix(in srgb, var(--color-rose) 55%, var(--color-violet))',
                  textShadow:       '0 0 28px color-mix(in srgb, var(--color-violet) 24%, transparent), 0 0 70px color-mix(in srgb, var(--color-crimson) 10%, transparent)',
                }}
              >
                &amp; Film.
              </h2>
            </div>

            <p
              className="creative-subtitle"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize:   'clamp(0.88rem, 1.25vw, 1.05rem)',
                fontStyle:  'italic', fontWeight: 300,
                color:      'var(--color-text-soft)', lineHeight: 1.42, margin: 0,
              }}
            >
              Every frame is a story shaped with light, motion, and emotion.
            </p>

            <p
              className="creative-intro"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   'clamp(0.73rem, 0.98vw, 0.82rem)',
                fontWeight: 300, lineHeight: 1.82,
                color:      'color-mix(in srgb, var(--color-text-soft) 65%, var(--color-text-muted))',
                margin:     0,
              }}
            >
              A visual space for photography, videography, editing, and cinematic storytelling — capturing moments and transforming them into memorable visual experiences.
            </p>

            {/* Filters */}
            <div className="creative-filters" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{
                fontFamily:    'JetBrains Mono, monospace', fontSize: '0.43rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color:         'var(--color-text-faint)', marginBottom: 2,
              }}>
                Discipline
              </span>
              {FILTERS.map((f) => (
                <FilterBtn key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
              ))}
            </div>

            {/* Aperture accent */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                border: '1px solid color-mix(in srgb, var(--color-rose) 28%, var(--border-soft))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'color-mix(in srgb, var(--color-crimson) 8%, transparent)',
                boxShadow: '0 0 14px color-mix(in srgb, var(--color-crimson) 12%, transparent)',
              }}>
                <Aperture size={11} strokeWidth={1.5} color="var(--color-rose)" />
              </div>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.53rem',
                color:      'var(--color-text-muted)', fontStyle: 'italic',
              }}>
                Crafted with intention.
              </span>
            </div>
          </div>

          {/* ── RIGHT: Content ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>

            {/* Featured card */}
            <FeaturedCreativeCard />

            {/* Gallery cards */}
            <AnimatePresence mode="wait">
              {filteredItems.length > 0 && (
                <motion.div
                  key={filter}
                  className="creative-cards-grid"
                  style={{
                    display:             'grid',
                    gridTemplateColumns: filteredItems.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                    gap:                 12,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  {filteredItems.map((item, i) => (
                    <GalleryCard key={item.id} item={item} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom: tools + process */}
            <div
              className="creative-bottom-grid"
              style={{ display: 'grid', gridTemplateColumns: '52% 48%', gap: 12 }}
            >
              <ToolsPanel />
              <ProcessPanel />
            </div>

          </div>
        </div>
      </div>

      {/* ── Responsive overrides ─────────────────────────────── */}
      <style>{`
        /* Hard overflow guard on the section itself */
        #creative {
          overflow-x: hidden;
          max-width: 100vw;
        }
        #creative * {
          box-sizing: border-box;
        }
        .creative-grid,
        .creative-cards-grid,
        .creative-bottom-grid {
          min-width: 0;
        }

        @media (max-width: 1100px) {
          .creative-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .creative-grid > *:first-child {
            position: static !important;
          }
          .creative-filters {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }
          .creative-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          /* All grid containers — prevent expansion */
          .creative-grid,
          .creative-cards-grid,
          .creative-bottom-grid {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          .creative-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .creative-bottom-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* Filter — wrap cleanly, no scrollbar */
          .creative-filters {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
            overflow: visible !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .creative-filters > span {
            width: 100% !important;
            margin-bottom: 0 !important;
          }
          .creative-filters button {
            flex: 0 1 auto !important;
            min-width: 0 !important;
            white-space: nowrap !important;
            padding: 7px 12px !important;
            font-size: 0.5rem !important;
          }

          /* Featured card content — full width */
          .creative-featured-content {
            max-width: 100% !important;
            width: 100% !important;
            min-width: 0 !important;
          }

          /* Gallery card content — full width */
          .creative-card-content {
            max-width: 100% !important;
            width: 100% !important;
            min-width: 0 !important;
          }

          /* All cards — hard overflow containment */
          .creative-featured,
          .creative-gallery-card {
            overflow: hidden !important;
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          /* Panels — full width */
          .creative-tools,
          .creative-process {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .creative-filters button {
            padding: 6px 10px !important;
            font-size: 0.48rem !important;
          }
        }
      `}</style>
    </section>
  )
}
