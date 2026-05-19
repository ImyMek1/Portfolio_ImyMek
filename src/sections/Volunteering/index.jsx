import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Users, Globe, Sparkles, Zap, ArrowUpRight, Calendar } from 'lucide-react'
import { gsap } from '@lib/gsap'
import { ease } from '@lib/animations'
import { SpotlightGlow } from '@components/effects'

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
const INITIATIVES = [
  {
    id: 1,
    org: 'Casa Mémoire',
    role: 'Volunteer Guide',
    date: 'Nov 2024 — Present',
    year: '2024',
    desc: 'Training and contribution as a volunteer guide mediator, supporting cultural memory and heritage awareness.',
    category: 'Culture',
    symbol: '◈',
    accent: 'var(--color-crimson)',
    ongoing: true,
  },
  {
    id: 2,
    org: 'Yanafous',
    role: 'Communication Manager',
    date: 'Sep 2024 — Present',
    year: '2024',
    desc: 'Managing communication and content creation for club initiatives and community actions.',
    category: 'Communication',
    symbol: '◉',
    accent: 'var(--color-violet)',
    ongoing: true,
  },
  {
    id: 7,
    org: 'YANAFOUS',
    role: 'Humanitarian Caravan',
    date: 'Jan 2025',
    year: '2025',
    desc: 'Participated in a humanitarian caravan with YANAFOUS to Douar Talmirsalte, contributing to community support, solidarity, and meaningful social impact.',
    category: 'Humanitarian',
    symbol: '◎',
    accent: 'rgba(34,211,238,0.80)',
    ongoing: false,
  },
  {
    id: 3,
    org: 'Yanafous',
    role: 'Retirement Home Visit',
    date: 'Oct 2024',
    year: '2024',
    desc: 'Supporting residents with care, presence, and solidarity.',
    category: 'Care',
    symbol: '♡',
    accent: 'var(--color-rose)',
    ongoing: false,
  },
  {
    id: 4,
    org: 'CECAF',
    role: 'Blood Donation Event',
    date: 'Apr 2023',
    year: '2023',
    desc: 'Participation in organizing a blood donation event with Hôpital Cheikh Khalifa to promote health and community support.',
    category: 'Health',
    symbol: '⊕',
    accent: 'rgba(239,68,68,0.85)',
    ongoing: false,
  },
  {
    id: 5,
    org: 'CECAF',
    role: 'Humanitarian Caravan',
    date: 'Mar 2023',
    year: '2023',
    desc: 'Recognized for exceptional service during a humanitarian caravan supporting Douar Tizi Zgaght.',
    category: 'Humanitarian',
    symbol: '◎',
    accent: 'rgba(34,211,238,0.80)',
    ongoing: false,
  },
  {
    id: 6,
    org: 'CECAF',
    role: 'Content Creation Team Lead',
    date: 'Nov 2022',
    year: '2022',
    desc: 'Led content creation activities during club initiatives and team events.',
    category: 'Content',
    symbol: '▣',
    accent: 'rgba(247,180,50,0.85)',
    ongoing: false,
  },
]

const IMPACT_CATEGORIES = [
  { label: 'Cultural Heritage',   symbol: '◈', accent: 'var(--color-crimson)' },
  { label: 'Social Care',         symbol: '♡', accent: 'var(--color-rose)'    },
  { label: 'Communication',       symbol: '◉', accent: 'var(--color-violet)'  },
  { label: 'Blood Donation',      symbol: '⊕', accent: 'rgba(239,68,68,0.85)' },
  { label: 'Humanitarian Action', symbol: '◎', accent: 'rgba(34,211,238,0.80)'},
  { label: 'Content Creation',    symbol: '▣', accent: 'rgba(247,180,50,0.85)'},
]

const PULSE_STATUS = [
  { label: 'Status', value: 'Ongoing',           color: 'rgba(74,222,128,0.85)' },
  { label: 'Focus',  value: 'Community & Comms', color: 'var(--color-text-soft)' },
  { label: 'Mode',   value: 'Human-first',        color: 'var(--color-rose)'     },
]

const HEARTBEAT = [0.18, 0.20, 0.14, 0.90, 0.30, 0.14, 0.18, 0.40, 0.22, 0.14, 0.18, 0.24, 0.16, 0.20]

/* ════════════════════════════════════════════════════════════
   ABSTRACT VISUAL — community network
════════════════════════════════════════════════════════════ */
function CommunityVisual() {
  const NODES = [
    ['68%', '24%', 10, 'rgba(194,42,77,0.68)'],
    ['84%', '46%', 16, 'rgba(157,78,221,0.70)'],
    ['73%', '70%',  9, 'rgba(224,68,109,0.62)'],
    ['92%', '28%',  7, 'rgba(34,211,238,0.55)'],
    ['79%', '62%',  8, 'rgba(194,42,77,0.50)'],
    ['92%', '57%',  6, 'rgba(157,78,221,0.48)'],
    ['63%', '44%',  7, 'rgba(224,68,109,0.48)'],
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Deep warm background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(145deg, rgba(8,2,12,0.95) 0%, rgba(16,4,12,0.92) 55%, rgba(8,2,12,0.95) 100%)',
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(194,42,77,0.055) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* Warm glow blob */}
      <div style={{
        position: 'absolute', right: '12%', top: '18%',
        width: 170, height: 170, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(194,42,77,0.16) 0%, rgba(157,78,221,0.08) 45%, transparent 72%)',
        filter: 'blur(18px)', pointerEvents: 'none',
      }} />

      {/* Cool glow blob */}
      <div style={{
        position: 'absolute', right: '20%', bottom: '10%',
        width: 120, height: 120, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(157,78,221,0.12) 0%, transparent 68%)',
        filter: 'blur(14px)', pointerEvents: 'none',
      }} />

      {/* Connection lines — SVG (lines don't distort noticeably) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <line x1="68" y1="24" x2="84" y2="46" stroke="rgba(194,42,77,0.15)"  strokeWidth="0.8" />
        <line x1="84" y1="46" x2="73" y2="70" stroke="rgba(157,78,221,0.12)" strokeWidth="0.8" />
        <line x1="84" y1="46" x2="92" y2="28" stroke="rgba(34,211,238,0.10)" strokeWidth="0.8" />
        <line x1="84" y1="46" x2="79" y2="62" stroke="rgba(194,42,77,0.10)"  strokeWidth="0.8" />
        <line x1="73" y1="70" x2="79" y2="62" stroke="rgba(224,68,109,0.09)" strokeWidth="0.8" />
        <line x1="92" y1="28" x2="92" y2="57" stroke="rgba(157,78,221,0.09)" strokeWidth="0.8" />
        <line x1="63" y1="44" x2="68" y2="24" stroke="rgba(224,68,109,0.09)" strokeWidth="0.8" />
        <line x1="63" y1="44" x2="84" y2="46" stroke="rgba(194,42,77,0.09)"  strokeWidth="0.8" />
      </svg>

      {/* Glowing node dots (divs — perfectly circular) */}
      {NODES.map(([left, top, d, color], i) => (
        <div key={i} style={{
          position: 'absolute', left, top,
          width: d, height: d, borderRadius: '50%',
          background: color,
          transform: 'translate(-50%,-50%)',
          boxShadow: `0 0 ${d * 2.4}px ${color.replace(/[\d.]+\)$/, '0.55)')}`,
        }} />
      ))}

      {/* Traveling pulse on hub edge */}
      <motion.div
        style={{
          position: 'absolute', width: 4, height: 4, borderRadius: '50%',
          background: 'rgba(194,42,77,0.80)',
          boxShadow: '0 0 8px rgba(194,42,77,0.65)',
          left: '68%', top: '24%',
          transform: 'translate(-50%,-50%)',
          zIndex: 2,
        }}
        animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.4, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 3, height: 3, borderRadius: '50%',
          background: 'rgba(157,78,221,0.78)',
          boxShadow: '0 0 6px rgba(157,78,221,0.60)',
          left: '84%', top: '46%',
          transform: 'translate(-50%,-50%)',
          zIndex: 2,
        }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.3, 0.6] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 78% 50%, transparent 28%, rgba(5,1,8,0.55) 66%, rgba(5,1,8,0.90) 100%)',
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

/* ════════════════════════════════════════════════════════════
   FEATURED IMPACT CARD
════════════════════════════════════════════════════════════ */
function FeaturedImpactCard() {
  return (
    <motion.div
      className="vol-featured glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 18,
        border:       '1px solid color-mix(in srgb, var(--color-crimson) 26%, var(--border-soft))',
        boxShadow:    '0 6px 32px rgba(5,2,7,0.65), inset 0 1px 0 rgba(255,244,247,0.05)',
        minHeight:    228,
        cursor:       'default',
      }}
      whileHover={{
        boxShadow: '0 24px 58px rgba(5,2,7,0.84), 0 0 44px rgba(194,42,77,0.12), inset 0 1px 0 rgba(255,244,247,0.07)',
        borderColor: 'color-mix(in srgb, var(--color-crimson) 40%, var(--border-soft))',
      }}
      transition={{ duration: 0.35, ease: ease.expo }}
    >
      <CommunityVisual />

      <div style={{
        position:  'relative', zIndex: 2,
        padding:   'clamp(20px, 2.8vw, 32px)',
        maxWidth:  '52%',
        display:   'flex', flexDirection: 'column', gap: 12,
        minHeight: 228, justifyContent: 'center',
      }}>
        {/* Header icon row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 11px', borderRadius: 8,
            background: 'rgba(194,42,77,0.09)',
            border: '1px solid rgba(194,42,77,0.22)',
          }}>
            <Heart  size={9} strokeWidth={1.5} color="var(--color-rose)"    />
            <Users  size={9} strokeWidth={1.5} color="var(--color-crimson)" />
            <Globe  size={9} strokeWidth={1.5} color="var(--color-violet)"  />
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--color-crimson)', opacity: 0.78,
          }}>
            Featured · Impact
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize:      'clamp(1.55rem, 2.6vw, 2.3rem)',
            fontWeight:    300, lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: '0 0 5px',
          }}>
            Community Impact
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '0.88rem', fontStyle: 'italic', fontWeight: 300,
            color: 'var(--color-text-soft)', margin: 0, opacity: 0.80,
          }}>
            Culture · Care · Communication
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize:   'clamp(0.67rem, 0.92vw, 0.76rem)',
          color:      'var(--color-text-muted)', lineHeight: 1.78, margin: 0,
        }}>
          A collection of cultural, social, and humanitarian initiatives built around communication, presence, and meaningful contribution.
        </p>

        {/* Inline stats */}
        <div style={{ display: 'flex', gap: 20, paddingTop: 2 }}>
          {[
            { value: '3+', label: 'Organizations' },
            { value: '7+', label: 'Initiatives'   },
            { value: '2+', label: 'Years Active'  },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
                fontWeight: 600, color: 'var(--color-crimson)', lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontFamily:    'JetBrains Mono, monospace', fontSize: '0.37rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color:         'var(--color-text-faint)', marginTop: 3,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Ongoing badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <motion.div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 9px', borderRadius: 9999,
            background: 'rgba(74,222,128,0.08)',
            border: '1px solid rgba(74,222,128,0.24)',
          }}>
            <motion.span
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'block', flexShrink: 0 }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.35, 1] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.41rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#4ade80',
            }}>
              2 Ongoing
            </span>
          </motion.div>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'default' }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2, ease: ease.expo }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Explore
            </span>
            <ArrowUpRight size={9} strokeWidth={1.5} color="var(--color-text-muted)" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   TIMELINE ITEM
════════════════════════════════════════════════════════════ */
function TimelineItem({ item, index, isLast }) {
  const { accent, ongoing } = item

  return (
    <motion.div
      style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: ease.expo }}
    >
      {/* Left: node + connector column */}
      <div style={{
        display:        'flex', flexDirection: 'column',
        alignItems:     'center', width: 14, flexShrink: 0,
      }}>
        {/* Node */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {ongoing && (
            <motion.div
              style={{
                position: 'absolute', left: -6, top: -6,
                width: 24, height: 24, borderRadius: '50%',
                background: `color-mix(in srgb, ${accent} 18%, transparent)`,
              }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 8px color-mix(in srgb, ${accent} 65%, transparent), 0 0 16px color-mix(in srgb, ${accent} 28%, transparent)`,
            position: 'relative', zIndex: 1,
          }} />
        </div>

        {/* Connector line below node */}
        {!isLast && (
          <div style={{
            flex: 1, width: 1, minHeight: 20, marginTop: 5,
            background: `linear-gradient(to bottom, color-mix(in srgb, ${accent} 28%, transparent), rgba(157,78,221,0.12))`,
          }} />
        )}
      </div>

      {/* Right: card */}
      <motion.div
        className="vol-card glass"
        style={{
          flex:         1,
          marginBottom: isLast ? 0 : 10,
          borderRadius: 14,
          border:       `1px solid color-mix(in srgb, ${accent} 18%, var(--border-soft))`,
          boxShadow:    '0 3px 18px rgba(5,2,7,0.50), inset 0 1px 0 rgba(255,244,247,0.04)',
          padding:      '14px 16px',
          display:      'flex', flexDirection: 'column', gap: 8,
          cursor:       'default',
        }}
        whileHover={{
          y: -3,
          boxShadow: `0 14px 40px rgba(5,2,7,0.72), 0 0 22px color-mix(in srgb, ${accent} 12%, transparent), inset 0 1px 0 rgba(255,244,247,0.06)`,
          borderColor: `color-mix(in srgb, ${accent} 30%, var(--border-soft))`,
        }}
        transition={{ duration: 0.28, ease: ease.expo }}
      >
        {/* Top row: org + category + date */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {/* Org name */}
            <span style={{
              fontFamily:    'JetBrains Mono, monospace', fontSize: '0.50rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color:         `color-mix(in srgb, ${accent} 78%, var(--color-text-soft))`,
              fontWeight:    500,
            }}>
              {item.org}
            </span>
            {/* Category chip */}
            <span style={{
              display:       'inline-flex', alignItems: 'center', gap: 3,
              fontFamily:    'JetBrains Mono, monospace', fontSize: '0.40rem',
              letterSpacing: '0.10em',
              color:         `color-mix(in srgb, ${accent} 70%, var(--color-text-faint))`,
              padding:       '1px 7px', borderRadius: 9999,
              background:    `color-mix(in srgb, ${accent} 9%, transparent)`,
              border:        `1px solid color-mix(in srgb, ${accent} 18%, transparent)`,
            }}>
              <span style={{ fontSize: '0.55rem' }}>{item.symbol}</span>
              {item.category}
            </span>
            {/* Ongoing indicator */}
            {ongoing && (
              <span style={{
                fontFamily:    'JetBrains Mono, monospace', fontSize: '0.38rem',
                letterSpacing: '0.12em',
                color:         'rgba(74,222,128,0.75)',
                padding:       '1px 6px', borderRadius: 9999,
                background:    'rgba(74,222,128,0.07)',
                border:        '1px solid rgba(74,222,128,0.18)',
              }}>
                ongoing
              </span>
            )}
          </div>

          {/* Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={8} strokeWidth={1.5} color="var(--color-text-faint)" />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.40rem',
              letterSpacing: '0.09em', color: 'var(--color-text-faint)',
            }}>
              {item.date}
            </span>
          </div>
        </div>

        {/* Role */}
        <h4 className="font-editorial text-text" style={{
          fontSize:      'clamp(0.88rem, 1.2vw, 1.02rem)',
          fontWeight:    300, lineHeight: 1.1,
          letterSpacing: '-0.02em', margin: 0,
        }}>
          {item.role}
        </h4>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.60rem',
          color:      'var(--color-text-muted)', lineHeight: 1.68, margin: 0,
        }}>
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   IMPACT CATEGORIES PANEL
════════════════════════════════════════════════════════════ */
function ImpactCategories() {
  return (
    <motion.div
      className="vol-categories glass"
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
        <Sparkles size={10} strokeWidth={1.5} color="var(--color-crimson)" />
        <span style={{
          fontFamily:    'JetBrains Mono, monospace', fontSize: '0.46rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color:         'var(--color-text-soft)', opacity: 0.72,
        }}>
          Impact Spectrum
        </span>
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {IMPACT_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.label}
            style={{
              display:    'inline-flex', alignItems: 'center', gap: 6,
              padding:    '5px 12px', borderRadius: 9999,
              background: `color-mix(in srgb, ${cat.accent} 8%, transparent)`,
              border:     `1px solid color-mix(in srgb, ${cat.accent} 20%, transparent)`,
              boxShadow:  `0 2px 10px color-mix(in srgb, ${cat.accent} 6%, transparent)`,
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: ease.expo }}
            whileHover={{
              background: `color-mix(in srgb, ${cat.accent} 14%, transparent)`,
              boxShadow:  `0 4px 16px color-mix(in srgb, ${cat.accent} 12%, transparent)`,
            }}
          >
            <span style={{ fontSize: '0.62rem', color: cat.accent, lineHeight: 1 }}>
              {cat.symbol}
            </span>
            <span style={{
              fontFamily:    'JetBrains Mono, monospace', fontSize: '0.43rem',
              letterSpacing: '0.09em',
              color:         `color-mix(in srgb, ${cat.accent} 75%, var(--color-text-muted))`,
              whiteSpace:    'nowrap',
            }}>
              {cat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingTop: 4, borderTop: '1px solid var(--border-dim)' }}>
        <Heart size={8} strokeWidth={1.5} color="var(--color-rose)" style={{ opacity: 0.6 }} />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.52rem',
          color:      'var(--color-text-muted)', fontStyle: 'italic',
        }}>
          Giving back across culture, health, and community.
        </span>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   COMMUNITY PULSE MODULE
════════════════════════════════════════════════════════════ */
function CommunityPulse() {
  return (
    <motion.div
      className="vol-pulse glass"
      style={{
        borderRadius: 16, padding: '18px 20px',
        border:       '1px solid color-mix(in srgb, var(--color-rose) 20%, var(--border-soft))',
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        display:      'flex', flexDirection: 'column', gap: 14,
        position:     'relative', overflow: 'hidden',
      }}
      whileHover={{
        boxShadow: '0 16px 44px rgba(5,2,7,0.72), 0 0 22px rgba(224,68,109,0.08), inset 0 1px 0 rgba(255,244,247,0.06)',
      }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Heart size={10} strokeWidth={1.5} color="var(--color-rose)" />
          <span style={{
            fontFamily:    'JetBrains Mono, monospace', fontSize: '0.46rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color:         'var(--color-text-soft)', opacity: 0.72,
          }}>
            Community Pulse
          </span>
        </div>
        {/* Animated pulse dot */}
        <motion.div
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(74,222,128,0.82)', boxShadow: '0 0 8px rgba(74,222,128,0.55)', flexShrink: 0 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Status rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PULSE_STATUS.map(({ label, value, color }, i) => (
          <div key={label} style={{
            display:         'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop:      i === 0 ? 0 : 9, paddingBottom: 9,
            borderBottom:    i < PULSE_STATUS.length - 1 ? '1px solid var(--border-dim)' : 'none',
          }}>
            <span style={{
              fontFamily:    'JetBrains Mono, monospace', fontSize: '0.42rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color:         'var(--color-text-faint)',
            }}>
              {label}
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
              letterSpacing: '0.09em', color,
              textAlign: 'right', maxWidth: '55%',
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Counters */}
      <div style={{ display: 'flex', gap: 0 }}>
        {[
          { value: '2', label: 'Ongoing' },
          { value: '5', label: 'Completed' },
          { value: '3', label: 'Orgs' },
        ].map(({ value, label }, i) => (
          <div key={label} style={{
            flex: 1, textAlign: 'center',
            borderRight: i < 2 ? '1px solid var(--border-dim)' : 'none',
            padding: '4px 0',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
              fontWeight: 600, color: 'var(--color-text)', lineHeight: 1,
            }}>
              {value}
            </div>
            <div style={{
              fontFamily:    'JetBrains Mono, monospace', fontSize: '0.37rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color:         'var(--color-text-faint)', marginTop: 3,
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Heartbeat waveform */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2.5, height: 28,
        padding: '4px 0',
      }}>
        {HEARTBEAT.map((h, i) => (
          <div key={i} style={{
            flex:         1, borderRadius: 2, alignSelf: 'center',
            height:       `${Math.round(h * 100)}%`,
            background:   `rgba(224,68,109,${0.22 + h * 0.48})`,
            minHeight:    2,
          }} />
        ))}
      </div>

      {/* Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <Zap size={8} strokeWidth={1.5} color="var(--color-text-faint)" />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.53rem',
          color:      'var(--color-text-muted)', fontStyle: 'italic',
        }}>
          Active in communities since 2022.
        </span>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════ */
export default function Volunteering() {
  const sectionRef = useRef(null)
  const reduced    = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.set(['.vol-featured', '.vol-categories', '.vol-pulse'], { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        defaults: { ease: 'expo.out' },
      })

      tl.from('.vol-label',    { y: 14, opacity: 0, duration: 0.65 }, 0.00)
        .from('.vol-title-1',  { y: 36, opacity: 0, duration: 0.85 }, 0.10)
        .from('.vol-title-2',  { y: 36, opacity: 0, duration: 0.85 }, 0.22)
        .from('.vol-subtitle', { y: 16, opacity: 0, duration: 0.70 }, 0.34)
        .from('.vol-intro',    { y: 14, opacity: 0, duration: 0.65 }, 0.42)
        .from('.vol-stats',    { y: 12, opacity: 0, duration: 0.60 }, 0.52)

        .fromTo('.vol-featured',
          { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.80 }, 0.28)
        .fromTo('.vol-categories',
          { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.62)
        .fromTo('.vol-pulse',
          { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.72)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="volunteering"
      ref={sectionRef}
      style={{
        position:      'relative',
        paddingTop:    'clamp(88px, 11vh, 130px)',
        paddingBottom: 'clamp(72px, 9vh, 110px)',
        overflow:      'hidden',
      }}
    >
      <SpotlightGlow
        color="var(--color-crimson)"
        size="520px" intensity={6} blur={130}
        style={{ position: 'absolute', top: '32%', right: '8%', transform: 'translate(28%,-50%)', zIndex: 0 }}
      />
      <SpotlightGlow
        color="var(--color-rose)"
        size="380px" intensity={5} blur={120}
        style={{ position: 'absolute', bottom: '24%', left: '4%', transform: 'translate(-28%, 28%)', zIndex: 0 }}
      />

      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0,
        left:  'clamp(1.25rem, 3.5vw, 3.5rem)',
        right: 'clamp(1.25rem, 3.5vw, 3.5rem)',
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(224,68,109,0.18) 20%, rgba(224,68,109,0.18) 80%, transparent)',
        zIndex: 1,
      }} />

      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        padding:  '0 clamp(1.25rem, 3.5vw, 3.5rem)',
        position: 'relative', zIndex: 1,
      }}>
        <div
          className="vol-grid"
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
            <span className="vol-label section-label" style={{ letterSpacing: '0.3em' }}>
              04 / Volunteer
            </span>

            <div>
              <h2
                className="vol-title-1 font-editorial text-text"
                style={{
                  fontSize:      'clamp(2.1rem, 3.6vw, 4rem)',
                  fontWeight:    300, lineHeight: 0.93,
                  letterSpacing: '-0.03em',
                  margin: '0 0 0.04em', display: 'block',
                }}
              >
                Volunteer
              </h2>
              <h2
                className="vol-title-2 font-editorial"
                style={{
                  fontSize:      'clamp(2.1rem, 3.6vw, 4rem)',
                  fontWeight:    300, lineHeight: 0.93,
                  fontStyle:     'italic', letterSpacing: '-0.03em',
                  margin: 0, display: 'block',
                  color:            'color-mix(in srgb, var(--color-rose) 8%, transparent)',
                  WebkitTextStroke: '1.2px color-mix(in srgb, var(--color-crimson) 55%, var(--color-rose))',
                  textShadow:       '0 0 28px color-mix(in srgb, var(--color-crimson) 24%, transparent), 0 0 70px color-mix(in srgb, var(--color-rose) 10%, transparent)',
                }}
              >
                &amp; Impact.
              </h2>
            </div>

            <p
              className="vol-subtitle"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize:   'clamp(0.88rem, 1.25vw, 1.05rem)',
                fontStyle:  'italic', fontWeight: 300,
                color:      'var(--color-text-soft)', lineHeight: 1.42, margin: 0,
              }}
            >
              Creating impact through community, communication, and meaningful action.
            </p>

            <p
              className="vol-intro"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   'clamp(0.73rem, 0.98vw, 0.82rem)',
                fontWeight: 300, lineHeight: 1.82,
                color:      'color-mix(in srgb, var(--color-text-soft) 65%, var(--color-text-muted))',
                margin:     0,
              }}
            >
              Beyond technology and visual storytelling, I believe in contributing to communities through volunteering, communication, cultural initiatives, and social impact projects.
            </p>

            {/* Impact stats */}
            <div className="vol-stats" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 22 }}>
                {[
                  { value: '3+', label: 'Organizations', icon: Users   },
                  { value: '7+', label: 'Initiatives',   icon: Zap     },
                ].map(({ value, label, icon: Icon }) => (
                  <div key={label}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize:   'clamp(1.4rem, 2.2vw, 1.85rem)',
                        fontWeight: 400, color: 'var(--color-crimson)', lineHeight: 1,
                      }}>
                        {value}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                      <Icon size={8} strokeWidth={1.5} color="var(--color-text-faint)" />
                      <span style={{
                        fontFamily:    'JetBrains Mono, monospace', fontSize: '0.40rem',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color:         'var(--color-text-faint)',
                      }}>
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Descriptor chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {['Culture', 'Care', 'Community', 'Humanitarian'].map((tag, i) => {
                  const colors = ['var(--color-crimson)', 'var(--color-rose)', 'var(--color-violet)', 'rgba(224,68,109,0.82)']
                  return (
                    <span key={tag} style={{
                      fontFamily:    'JetBrains Mono, monospace', fontSize: '0.42rem',
                      letterSpacing: '0.10em',
                      padding:       '3px 9px', borderRadius: 9999,
                      background:    `color-mix(in srgb, ${colors[i]} 9%, transparent)`,
                      border:        `1px solid color-mix(in srgb, ${colors[i]} 20%, transparent)`,
                      color:         `color-mix(in srgb, ${colors[i]} 78%, var(--color-text-muted))`,
                    }}>
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>

            {/* Featured impact card */}
            <FeaturedImpactCard />

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {INITIATIVES.map((item, i) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={i}
                  isLast={i === INITIATIVES.length - 1}
                />
              ))}
            </div>

            {/* Bottom: categories + pulse */}
            <div
              className="vol-bottom-grid"
              style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 12 }}
            >
              <ImpactCategories />
              <CommunityPulse />
            </div>

          </div>
        </div>
      </div>

      {/* ── Responsive overrides ─────────────────────────────── */}
      <style>{`
        @media (max-width: 1100px) {
          .vol-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .vol-grid > *:first-child {
            position: static !important;
          }
          .vol-stats {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 768px) {
          .vol-bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
