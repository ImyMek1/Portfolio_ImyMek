import { motion, useTransform } from 'framer-motion'

/* Splits a string into individual inline-block <span>s for GSAP stagger targeting.
   No SplitText plugin — manual only. Each letter gets display:inline-block so
   GSAP transforms (y, filter, skewX) work on individual glyphs. */
function LetterSpans({ text, letterClass }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={letterClass}
          style={{ display: 'inline-block' }}
          aria-hidden="true"
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  )
}

/* Decorative glowing dot */
function Gem({ size = 5, opacity = 1 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        background: 'radial-gradient(circle, rgba(224,68,109,0.92) 0%, rgba(194,42,77,0.60) 100%)',
        boxShadow: `0 0 8px 3px rgba(194,42,77,${0.42 * opacity}), 0 0 18px 4px rgba(194,42,77,${0.18 * opacity})`,
        opacity,
      }}
    />
  )
}

export default function HeroNameTitle({ firstName, lastName, springX, springY, reduced }) {
  /* Parallax — 2x gentler than portrait, disabled on reduced-motion */
  const titleX = useTransform(springX, [-0.5, 0.5], reduced ? [0, 0] : [-3, 3])
  const titleY = useTransform(springY, [-0.5, 0.5], reduced ? [0, 0] : [-2, 2])

  return (
    <motion.div
      className="hero-name-group"
      style={{
        display: 'flex', flexDirection: 'column',
        gap: '0.04em', position: 'relative',
        x: titleX, y: titleY,
      }}
    >

      {/* ── Decorative accent above the name ─────────────────── */}
      <div className="hero-name-deco-top" aria-hidden="true">
        <div className="hero-name-deco-line-a" />
        <Gem size={5} />
        <div className="hero-name-deco-line-b" />
      </div>

      {/* ── IMANE — solid, staggered blur-up reveal ──────────── */}
      <div style={{ position: 'relative' }}>
        <h1
          className="gsap-title-1 hero-name-first font-editorial"
          aria-label={firstName}
          style={{
            fontSize: 'clamp(2.8rem, 5.2vw, 5.5rem)',
            fontWeight: 300, lineHeight: 0.95,
            letterSpacing: '-0.035em', margin: 0,
          }}
        >
          <LetterSpans text={firstName} letterClass="hero-letter-first" />
        </h1>
        {/* Shimmer beam — light passing over the text */}
        <div className="hero-shimmer-mask" aria-hidden="true" />
      </div>

      {/* ── MAFTAH EL KHEIR — outlined, staggered stamp reveal ─ */}
      <div style={{ position: 'relative' }}>
        <h1
          className="gsap-title-2 hero-name-last font-editorial"
          aria-label={lastName}
          style={{
            fontSize: 'clamp(2.8rem, 5.2vw, 5.5rem)',
            fontWeight: 300, lineHeight: 0.95,
            letterSpacing: '-0.035em',
            fontStyle: 'italic', margin: 0,
          }}
        >
          <LetterSpans text={lastName} letterClass="hero-letter-last" />
        </h1>
        <div className="hero-shimmer-mask hero-shimmer-mask--b" aria-hidden="true" />
      </div>

      {/* ── Decorative detail row below the name ─────────────── */}
      <div className="hero-name-deco-bottom" aria-hidden="true">
        <div className="hero-name-deco-line-c" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Gem size={3} opacity={0.70} />
          <Gem size={2.5} opacity={0.45} />
          <Gem size={2} opacity={0.25} />
        </div>
      </div>

    </motion.div>
  )
}
