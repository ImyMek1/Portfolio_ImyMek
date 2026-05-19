/* ─────────────────────────────────────────────────────────────
   animations.js — shared motion variants & easings
───────────────────────────────────────────────────────────── */

/* Easings — reused across Framer Motion & GSAP */
export const ease = {
  silk:      [0.77, 0,    0.175, 1],
  expo:      [0.16, 1,    0.3,   1],
  cinematic: [0.25, 0.46, 0.45,  0.94],
  back:      [0.34, 1.56, 0.64,  1],
  void:      [0.87, 0,    0.13,  1],
}

/* ── Framer Motion variants ─────────────────────────────── */

export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: ease.expo } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: ease.expo } },
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: ease.expo } },
}

export const fadeRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: ease.expo } },
}

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: ease.expo } },
}

export const maskReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)',  transition: { duration: 1.2, ease: ease.void } },
}

export const stagger = (gap = 0.08, delay = 0.1) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

/* ── Hover preset for cards ─────────────────────────────── */
export const hoverLift = {
  rest:  { y: 0,  boxShadow: '0 4px 24px rgba(9,2,5,0.5)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 60px rgba(9,2,5,0.9), 0 0 40px rgba(146,34,53,0.14)',
    transition: { duration: 0.4, ease: ease.expo },
  },
}
