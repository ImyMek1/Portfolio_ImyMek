import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '@lib/animations'

/*
  Four atmospheric orbs covering the full viewport.
  Each orb is a blurred radial gradient — color via CSS variables,
  opacity kept intentionally low so black remains dominant (75% rule).

  Z-index 0 — stays behind all content.
*/

const ORBS = [
  {
    id:        'ruby',
    color:     'var(--color-ruby)',
    intensity: 11,
    size:      '75vmax',
    top:       '-18%',
    left:      '-18%',
    animate:   { x: [0, 55, -25, 10, 0], y: [0, 30, 55, -15, 0] },
    duration:  26,
  },
  {
    id:        'violet',
    color:     'var(--color-violet)',
    intensity: 8,
    size:      '62vmax',
    top:       '-8%',
    left:      '58%',
    animate:   { x: [0, -40, 15, -20, 0], y: [0, 45, 20, 60, 0] },
    duration:  32,
  },
  {
    id:        'rose',
    color:     'var(--color-rose)',
    intensity: 7,
    size:      '52vmax',
    top:       '55%',
    left:      '22%',
    animate:   { x: [0, 30, -10, 20, 0], y: [0, -28, 15, -20, 0] },
    duration:  21,
  },
  {
    id:        'indigo',
    color:     'var(--color-indigo)',
    intensity: 6,
    size:      '45vmax',
    top:       '45%',
    left:      '72%',
    animate:   { x: [0, -25, 8, -15, 0], y: [0, -35, -10, 20, 0] },
    duration:  38,
  },
]

export default function AuroraBackground() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position:     'absolute',
            top:          orb.top,
            left:         orb.left,
            width:        orb.size,
            height:       orb.size,
            borderRadius: '50%',
            background:   `radial-gradient(circle at center,
              color-mix(in srgb, ${orb.color} ${orb.intensity}%, transparent) 0%,
              transparent 68%)`,
            filter:       'blur(90px)',
            willChange:   reduced ? 'auto' : 'transform',
          }}
          animate={reduced ? undefined : orb.animate}
          transition={{
            duration:   orb.duration,
            repeat:     Infinity,
            repeatType: 'mirror',
            ease:       ease.cinematic,
          }}
        />
      ))}
    </div>
  )
}
