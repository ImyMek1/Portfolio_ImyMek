import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, Briefcase, FolderOpen, Globe, Code2, Camera, Heart, ChevronRight } from 'lucide-react'
import { gsap } from '@lib/gsap'
import { ease } from '@lib/animations'
import { SpotlightGlow } from '@components/effects'
import { profile } from '@data/profile'
import { useScrollTo } from '@hooks/useLenis'
import HeroPortrait from './HeroPortrait'
import HeroWidgets  from './HeroWidgets'

/* ── Portrait asset ─────────────────────────────────────────── */
const portraitModules = import.meta.glob(
  '/src/assets/images/imane-portrait.{jpg,jpeg,png,webp}',
  { eager: true },
)
const PORTRAIT_SRC = Object.values(portraitModules)[0]?.default ?? null

/* ── Small left-column components ───────────────────────────── */
function RoleBadge({ label }) {
  return (
    <span className="tag-glass" style={{ borderRadius: 9999, padding: '3px 11px', fontSize: '0.52rem', letterSpacing: '0.12em' }}>
      {label}
    </span>
  )
}

function Stat({ value, label, Icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        border: '1px solid color-mix(in srgb, var(--color-crimson) 28%, var(--border-soft))',
        background: 'color-mix(in srgb, var(--color-crimson) 7%, transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={11} strokeWidth={1.5} color="var(--color-rose)" />
      </div>
      <div>
        <div className="font-editorial text-text" style={{ fontSize: '1.2rem', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}>
          {value}
        </div>
        <div className="text-text-muted" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

/* ── Abstract card visuals (no external images needed) ──────── */

/* IT Projects — code editor interface */
function ITVisual() {
  const CODE_LINES = [
    { w: '58%', c: 'rgba(157,78,221,0.55)',  indent: 0  },
    { w: '42%', c: 'rgba(97,218,251,0.40)',  indent: 14 },
    { w: '52%', c: 'rgba(224,68,109,0.38)',  indent: 28 },
    { w: '33%', c: 'rgba(97,218,251,0.28)',  indent: 28 },
    { w: '47%', c: 'rgba(157,78,221,0.32)',  indent: 14 },
    { w: '38%', c: 'rgba(255,255,255,0.14)', indent: 0  },
    { w: '55%', c: 'rgba(97,218,251,0.22)',  indent: 14 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(97,218,251,0.10) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />
      {/* Code editor panel */}
      <div style={{
        position: 'absolute', right: '8%', top: '10%',
        width: '66%', height: '76%',
        background: 'rgba(4,1,7,0.82)',
        borderRadius: 9,
        border: '1px solid rgba(97,218,251,0.16)',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(97,218,251,0.06)',
      }}>
        {/* Header bar */}
        <div style={{
          height: 20,
          background: 'rgba(97,218,251,0.05)',
          borderBottom: '1px solid rgba(97,218,251,0.09)',
          display: 'flex', alignItems: 'center', gap: 5, padding: '0 9px',
        }}>
          {['rgba(255,90,90,0.55)', 'rgba(255,195,50,0.55)', 'rgba(50,205,50,0.55)'].map((bg, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: bg }} />
          ))}
        </div>
        {/* Code lines */}
        {CODE_LINES.map((line, i) => (
          <div key={i} style={{
            position: 'absolute', left: line.indent + 10, top: 28 + i * 13,
            width: line.w, height: 3, background: line.c, borderRadius: 1.5,
          }} />
        ))}
        {/* Cursor */}
        <div style={{
          position: 'absolute', left: 10 + 28, top: 28 + 7 * 13,
          width: 7, height: 10, background: 'rgba(97,218,251,0.65)', borderRadius: 1,
        }} />
      </div>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', left: '18%', top: '45%',
        width: 55, height: 55,
        background: 'radial-gradient(circle, rgba(97,218,251,0.14) 0%, transparent 70%)',
        filter: 'blur(10px)',
      }} />
      {/* Fade edge */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(9,2,5,0.96) 0%, rgba(9,2,5,0.38) 36%, rgba(9,2,5,0) 62%)',
      }} />
    </div>
  )
}

/* Photo & Film — camera aperture + cinematic light */
function FilmVisual() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Bokeh orbs */}
      {[
        { w: 65, h: 65, x: 28, y: 18, c: 'rgba(157,78,221,0.35)', blur: 8 },
        { w: 90, h: 90, x: 58, y: 48, c: 'rgba(194,42,77,0.25)',  blur: 10 },
        { w: 50, h: 50, x: 78, y: 14, c: 'rgba(157,78,221,0.22)', blur: 7  },
        { w: 70, h: 70, x: 46, y: 72, c: 'rgba(224,68,109,0.20)', blur: 9  },
      ].map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${o.x}%`, top: `${o.y}%`,
          width: o.w, height: o.h, borderRadius: '50%',
          background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)', filter: `blur(${o.blur}px)`,
        }} />
      ))}
      {/* Camera aperture rings */}
      {[88, 60, 34].map((size, i) => (
        <div key={i} style={{
          position: 'absolute', right: '10%', top: '50%',
          transform: 'translateY(-50%)',
          width: size, height: size, borderRadius: '50%',
          border: `1px solid rgba(157,78,221,${0.30 - i * 0.08})`,
          boxShadow: i === 0 ? '0 0 28px rgba(157,78,221,0.12)' : 'none',
        }} />
      ))}
      {/* Center lens dot */}
      <div style={{
        position: 'absolute', right: 'calc(10% + 30px)', top: '50%',
        transform: 'translate(50%, -50%)',
        width: 12, height: 12, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(157,78,221,0.5) 0%, transparent 80%)',
      }} />
      {/* Vertical light leak */}
      <div style={{
        position: 'absolute', left: '30%', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(224,68,109,0.25), rgba(157,78,221,0.15), transparent)',
      }} />
      {/* Fade edge */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(9,2,5,0.96) 0%, rgba(9,2,5,0.38) 36%, rgba(9,2,5,0) 62%)',
      }} />
    </div>
  )
}

/* Volunteering — community concentric rings + horizon */
function VolunteerVisual() {
  const PEOPLE = [
    { x: 35, h: 30, w: 9,  c: 'rgba(224,68,109,0.50)' },
    { x: 48, h: 38, w: 11, c: 'rgba(157,78,221,0.45)' },
    { x: 60, h: 32, w: 10, c: 'rgba(224,68,109,0.42)' },
    { x: 72, h: 36, w: 11, c: 'rgba(157,78,221,0.40)' },
    { x: 84, h: 28, w: 9,  c: 'rgba(224,68,109,0.38)' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Warm sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(194,42,77,0.08) 55%, rgba(224,68,109,0.20) 100%)',
      }} />
      {/* Concentric community rings (behind right) */}
      {[120, 86, 54].map((size, i) => (
        <div key={i} style={{
          position: 'absolute', right: `${-size / 4}px`, top: '50%',
          transform: 'translateY(-50%)',
          width: size, height: size, borderRadius: '50%',
          border: `1px solid rgba(224,68,109,${0.22 - i * 0.06})`,
          boxShadow: i === 0 ? '0 0 20px rgba(224,68,109,0.08)' : 'none',
        }} />
      ))}
      {/* Horizon glow */}
      <div style={{
        position: 'absolute', left: '30%', right: 0,
        bottom: '28%', height: 1,
        background: 'linear-gradient(to right, transparent, rgba(224,68,109,0.45), rgba(157,78,221,0.28), transparent)',
      }} />
      {/* Ground gradient */}
      <div style={{
        position: 'absolute', left: '25%', right: 0, bottom: 0, height: '28%',
        background: 'linear-gradient(to top, rgba(194,42,77,0.12) 0%, transparent 100%)',
      }} />
      {/* People silhouettes */}
      {PEOPLE.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`, bottom: '28%',
          width: p.w, height: p.h, borderRadius: '3px 3px 1px 1px',
          background: p.c, transform: 'translateX(-50%)',
        }} />
      ))}
      {/* Fade edge */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(9,2,5,0.96) 0%, rgba(9,2,5,0.38) 36%, rgba(9,2,5,0) 62%)',
      }} />
    </div>
  )
}

/* ── Feature card (bottom 3) ─────────────────────────────────── */
function FeatureCard({ num, title, desc, cta, href, Icon, accentColor, Visual }) {
  const scrollTo = useScrollTo()
  return (
    <motion.div
      className="hero-bottom-card glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 18,
        border:       '1px solid color-mix(in srgb, var(--color-crimson) 20%, var(--border-soft))',
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        padding:      'clamp(14px, 2vw, 22px)',
        minHeight:    148,
        cursor:       'pointer',
      }}
      onClick={() => scrollTo(href)}
      whileHover={{
        y: -5,
        boxShadow: `0 20px 52px rgba(194,42,77,0.22), 0 4px 24px rgba(5,2,7,0.5), inset 0 1px 0 rgba(255,244,247,0.07)`,
        borderColor: 'color-mix(in srgb, var(--color-crimson) 35%, var(--border-soft))',
      }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.32, ease: ease.expo }}
    >
      {/* Abstract visual — right portion */}
      <Visual />

      {/* Text content — left 56% so it sits clear of the visual */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '56%' }}>
        {/* Number + icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 28%, transparent)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={13} strokeWidth={1.5} color={accentColor} />
          </div>
          <span className="text-text-muted" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.15em' }}>
            {num}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-text" style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          fontWeight: 300, lineHeight: 1.1,
          letterSpacing: '-0.02em', margin: '0 0 8px',
        }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted" style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.63rem', lineHeight: 1.6,
          margin: '0 0 16px',
        }}>
          {desc}
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: accentColor }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {cta}
          </span>
          <ChevronRight size={10} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  )
}

const FEATURES = [
  {
    num: '01', title: 'IT Projects',
    desc: 'Full-stack web applications, systems, and digital solutions.',
    cta: 'Explore Projects',
    href: '#tech', Icon: Code2,
    accentColor: 'var(--color-crimson)',
    Visual: ITVisual,
  },
  {
    num: '02', title: 'Photo & Film',
    desc: 'Photography, videography & visual storytelling.',
    cta: 'Explore Gallery',
    href: '#creative', Icon: Camera,
    accentColor: 'var(--color-violet)',
    Visual: FilmVisual,
  },
  {
    num: '03', title: 'Volunteering',
    desc: 'Community building & social impact.',
    cta: 'See Impact',
    href: '#volunteering', Icon: Heart,
    accentColor: 'var(--color-rose)',
    Visual: VolunteerVisual,
  },
]

/* ── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const heroRef  = useRef(null)
  const reduced  = useReducedMotion()
  const scrollTo = useScrollTo()

  /* Mouse parallax */
  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 38, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 38, damping: 22 })
  const portraitX = useTransform(springX, [-0.5, 0.5], [-6,  6])
  const portraitY = useTransform(springY, [-0.5, 0.5], [-4,  4])

  useEffect(() => {
    if (reduced) return
    const onMove = (e) => {
      rawX.set(e.clientX / window.innerWidth  - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, reduced])

  /* ── GSAP intro timeline ──────────────────────────────────────
     Left content: gsap.from() — natural (opacity:1) is the target.
     If GSAP never fires, everything stays visible.
     Right content: gsap.fromTo() — explicit hidden → visible.
  ─────────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.set(['.hero-portrait', '.hero-float-card', '.gsap-widget', '.hero-bottom-card'], { autoAlpha: 0 })

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } })

      tl.from('.gsap-label',    { y: 12, opacity: 0, duration: 0.65 }, 0.00)
        .from('.gsap-title-1',  { y: 40, opacity: 0, duration: 0.85 }, 0.12)
        .from('.gsap-title-2',  { y: 40, opacity: 0, duration: 0.85 }, 0.24)
        .from('.gsap-subtitle', { y: 16, opacity: 0, duration: 0.70 }, 0.38)
        .from('.gsap-roles',    { y: 12, opacity: 0, duration: 0.60 }, 0.48)
        .from('.gsap-desc',     { y: 12, opacity: 0, duration: 0.60 }, 0.55)
        .from('.gsap-stats',    { y: 10, opacity: 0, duration: 0.55 }, 0.63)
        .from('.gsap-cta',      { y: 12, opacity: 0, duration: 0.55 }, 0.70)
        .fromTo('.hero-portrait',
          { autoAlpha: 0, scale: 1.04, filter: 'blur(8px)' },
          { autoAlpha: 1, scale: 1,    filter: 'blur(0px)', duration: 0.95 }, 0.22)
        .fromTo('.hero-float-card',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.50, stagger: 0.08 }, 0.75)
        .fromTo('.gsap-widget',
          { autoAlpha: 0, x: 18 },
          { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.09 }, 0.40)
        .fromTo('.hero-bottom-card',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.60, stagger: 0.10 }, 1.00)
    }, heroRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position:      'relative',
        minHeight:     '100svh',
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        paddingTop:    'clamp(76px, 9vh, 96px)',
        paddingBottom: 'clamp(28px, 4vh, 48px)',
      }}
    >
      {/* Left atmospheric glow */}
      <SpotlightGlow
        color="var(--color-crimson)"
        size="700px"
        intensity={9}
        blur={120}
        style={{ position: 'absolute', top: '28%', left: '8%', transform: 'translate(-50%,-50%)', zIndex: 0 }}
      />
      {/* Right accent glow */}
      <SpotlightGlow
        color="var(--color-violet)"
        size="500px"
        intensity={7}
        blur={110}
        style={{ position: 'absolute', top: '45%', right: '5%', transform: 'translate(0,-50%)', zIndex: 0 }}
      />

      {/* ── Max-width wrapper ──────────────────────────────────── */}
      <div style={{
        flex:          1,
        display:       'flex',
        flexDirection: 'column',
        width:         '100%',
        maxWidth:      '1320px',
        margin:        '0 auto',
        padding:       '0 clamp(1.25rem, 3.5vw, 3.5rem)',
        position:      'relative',
        zIndex:        1,
      }}>

        {/* ── Dashboard 3-column grid ───────────────────────────── */}
        <div
          className="hero-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '37% 30% 33%',
            gap:                 'clamp(1.25rem, 2.5vw, 2.25rem)',
            alignItems:          'center',
          }}
        >

          {/* ── LEFT: Intro panel ───────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            <span className="gsap-label section-label" style={{ letterSpacing: '0.3em' }}>
              Digital Portfolio {profile.year}
            </span>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.04em' }}>
              <h1
                className="gsap-title-1 font-editorial text-text"
                style={{
                  fontSize:      'clamp(2.8rem, 5.2vw, 5.5rem)',
                  fontWeight:    300,
                  lineHeight:    0.95,
                  letterSpacing: '-0.035em',
                  margin:        0,
                }}
              >
                {profile.firstName}
              </h1>
              <h1
                className="gsap-title-2 font-editorial"
                style={{
                  fontSize:         'clamp(2.8rem, 5.2vw, 5.5rem)',
                  fontWeight:       300,
                  lineHeight:       0.95,
                  letterSpacing:    '-0.035em',
                  fontStyle:        'italic',
                  color:            'color-mix(in srgb, var(--color-crimson) 10%, transparent)',
                  WebkitTextStroke: '1.2px color-mix(in srgb, var(--color-rose) 58%, var(--color-crimson))',
                  textShadow:       '0 0 44px color-mix(in srgb, var(--color-crimson) 28%, transparent)',
                  margin:           0,
                }}
              >
                {profile.lastName}
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="gsap-subtitle text-text-soft"
              style={{
                fontFamily:    'Cormorant Garamond, Georgia, serif',
                fontSize:      'clamp(0.95rem, 1.6vw, 1.25rem)',
                fontWeight:    300,
                fontStyle:     'italic',
                lineHeight:    1.3,
                margin:        0,
              }}
            >
              Creative Developer &amp; Visual Storyteller
            </p>

            {/* Description */}
            <p
              className="gsap-desc text-text-muted"
              style={{
                fontFamily:    'Inter, system-ui, sans-serif',
                fontSize:      'clamp(0.75rem, 1.1vw, 0.85rem)',
                fontWeight:    300,
                lineHeight:    1.75,
                letterSpacing: '0.01em',
                maxWidth:      '400px',
                margin:        0,
              }}
            >
              I build digital experiences that combine code, visual storytelling, and meaningful impact.
            </p>

            {/* Role pills */}
            <div className="gsap-roles" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {profile.roles.map((r) => <RoleBadge key={r} label={r} />)}
            </div>

            {/* CTA buttons */}
            <div className="gsap-cta hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <motion.button
                className="btn-neon"
                style={{ borderRadius: 9999, cursor: 'pointer' }}
                onClick={() => scrollTo('#tech')}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                variants={{ rest: { y: 0 }, hover: { y: -2 } }}
                transition={{ duration: 0.22, ease: ease.expo }}
              >
                Explore My Work
                <motion.span
                  style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ duration: 0.20, ease: ease.expo }}
                >
                  <ArrowRight size={18} strokeWidth={2} />
                </motion.span>
              </motion.button>
              <motion.button
                className="btn-ghost"
                style={{ borderRadius: 9999, cursor: 'pointer' }}
                onClick={() => scrollTo('#contact')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.22, ease: ease.expo }}
              >
                <Mail size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                Contact Me
              </motion.button>
            </div>

            {/* Stats */}
            <div
              className="gsap-stats"
              style={{
                display:       'flex',
                gap:           '1.75rem',
                paddingTop:    '0.65rem',
                borderTop:     '1px solid var(--border-dim)',
                flexWrap:      'wrap',
              }}
            >
              <Stat value="4+"  label="Years Experience"    Icon={Briefcase}  />
              <Stat value="20+" label="Projects Completed"  Icon={FolderOpen} />
              <Stat value="3"   label="Creative Worlds"     Icon={Globe}      />
            </div>

          </div>

          {/* ── CENTER: Portrait identity card ──────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <HeroPortrait
              portraitSrc={PORTRAIT_SRC}
              parallaxX={portraitX}
              parallaxY={portraitY}
            />
          </div>

          {/* ── RIGHT: Dashboard widgets ─────────────────────────── */}
          <div style={{ alignSelf: 'center' }}>
            <HeroWidgets />
          </div>

        </div>

        {/* ── Bottom: 3 feature cards ───────────────────────────── */}
        <div
          className="hero-bottom-cards"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap:                 'clamp(0.75rem, 1.5vw, 1.25rem)',
            marginTop:           'clamp(1rem, 2vh, 1.5rem)',
          }}
        >
          {FEATURES.map((card) => (
            <FeatureCard key={card.num} {...card} />
          ))}
        </div>

      </div>

      {/* ── Responsive overrides ──────────────────────────────────── */}
      <style>{`
        @media (max-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.25rem !important;
          }
          .hero-grid > *:nth-child(3) {
            grid-column: 1 / -1;
          }
          .hero-bottom-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .hero-portrait-shell {
            padding: 20px 32px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .hero-grid > *:nth-child(3) {
            grid-column: auto;
          }
          .hero-float-card { display: none !important; }
          .hero-cta-group {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-cta-group button {
            width: 100% !important;
            max-width: 320px !important;
            min-width: 0 !important;
          }
          .hero-bottom-cards {
            grid-template-columns: 1fr !important;
          }
          .hero-portrait-shell {
            padding: 16px 16px !important;
          }
        }
        @media (max-width: 480px) {
          .gsap-title-1, .gsap-title-2 {
            font-size: clamp(2.2rem, 8vw, 3.5rem) !important;
            word-break: break-word;
          }
        }
      `}</style>
    </section>
  )
}
