import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Camera, Heart, GraduationCap, Cpu, Aperture, ChevronRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@lib/gsap'
import { ease } from '@lib/animations'
import { SpotlightGlow } from '@components/effects'

/* ── Identity flow node ──────────────────────────────────── */
function FlowNode({ Icon, label, color, bgColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
      {/* Ambient glow disc */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -14, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: 'blur(10px)', pointerEvents: 'none',
        }} />
        <motion.div
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: bgColor,
            border: `1px solid ${color}48`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', flexShrink: 0,
          }}
          animate={{
            boxShadow: [
              `0 0 10px ${color}18, 0 4px 14px rgba(5,2,7,0.5)`,
              `0 0 22px ${color}32, 0 4px 14px rgba(5,2,7,0.5)`,
              `0 0 10px ${color}18, 0 4px 14px rgba(5,2,7,0.5)`,
            ],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={21} strokeWidth={1.5} color={color} />
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: `1px solid ${color}1e`, pointerEvents: 'none',
          }} />
        </motion.div>
      </div>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.53rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color, whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  )
}

/* ── Animated connector ──────────────────────────────────── */
function Connector() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      paddingBottom: 24, flexShrink: 0,
    }}>
      {/* Gradient line with traveling shine */}
      <div style={{
        width: 38, height: 1, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(to right, rgba(194,42,77,0.20), rgba(224,68,109,0.55))',
      }}>
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0,
            width: 14, height: '100%',
            background: 'linear-gradient(to right, transparent, rgba(255,244,247,0.7), transparent)',
          }}
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
        />
      </div>
      <ChevronRight
        size={10} strokeWidth={2.5}
        color="rgba(224,68,109,0.62)"
        style={{ flexShrink: 0 }}
      />
    </div>
  )
}

/* ── DNA discipline card ─────────────────────────────────── */
function DnaCard({ num, Icon, title, desc, color, tags, gsapClass }) {
  return (
    <motion.div
      className={`glass ${gsapClass}`}
      style={{
        borderRadius: 14, padding: '15px 14px',
        border: `1px solid color-mix(in srgb, ${color} 26%, var(--border-soft))`,
        boxShadow: '0 4px 22px rgba(5,2,7,0.52), inset 0 1px 0 rgba(255,244,247,0.04)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
      whileHover={{
        y: -5,
        boxShadow: `0 20px 48px rgba(5,2,7,0.78), 0 0 32px ${color}1c, inset 0 1px 0 rgba(255,244,247,0.07)`,
        borderColor: `color-mix(in srgb, ${color} 42%, var(--border-soft))`,
      }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: `color-mix(in srgb, ${color} 13%, transparent)`,
          border: `1px solid color-mix(in srgb, ${color} 28%, transparent)`,
          boxShadow: `inset 0 1px 0 ${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={14} strokeWidth={1.5} color={color} />
        </div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem',
          letterSpacing: '0.12em', color: 'var(--color-text-muted)',
          opacity: 0.6,
        }}>
          {num}
        </span>
      </div>

      <div>
        <h3 className="font-editorial text-text" style={{
          fontSize: 'clamp(0.92rem, 1.32vw, 1.06rem)',
          fontWeight: 300, lineHeight: 1.1,
          letterSpacing: '-0.02em', margin: '0 0 5px',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.61rem',
          color: 'var(--color-text-soft)', lineHeight: 1.65,
          margin: 0, opacity: 0.75,
        }}>
          {desc}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'auto' }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.44rem', letterSpacing: '0.1em',
            padding: '2px 8px', borderRadius: 9999,
            background: `color-mix(in srgb, ${color} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
            color: `color-mix(in srgb, ${color} 78%, var(--color-text-soft))`,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Education timeline item ─────────────────────────────── */
function EduItem({ label, sub, year, isLast = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 11,
      paddingBottom: isLast ? 0 : 11,
      borderBottom: isLast ? 'none' : '1px solid var(--border-dim)',
    }}>
      {/* Timeline dot */}
      <div style={{ paddingTop: 3, flexShrink: 0 }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: 'var(--color-crimson)',
          boxShadow: '0 0 6px rgba(194,42,77,0.55)',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.64rem', fontWeight: 400,
          color: 'var(--color-text-soft)', lineHeight: 1.38,
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.44rem', letterSpacing: '0.1em',
          color: 'var(--color-text-muted)', marginTop: 3,
        }}>
          {sub}
        </div>
      </div>
      {year && (
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.44rem', letterSpacing: '0.06em',
          color: 'var(--color-text-muted)', flexShrink: 0,
          paddingTop: 2,
        }}>
          {year}
        </span>
      )}
    </div>
  )
}

/* ── Mini skill tag ──────────────────────────────────────── */
function MiniTag({ label, color }) {
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.46rem', letterSpacing: '0.09em',
      padding: '3px 9px', borderRadius: 6,
      background: `color-mix(in srgb, ${color} 10%, rgba(13,6,16,0.8))`,
      border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
      color: `color-mix(in srgb, ${color} 82%, var(--color-text-soft))`,
    }}>
      {label}
    </span>
  )
}

/* ── Widget card wrapper ─────────────────────────────────── */
function InfoCard({ children, accentColor = 'var(--color-crimson)', gsapClass, style = {} }) {
  return (
    <motion.div
      className={`glass ${gsapClass}`}
      style={{
        borderRadius: 14, padding: '14px 16px',
        border: `1px solid color-mix(in srgb, ${accentColor} 20%, var(--border-soft))`,
        boxShadow: '0 4px 22px rgba(5,2,7,0.52), inset 0 1px 0 rgba(255,244,247,0.04)',
        display: 'flex', flexDirection: 'column', gap: 11,
        ...style,
      }}
      whileHover={{
        y: -3,
        boxShadow: `0 16px 40px rgba(5,2,7,0.75), 0 0 24px ${accentColor}12, inset 0 1px 0 rgba(255,244,247,0.06)`,
        borderColor: `color-mix(in srgb, ${accentColor} 34%, var(--border-soft))`,
      }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      {children}
    </motion.div>
  )
}

function CardHeader({ Icon, label, num, iconColor = 'var(--color-crimson)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <Icon size={10} strokeWidth={1.5} color={iconColor} />
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.47rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--color-text-soft)', opacity: 0.72,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem',
        color: 'var(--color-text-faint)', marginLeft: 'auto',
      }}>
        {num}
      </span>
    </div>
  )
}

/* ── Stat counter ────────────────────────────────────────── */
function AboutStat({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 48 }}>
      <div
        className="font-editorial"
        style={{
          fontSize: 'clamp(1.45rem, 2.2vw, 1.9rem)',
          fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          textShadow: '0 0 22px rgba(224,68,109,0.22)',
        }}
      >
        {value}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--color-text-muted)', marginTop: 5,
      }}>
        {label}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Main About section
═══════════════════════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef(null)
  const reduced    = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.set(
        ['.about-identity', '.about-dna-card', '.about-info-card'],
        { autoAlpha: 0 },
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        defaults: { ease: 'expo.out' },
      })

      /* Left narrative — from() keeps natural opacity:1 as target */
      tl.from('.about-label',    { y: 14, opacity: 0, duration: 0.65 }, 0.00)
        .from('.about-title-1',  { y: 36, opacity: 0, duration: 0.85 }, 0.10)
        .from('.about-title-2',  { y: 36, opacity: 0, duration: 0.85 }, 0.22)
        .from('.about-subtitle', { y: 16, opacity: 0, duration: 0.70 }, 0.34)
        .from('.about-story',    { y: 14, opacity: 0, duration: 0.65 }, 0.44)
        .from('.about-stats',    { y: 12, opacity: 0, duration: 0.60 }, 0.55)

      /* Right dashboard — explicit fromTo for guaranteed reveal */
        .fromTo('.about-identity',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.75 }, 0.20)
        .fromTo('.about-dna-card',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.09 }, 0.42)
        .fromTo('.about-info-card',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.60, stagger: 0.09 }, 0.68)
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [reduced])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position:      'relative',
        paddingTop:    'clamp(88px, 11vh, 130px)',
        paddingBottom: 'clamp(72px, 9vh, 110px)',
        overflow:      'hidden',
      }}
    >
      {/* Atmospheric depth glows */}
      <SpotlightGlow
        color="var(--color-crimson)"
        size="600px" intensity={7} blur={135}
        style={{ position: 'absolute', top: '20%', left: '5%', transform: 'translate(-50%,-50%)', zIndex: 0 }}
      />
      <SpotlightGlow
        color="var(--color-violet)"
        size="460px" intensity={6} blur={125}
        style={{ position: 'absolute', bottom: '12%', right: '3%', transform: 'translate(22%, 32%)', zIndex: 0 }}
      />

      {/* Section divider line — top */}
      <div style={{
        position: 'absolute', top: 0,
        left: 'clamp(1.25rem, 3.5vw, 3.5rem)',
        right: 'clamp(1.25rem, 3.5vw, 3.5rem)',
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(194,42,77,0.18) 20%, rgba(194,42,77,0.18) 80%, transparent)',
        zIndex: 1,
      }} />

      {/* ── Max-width wrapper ──────────────────────────────────── */}
      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        padding: '0 clamp(1.25rem, 3.5vw, 3.5rem)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── 2-column main grid ──────────────────────────────── */}
        <div
          className="about-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '42% 58%',
            gap:                 'clamp(2rem, 4.5vw, 5rem)',
            alignItems:          'start',
          }}
        >

          {/* ── LEFT: Narrative panel ──────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', paddingTop: '0.25rem' }}>

            <span className="about-label section-label" style={{ letterSpacing: '0.3em' }}>
              01 / About
            </span>

            {/* Heading block */}
            <div>
              <h2
                className="about-title-1 font-editorial text-text"
                style={{
                  fontSize: 'clamp(2.4rem, 4.2vw, 4.8rem)', fontWeight: 300,
                  lineHeight: 0.93, letterSpacing: '-0.03em',
                  margin: '0 0 0.04em', display: 'block',
                }}
              >
                About
              </h2>
              <h2
                className="about-title-2 font-editorial"
                style={{
                  fontSize:         'clamp(2.4rem, 4.2vw, 4.8rem)',
                  fontWeight:       300,
                  lineHeight:       0.93,
                  fontStyle:        'italic',
                  letterSpacing:    '-0.03em',
                  margin:           0,
                  display:          'block',
                  color:            'color-mix(in srgb, var(--color-crimson) 8%, transparent)',
                  WebkitTextStroke: '1.2px color-mix(in srgb, var(--color-rose) 65%, var(--color-crimson))',
                  textShadow: [
                    '0 0 28px color-mix(in srgb, var(--color-crimson) 24%, transparent)',
                    '0 0 70px color-mix(in srgb, var(--color-rose) 10%, transparent)',
                  ].join(', '),
                }}
              >
                Imane.
              </h2>
            </div>

            {/* Subtitle */}
            <p
              className="about-subtitle"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize:   'clamp(0.95rem, 1.45vw, 1.18rem)',
                fontStyle:  'italic', fontWeight: 300,
                color:      'var(--color-text-soft)', lineHeight: 1.42, margin: 0,
              }}
            >
              Where engineering meets visual storytelling.
            </p>

            {/* Story */}
            <p
              className="about-story"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize:   'clamp(0.8rem, 1.08vw, 0.88rem)',
                fontWeight: 300,
                lineHeight: 1.88,
                color:      'color-mix(in srgb, var(--color-text-soft) 70%, var(--color-text-muted))',
                margin:     0,
                maxWidth:   '44ch',
              }}
            >
              I&apos;m a creative developer based in Casablanca, blending
              full-stack engineering with visual storytelling. With a background
              in software development, networks, Big Data, cloud computing,
              photography, videography, and volunteering, I create digital
              experiences that feel useful, human, and visually memorable.
            </p>

            {/* Stats */}
            <div
              className="about-stats"
              style={{
                display:       'flex',
                gap:           '1.6rem',
                paddingTop:    '1.1rem',
                borderTop:     '1px solid var(--border-dim)',
                flexWrap:      'wrap',
                alignItems:    'flex-start',
              }}
            >
              <AboutStat value="4+"  label="Years"       />
              <AboutStat value="20+" label="Projects"    />
              <AboutStat value="3"   label="Disciplines" />
              <AboutStat value="2"   label="Degrees"     />
            </div>

          </div>

          {/* ── RIGHT: Dashboard widget stack ──────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>

            {/* ── Identity Core ──────────────────────────────── */}
            <div
              className="about-identity"
              style={{
                borderRadius: 16,
                padding:      '20px 28px 22px',
                background:   'rgba(9, 2, 5, 0.72)',
                backdropFilter: 'blur(24px) saturate(170%)',
                WebkitBackdropFilter: 'blur(24px) saturate(170%)',
                border:       '1px solid color-mix(in srgb, var(--color-crimson) 26%, var(--border-soft))',
                boxShadow: [
                  '0 4px 32px rgba(5,2,7,0.62)',
                  'inset 0 1px 0 rgba(255,244,247,0.05)',
                  'inset 0 -1px 0 rgba(194,42,77,0.06)',
                ].join(', '),
              }}
            >
              {/* Header row */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 6,
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.46rem', letterSpacing: '0.24em',
                  color: 'var(--color-text-muted)', textTransform: 'uppercase',
                }}>
                  Identity Core
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.43rem', letterSpacing: '0.1em',
                  color: 'var(--color-crimson)', opacity: 0.7,
                }}>
                  ◈ Active
                </span>
              </div>

              {/* Node row */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', paddingTop: 14,
              }}>
                <FlowNode Icon={Code2}  label="Code"   color="var(--color-crimson)" bgColor="rgba(194,42,77,0.11)"  />
                <Connector />
                <FlowNode Icon={Camera} label="Visual" color="var(--color-violet)"  bgColor="rgba(157,78,221,0.11)" />
                <Connector />
                <FlowNode Icon={Heart}  label="Impact" color="var(--color-rose)"    bgColor="rgba(224,68,109,0.11)" />
              </div>
            </div>

            {/* ── DNA cards — 3 columns ──────────────────────── */}
            <div
              className="about-dna-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 11 }}
            >
              <DnaCard
                gsapClass="about-dna-card"
                num="01" Icon={Code2}
                title="Code DNA"
                desc="Full-stack development, web apps, systems & interfaces."
                color="var(--color-crimson)"
                tags={['Full Stack', 'Web Apps', 'Systems']}
              />
              <DnaCard
                gsapClass="about-dna-card"
                num="02" Icon={Camera}
                title="Visual DNA"
                desc="Photography, videography, editing & visual storytelling."
                color="var(--color-violet)"
                tags={['Photo', 'Film', 'Editing']}
              />
              <DnaCard
                gsapClass="about-dna-card"
                num="03" Icon={Heart}
                title="Impact DNA"
                desc="Volunteering, community initiatives & social impact."
                color="var(--color-rose)"
                tags={['Community', 'Social', 'Impact']}
              />
            </div>

            {/* ── Info row — Education + Tech + Creative ─────── */}
            <div
              className="about-info-grid"
              style={{ display: 'grid', gridTemplateColumns: '52% 1fr 1fr', gap: 11 }}
            >

              {/* Education */}
              <InfoCard accentColor="var(--color-crimson)" gsapClass="about-info-card">
                <CardHeader Icon={GraduationCap} label="Education" num="04" iconColor="var(--color-crimson)" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <EduItem
                    label="Master — Big Data & Cloud Computing"
                    sub="ENSET · FSJES"
                    year="2025"
                  />
                  <EduItem
                    label="Full Stack Web Developer"
                    sub="Intensive Bootcamp"
                    year="2023"
                  />
                  <EduItem
                    label="IT · Networks · Systems"
                    sub="Technical Background"
                    isLast
                  />
                </div>
              </InfoCard>

              {/* Tech Stack */}
              <InfoCard accentColor="var(--color-crimson)" gsapClass="about-info-card">
                <CardHeader Icon={Cpu} label="Tech" num="05" iconColor="var(--color-crimson)" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['JS', 'PHP', 'Laravel', 'Java', 'Angular', 'Spring', 'SQL'].map((t) => (
                    <MiniTag key={t} label={t} color="var(--color-crimson)" />
                  ))}
                </div>
              </InfoCard>

              {/* Creative Tools */}
              <InfoCard accentColor="var(--color-violet)" gsapClass="about-info-card">
                <CardHeader Icon={Aperture} label="Creative" num="06" iconColor="var(--color-violet)" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['Photo', 'Video', 'Editing', 'Content', 'Ps', 'Pr', 'Lr'].map((t) => (
                    <MiniTag key={t} label={t} color="var(--color-violet)" />
                  ))}
                </div>
              </InfoCard>

            </div>
          </div>

        </div>
      </div>

      {/* ── Responsive overrides ──────────────────────────────── */}
      <style>{`
        @media (max-width: 1100px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.25rem !important;
          }
          .about-info-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .about-info-grid > *:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-dna-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .about-info-grid {
            grid-template-columns: 1fr !important;
          }
          .about-info-grid > *:first-child {
            grid-column: auto;
          }
        }
        @media (max-width: 480px) {
          .about-dna-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
