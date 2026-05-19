import { motion } from 'framer-motion'
import { MapPin, Code2, Camera, Heart } from 'lucide-react'
import { SpotlightGlow } from '@components/effects'
import { ease } from '@lib/animations'
import HeroCanvas from './HeroCanvas'

/* ── Corner brackets ─────────────────────────────────────────── */
const CORNER_STYLES = {
  tl: { top: -1,    left: -1,  borderTop:    '1px solid var(--color-rose)', borderLeft:   '1px solid var(--color-rose)' },
  tr: { top: -1,    right: -1, borderTop:    '1px solid var(--color-rose)', borderRight:  '1px solid var(--color-rose)' },
  bl: { bottom: -1, left: -1,  borderBottom: '1px solid var(--color-rose)', borderLeft:   '1px solid var(--color-rose)' },
  br: { bottom: -1, right: -1, borderBottom: '1px solid var(--color-rose)', borderRight:  '1px solid var(--color-rose)' },
}
function Corner({ pos }) {
  return <div style={{ position: 'absolute', width: 18, height: 18, ...CORNER_STYLES[pos] }} />
}

/* ── Availability pulse dot ──────────────────────────────────── */
function PulseDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7, flexShrink: 0 }}>
      <motion.span
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22d3ee', opacity: 0.6 }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', background: '#22d3ee', display: 'block' }} />
    </span>
  )
}

/* ── 3-worlds mini icon row ──────────────────────────────────── */
function WorldsRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
      <Code2  size={9} strokeWidth={1.5} color="var(--color-crimson)" />
      <Camera size={9} strokeWidth={1.5} color="var(--color-violet)"  />
      <Heart  size={9} strokeWidth={1.5} color="var(--color-rose)"    />
    </div>
  )
}

/* ── Floating glass label card ───────────────────────────────── */
function FloatCard({ children, style }) {
  return (
    <motion.div
      className="hero-float-card glass"
      style={{
        position:      'absolute',
        padding:       '12px 14px',
        borderRadius:  '16px',
        display:       'flex',
        alignItems:    'flex-start',
        gap:           '10px',
        width:         '172px',
        minHeight:     '56px',
        zIndex:        10,
        pointerEvents: 'auto',
        border:        '1px solid color-mix(in srgb, var(--color-rose) 14%, var(--border-soft))',
        boxShadow:     '0 4px 20px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.05)',
        ...style,
      }}
      whileHover={{
        scale:     1.01,
        y:         -2,
        boxShadow: '0 6px 24px rgba(194,42,77,0.22), 0 0 0 1px color-mix(in srgb, var(--color-rose) 28%, transparent), inset 0 1px 0 rgba(255,244,247,0.08)',
      }}
      transition={{ duration: 0.25, ease: ease.expo }}
    >
      {children}
    </motion.div>
  )
}

/* ── Shared card text block ──────────────────────────────────── */
function CardText({ value, label, accentColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{
        fontFamily:    'JetBrains Mono, monospace',
        fontSize:      '0.55rem',
        letterSpacing: '0.04em',
        fontWeight:    500,
        lineHeight:    1.3,
        color:         'var(--color-text)',
      }}>
        {value}
      </span>
      {label && (
        <span style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.44rem',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          lineHeight:    1.2,
          color:         accentColor ?? 'var(--color-text-muted)',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

/* ── Icon badge wrapper ──────────────────────────────────────── */
function IconBadge({ children, color }) {
  return (
    <span style={{ color, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {children}
    </span>
  )
}

/* ── Mobile 2×2 grid card ────────────────────────────────────── */
function MobileCard({ icon: Icon, iconColor, value, label }) {
  return (
    <div style={{
      display:      'flex',
      alignItems:   'center',
      gap:          8,
      padding:      '8px 12px',
      borderRadius: 10,
      border:       '1px solid color-mix(in srgb, var(--color-rose) 14%, var(--border-soft))',
      background:   'color-mix(in srgb, var(--color-surface-1) 55%, transparent)',
      backdropFilter: 'blur(18px)',
    }}>
      <span style={{ color: iconColor, display: 'flex', flexShrink: 0 }}>
        <Icon size={11} strokeWidth={1.5} />
      </span>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', fontWeight: 500, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
          {value}
        </div>
        {label && (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: 1 }}>
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main portrait component ─────────────────────────────────── */
export default function HeroPortrait({ portraitSrc, parallaxX, parallaxY }) {
  const PORTRAIT_W = 'clamp(200px, 18.5vw, 285px)'

  return (
    <div
      className="hero-portrait-shell"
      style={{
        position:       'relative',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '38px 62px',
        width:          '100%',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .portrait-float-layer   { display: none !important; }
          .portrait-mobile-cards  { display: grid !important; }
        }
      `}</style>

      {/* R3F decorative orbit rings */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <HeroCanvas />
      </div>

      {/* Depth glows */}
      <SpotlightGlow
        color="var(--color-crimson)"
        size="380px" intensity={12} blur={90}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1 }}
      />
      <SpotlightGlow
        color="var(--color-violet)"
        size="260px" intensity={8} blur={80}
        style={{ position: 'absolute', top: '58%', left: '56%', transform: 'translate(-50%,-50%)', zIndex: 1 }}
      />

      {/* ── Parallax + float wrapper ─────────────────────────────── */}
      <motion.div style={{ position: 'relative', zIndex: 2, x: parallaxX, y: parallaxY }}>
        <motion.div
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/*
            Portrait + cards outer shell.
            overflow: visible so float cards can extend beyond the portrait frame.
            Cards are NOT inside the image frame (which keeps overflow: hidden).
          */}
          <div style={{ position: 'relative', width: 'fit-content', overflow: 'visible', isolation: 'isolate' }}>

            {/* ── Image frame — clips only the image ─────────────── */}
            <div
              className="hero-portrait"
              style={{
                width:        PORTRAIT_W,
                aspectRatio:  '4 / 5',
                borderRadius: '20px',
                overflow:     'hidden',
                border:       '1px solid var(--border-mid)',
                boxShadow:    'var(--glow-sm), 0 28px 56px rgba(5,2,7,0.72)',
                position:     'relative',
              }}
            >
              <Corner pos="tl" />
              <Corner pos="tr" />
              <Corner pos="bl" />
              <Corner pos="br" />

              {portraitSrc ? (
                <>
                  <img
                    src={portraitSrc}
                    alt="Imane Maftah El Kheir"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                  {/* Edge vignette */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '20px',
                    background: 'radial-gradient(ellipse at 50% 40%, transparent 48%, rgba(5,2,7,0.62) 100%)',
                    pointerEvents: 'none', zIndex: 1,
                  }} />
                </>
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: `linear-gradient(160deg, var(--color-surface-3) 0%, var(--color-surface-4, #1b0b17) 50%, color-mix(in srgb, var(--color-ruby) 25%, var(--color-surface-3)) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="text-text-muted" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Portrait
                  </span>
                </div>
              )}

              {/* Identity label at bottom — inside frame */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '40px 12px 10px',
                background: 'linear-gradient(to top, rgba(5,2,7,0.88) 0%, transparent 100%)',
                zIndex: 2,
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'color-mix(in srgb, var(--color-text-muted) 50%, transparent)',
                }}>
                  Portrait · Creative Identity
                </span>
              </div>
            </div>

            {/* ── Float cards layer ───────────────────────────────────
                position: absolute, inset: 0 — same bounds as portrait.
                overflow: visible — cards escape the portrait frame.
                Cards use transform to push them to the outside edges.
            ────────────────────────────────────────────────────────── */}
            <div
              className="portrait-float-layer"
              style={{
                position:      'absolute',
                inset:         0,
                overflow:      'visible',
                pointerEvents: 'none',
                zIndex:        10,
              }}
            >

              {/* Open to Work — left side, near top */}
              <FloatCard style={{ top: 26, left: -55 }}>
                <IconBadge color="var(--color-rose)">
                  <PulseDot />
                </IconBadge>
                <CardText value="Open to Work" label="Available · 2026" accentColor="var(--color-rose)" />
              </FloatCard>

              {/* Full Stack — right side, near top */}
              <FloatCard style={{ top: 26, right: -55 }}>
                <IconBadge color="var(--color-violet)">
                  <Code2 size={11} strokeWidth={1.5} />
                </IconBadge>
                <CardText value="Full Stack" label="Code · Design · Impact" accentColor="var(--color-violet)" />
              </FloatCard>

              {/* Based in Casablanca — left side, near bottom */}
              <FloatCard style={{ bottom: 30, left: -55 }}>
                <IconBadge color="var(--color-text-muted)">
                  <MapPin size={11} strokeWidth={1.5} />
                </IconBadge>
                <CardText value="Based in Casablanca" label="Morocco" accentColor="rgba(159,139,148,0.75)" />
              </FloatCard>

              {/* 3 Creative Worlds — right side, near bottom */}
              <FloatCard style={{ bottom: 30, right: -55 }}>
                <WorldsRow />
                <CardText value="3 Creative Worlds" label="" />
              </FloatCard>

            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Mobile 2×2 grid — hidden on desktop ─────────────────── */}
      <div
        className="portrait-mobile-cards"
        style={{
          display:             'none',
          gridTemplateColumns: '1fr 1fr',
          gap:                 8,
          marginTop:           16,
          width:               '100%',
          maxWidth:            320,
        }}
      >
        <MobileCard icon={() => <PulseDot />} iconColor="var(--color-rose)" value="Open to Work" label="Available · 2026" />
        <MobileCard icon={Code2}  iconColor="var(--color-violet)"  value="Full Stack"         label="Dev · Design"      />
        <MobileCard icon={MapPin} iconColor="var(--color-text-muted)" value="Casablanca"       label="Morocco"           />
        <MobileCard icon={() => <WorldsRow />} iconColor="" value="3 Creative Worlds" label="" />
      </div>
    </div>
  )
}
