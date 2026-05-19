/* ─────────────────────────────────────────────────────────────
   utils.js — small, framework-agnostic helpers
───────────────────────────────────────────────────────────── */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/* Tailwind-aware className combiner */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/* Math helpers */
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
export const lerp  = (a, b, t)     => a + (b - a) * t
export const map   = (v, a1, a2, b1, b2) => b1 + ((v - a1) * (b2 - b1)) / (a2 - a1)

/* Range generator */
export const range = (n) => Array.from({ length: n }, (_, i) => i)

/* Deterministic golden-angle position generator — replaces Math.random
   in particle / floater placement so renders stay stable across hydration */
export const goldenPositions = (count, seed = 0) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (((i + seed) * 137.508) % 100).toFixed(2),
    y: (((i + seed) * 97.31)   % 100).toFixed(2),
  }))

/* Format helpers */
export const pad2 = (n) => String(n).padStart(2, '0')

/* Detect reduced-motion preference */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Convert hex to rgba with alpha */
export const hexToRgba = (hex, alpha = 1) => {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
