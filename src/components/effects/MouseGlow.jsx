import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/*
  Mouse-tracked atmospheric glow. Follows the cursor with a spring-damped
  lag for a premium fluid feel.

  Rules:
  - Disabled on coarse-pointer devices (touch screens) — no events needed
  - Disabled when user prefers reduced motion
  - pointer-events: none so it never blocks interaction
  - Off-screen on init (-SIZE) so it doesn't flash at 0,0 before first move

  Z-index 2 — above aurora and particles, below all content.
*/

const SIZE   = 480
const HALF   = SIZE / 2
const OFFSCREEN = -(SIZE * 2)

/* Spring tuning: lower stiffness = more lag = more premium feel */
const SPRING = { stiffness: 55, damping: 22, mass: 0.9 }

export default function MouseGlow() {
  const reduced = useReducedMotion()

  const rawX = useMotionValue(OFFSCREEN)
  const rawY = useMotionValue(OFFSCREEN)

  const springX = useSpring(rawX, SPRING)
  const springY = useSpring(rawY, SPRING)

  /* Offset so the center of the glow sits under the cursor */
  const x = useTransform(springX, (v) => v - HALF)
  const y = useTransform(springY, (v) => v - HALF)

  useEffect(() => {
    /* No-op on touch devices — saves event listeners and GPU layers */
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      reduced
    ) return

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    const onLeave = () => {
      rawX.set(OFFSCREEN)
      rawY.set(OFFSCREEN)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [rawX, rawY, reduced])

  /* Touch device or reduced motion — render nothing */
  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         SIZE,
        height:        SIZE,
        borderRadius:  '50%',
        /* Two-stop gradient: crimson core fading into a rose halo */
        background:    `radial-gradient(circle at center,
          color-mix(in srgb, var(--color-crimson) 9%, transparent) 0%,
          color-mix(in srgb, var(--color-rose)    5%, transparent) 45%,
          transparent 70%)`,
        filter:        'blur(55px)',
        pointerEvents: 'none',
        zIndex:        2,
        x,
        y,
      }}
    />
  )
}
