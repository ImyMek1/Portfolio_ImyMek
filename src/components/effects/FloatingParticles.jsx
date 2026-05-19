import { motion, useReducedMotion } from 'framer-motion'
import { goldenPositions } from '@lib/utils'
import { ease } from '@lib/animations'

/*
  Deterministic floating particles — no Math.random, positions are stable
  across renders. Kept at 16 particles for performance; each runs on its
  own GPU-composited layer via will-change: transform.

  Z-index 1 — above aurora, below all content.
*/

const COUNT    = 16
const PARTICLES = goldenPositions(COUNT)

/* Cycling palette — CSS variables resolve at paint time */
const COLORS = [
  'var(--color-crimson)',
  'var(--color-rose)',
  'var(--color-violet)',
  'var(--color-ruby)',
]

/* Deterministic per-particle values derived from index */
function getProps(i) {
  const color    = COLORS[i % COLORS.length]
  const size     = 1 + (i % 3)                        // 1 – 3 px
  const opacity  = 0.12 + (i % 6) * 0.055            // 0.12 – 0.39
  const duration = 10  + (i * 1.9) % 14              // 10 – 24 s
  const delay    = (i * 0.55) % 5                     // 0 – 4.95 s
  const driftX   = (i % 2 === 0 ? 1 : -1) * (6 + i % 10)
  const driftY   = -(14 + i % 18)

  return { color, size, opacity, duration, delay, driftX, driftY }
}

export default function FloatingParticles() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        1,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      {PARTICLES.map((p) => {
        const { color, size, opacity, duration, delay, driftX, driftY } = getProps(p.id)
        const glowSpread = size * 4
        const glowSize   = size * 2

        return (
          <motion.div
            key={p.id}
            style={{
              position:     'absolute',
              left:         `${p.x}%`,
              top:          `${p.y}%`,
              width:        size,
              height:       size,
              borderRadius: '50%',
              background:   color,
              boxShadow:    `0 0 ${glowSpread}px ${glowSize}px color-mix(in srgb, ${color} 45%, transparent)`,
              opacity,
              willChange:   reduced ? 'auto' : 'transform',
            }}
            animate={reduced ? undefined : {
              x:       [0, driftX,  driftX * 0.4, 0],
              y:       [0, driftY,  driftY * 0.6, 0],
              opacity: [opacity, opacity * 0.45, opacity * 0.8, opacity],
            }}
            transition={{
              duration,
              delay,
              repeat:     Infinity,
              repeatType: 'mirror',
              ease:       ease.cinematic,
            }}
          />
        )
      })}
    </div>
  )
}
