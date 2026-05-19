import { Code2, Camera, Target, Heart } from 'lucide-react'

/* ── Tech / Tool badges ─────────────────────────────────────── */
const TECH = [
  { slug: 'JS',  bg: 'rgba(247,223,30,0.12)',  bd: 'rgba(247,223,30,0.25)',  fg: '#f7df1e' },
  { slug: 'TS',  bg: 'rgba(49,120,198,0.14)',  bd: 'rgba(49,120,198,0.28)',  fg: '#3178c6' },
  { slug: 'Re',  bg: 'rgba(97,218,251,0.10)',  bd: 'rgba(97,218,251,0.22)',  fg: '#61dafb' },
  { slug: 'N',   bg: 'rgba(51,153,51,0.12)',   bd: 'rgba(51,153,51,0.24)',   fg: '#339933' },
  { slug: 'Lv',  bg: 'rgba(255,45,32,0.10)',   bd: 'rgba(255,45,32,0.22)',   fg: '#FF2D20' },
  { slug: 'DB',  bg: 'rgba(68,121,161,0.12)',  bd: 'rgba(68,121,161,0.25)',  fg: '#4479A1' },
]

const CREATIVE = [
  { slug: 'Ps', bg: 'rgba(49,168,255,0.10)', bd: 'rgba(49,168,255,0.22)', fg: '#31A8FF' },
  { slug: 'Pr', bg: 'rgba(234,119,255,0.10)', bd: 'rgba(234,119,255,0.22)', fg: '#ea77ff' },
  { slug: 'Lr', bg: 'rgba(144,192,255,0.10)', bd: 'rgba(144,192,255,0.22)', fg: '#90c0ff' },
  { slug: 'Ae', bg: 'rgba(153,153,255,0.10)', bd: 'rgba(153,153,255,0.22)', fg: '#9999FF' },
  { slug: 'FC', bg: 'rgba(255,255,255,0.04)', bd: 'rgba(255,255,255,0.12)', fg: 'rgba(255,255,255,0.6)' },
]

const AVATAR_BG = [
  'linear-gradient(135deg,#c22a4d,#9d4edd)',
  'linear-gradient(135deg,#9d4edd,#6d28d9)',
  'linear-gradient(135deg,#e0446d,#c22a4d)',
  'linear-gradient(135deg,#6d28d9,#3178c6)',
  'linear-gradient(135deg,#c22a4d,#e0446d)',
]

function Badge({ slug, bg, bd, fg }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
      background: bg, border: `1px solid ${bd}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.51rem', fontWeight: 700, color: fg }}>
        {slug}
      </span>
    </div>
  )
}

/* ── SVG circular progress arc ──────────────────────────────── */
function ArcProgress({ pct = 87, size = 42 }) {
  const r     = (size - 7) / 2
  const circ  = 2 * Math.PI * r
  const dash  = (pct / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--color-rose)" strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem', fontWeight: 700, color: 'var(--color-rose)' }}>
          {pct}%
        </span>
      </div>
    </div>
  )
}

/* ── Single widget card shell ────────────────────────────────── */
function Widget({ Icon, iconColor, label, badge, children }) {
  return (
    <div
      className="gsap-widget glass"
      style={{
        borderRadius: 13,
        padding: '12px 14px',
        border: '1px solid color-mix(in srgb, var(--color-crimson) 18%, var(--border-soft))',
        boxShadow: '0 4px 20px rgba(5,2,7,0.52), inset 0 1px 0 rgba(255,244,247,0.04)',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon size={10} strokeWidth={2} color={iconColor} style={{ flexShrink: 0 }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.49rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--color-text-muted) 130%, transparent)',
          }}>
            {label}
          </span>
        </div>
        {badge && (
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
            letterSpacing: '0.1em',
            color: 'color-mix(in srgb, var(--color-text-faint) 140%, transparent)',
          }}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/* ── Exported right-column panel ─────────────────────────────── */
export default function HeroWidgets() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* 1 — Tech Stack */}
      <Widget Icon={Code2} iconColor="var(--color-crimson)" label="Tech Stack" badge="› VIEW ALL">
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {TECH.map((t) => <Badge key={t.slug} {...t} />)}
        </div>
      </Widget>

      {/* 2 — Creative Tools */}
      <Widget Icon={Camera} iconColor="var(--color-violet)" label="Creative Tools" badge="› VIEW ALL">
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {CREATIVE.map((t) => <Badge key={t.slug} {...t} />)}
        </div>
      </Widget>

      {/* 3 — Current Focus */}
      <Widget Icon={Target} iconColor="var(--color-rose)" label="Current Focus" badge="NOW">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.63rem', color: 'var(--color-text-soft)', lineHeight: 1.55, margin: '0 0 7px' }}>
              Building meaningful products &amp; visual stories
            </p>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {['Full Stack', 'AI Integration', 'Storytelling'].map((tag) => (
                <span key={tag} className="tag-glass" style={{ fontSize: '0.42rem', padding: '2px 7px', borderRadius: 9999 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ArcProgress pct={87} size={42} />
        </div>
      </Widget>

      {/* 4 — Impact & Volunteering */}
      <Widget Icon={Heart} iconColor="var(--color-rose)" label="Impact & Volunteering" badge="ONGOING">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.63rem', color: 'var(--color-text-soft)', lineHeight: 1.55, margin: '0 0 8px' }}>
          Community building, education &amp; social impact initiatives
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {AVATAR_BG.map((bg, i) => (
            <div key={i} style={{
              width: 21, height: 21, borderRadius: '50%', flexShrink: 0,
              background: bg, border: '1.5px solid var(--color-surface-1)',
              marginLeft: i > 0 ? -6 : 0, zIndex: AVATAR_BG.length - i,
            }} />
          ))}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem',
            color: 'var(--color-text-muted)', marginLeft: 9,
          }}>
            +24
          </span>
        </div>
      </Widget>

    </div>
  )
}
