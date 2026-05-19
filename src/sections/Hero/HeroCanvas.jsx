import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'

/*
  Lightweight R3F scene: 3 slowly rotating torus rings + wireframe orb.
  Rendered on a transparent canvas positioned behind the portrait.

  Colors use hex equivalents of design tokens:
    #922235 = var(--color-ruby)
    #9d4edd = var(--color-violet)
    #c22a4d = var(--color-crimson)
    #6d28d9 = var(--color-indigo)

  Performance: meshBasicMaterial (no lighting calc), antialias off,
  powerPreference: low-power, hidden on touch devices.
*/

function Ring({ radius, tube, speed, axis, color, opacity }) {
  const ref = useRef()
  useFrame((_, dt) => { ref.current.rotation[axis] += dt * speed })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 16, 90]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Orb() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.08
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.25
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.38, 24, 24]} />
      <meshBasicMaterial color="#922235" transparent opacity={0.15} wireframe />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <Ring radius={2.25} tube={0.014} speed={0.16}  axis="y" color="#922235" opacity={0.38} />
      <Ring radius={2.85} tube={0.009} speed={-0.10} axis="x" color="#9d4edd" opacity={0.24} />
      <Ring radius={1.85} tube={0.010} speed={0.20}  axis="z" color="#c22a4d" opacity={0.28} />
      <Ring radius={3.40} tube={0.007} speed={-0.07} axis="y" color="#6d28d9" opacity={0.16} />
      <Orb />
    </>
  )
}

export default function HeroCanvas() {
  const reduced = useReducedMotion()

  /* Skip rendering entirely on touch devices and reduced motion */
  if (reduced) return null

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 7.5], fov: 36 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
