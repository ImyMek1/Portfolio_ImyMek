import { useLenis }          from '@hooks/useLenis'
import Navbar                from '@components/layout/Navbar'
import Footer                from '@components/layout/Footer'
import {
  AuroraBackground,
  FloatingParticles,
  MouseGlow,
  NoiseOverlay,
}                            from '@components/effects'
import Hero                  from '@sections/Hero'
import About                 from '@sections/About'
import Tech                  from '@sections/Tech'
import Creative              from '@sections/Creative'
import Volunteering          from '@sections/Volunteering'
import Contact               from '@sections/Contact'

/*
  Layer stack (z-index):
    0  — AuroraBackground  (fixed, atmospheric orbs)
    1  — FloatingParticles (fixed, subtle particles)
    2  — MouseGlow         (fixed, cursor light)
    3  — NoiseOverlay      (fixed, grain texture)
   10  — main content
   50  — Navbar
  9997 — vignette     (body::after, CSS)
  9998 — grain        (body::before, CSS — animated layer on top of NoiseOverlay)
*/
export default function App() {
  useLenis()

  return (
    <div className="relative bg-void min-h-svh overflow-x-hidden">

      {/* ── Atmospheric effects — all fixed, pointer-events none ── */}
      <AuroraBackground />
      <FloatingParticles />
      <MouseGlow />
      <NoiseOverlay />

      {/* ── Navigation ────────────────────────────────────────── */}
      <Navbar />

      {/* ── Page content ──────────────────────────────────────── */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Tech />
        <Creative />
        <Volunteering />
        <Contact />
      </main>

      <Footer className="relative z-10" />
    </div>
  )
}
