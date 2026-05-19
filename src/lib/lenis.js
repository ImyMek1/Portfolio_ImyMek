import Lenis from 'lenis'

let instance = null

const EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function createLenis() {
  if (instance) return instance

  instance = new Lenis({
    duration:        1.4,
    easing:          EASING,
    orientation:     'vertical',
    smoothWheel:     true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.5,
  })

  return instance
}

export function getLenis()     { return instance }

export function destroyLenis() {
  if (!instance) return
  instance.destroy()
  instance = null
}
