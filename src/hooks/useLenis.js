import { useEffect, useRef, useState, useCallback } from 'react'
import { ScrollTrigger } from '@lib/gsap'
import { createLenis, getLenis, destroyLenis } from '@lib/lenis'

/* ─────────────────────────────────────────────────────────────
   useLenis
   Boots Lenis once for the app lifetime. Drives it with its own
   requestAnimationFrame loop and keeps GSAP ScrollTrigger in sync
   via Lenis' scroll event.  Auto-cancels the RAF and destroys the
   instance when the host component unmounts.
───────────────────────────────────────────────────────────── */
export function useLenis() {
  const rafId = useRef(null)

  useEffect(() => {
    const lenis = createLenis()

    // Keep GSAP ScrollTrigger positions in sync with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    // rAF loop — sole driver of lenis.raf()
    function tick(time) {
      lenis.raf(time)
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId.current)
      lenis.off('scroll', ScrollTrigger.update)
      destroyLenis()
    }
  }, [])

  return getLenis()
}

/* ─────────────────────────────────────────────────────────────
   useScrollTo
   Stable callback for programmatic smooth scrolling.
   Accepts any target Lenis supports: CSS selector, element,
   number (px), or 'top' / 'bottom'.
───────────────────────────────────────────────────────────── */
export function useScrollTo() {
  return useCallback((target, options = {}) => {
    const lenis = getLenis()
    if (!lenis) return

    lenis.scrollTo(target, {
      duration: 1.8,
      easing:   (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lock:     false,
      ...options,
    })
  }, [])
}

/* ─────────────────────────────────────────────────────────────
   useScrollProgress
   Returns a 0→1 number representing how far the user has scrolled
   through the page. Re-renders on every scroll frame.
───────────────────────────────────────────────────────────── */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const onScroll = ({ progress }) => setProgress(progress)
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [])

  return progress
}

/* ─────────────────────────────────────────────────────────────
   useScrollVelocity
   Returns the current scroll velocity — useful for parallax
   skew / distortion effects. Positive = scrolling down.
───────────────────────────────────────────────────────────── */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const onScroll = ({ velocity }) => setVelocity(velocity)
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [])

  return velocity
}

/* ─────────────────────────────────────────────────────────────
   useScrollDirection
   Returns 1 while scrolling down, -1 while scrolling up, 0 when
   still. Only triggers a re-render when direction changes.
───────────────────────────────────────────────────────────── */
export function useScrollDirection() {
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    let prev = 0
    const onScroll = ({ direction: d }) => {
      if (d !== prev) {
        setDirection(d)
        prev = d
      }
    }

    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [])

  return direction
}

/* ─────────────────────────────────────────────────────────────
   useOnScroll
   Fire an arbitrary callback on every scroll tick without causing
   a re-render. Always uses the latest callback ref so the caller
   doesn't need to worry about stale closures.
   Callback receives: { scroll, limit, velocity, direction, progress }
───────────────────────────────────────────────────────────── */
export function useOnScroll(callback) {
  const savedCallback = useRef(callback)
  savedCallback.current = callback

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const onScroll = (data) => savedCallback.current(data)
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [])
}
