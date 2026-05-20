import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Code2, ArrowUpRight, Layers,
  Terminal, GitBranch, Globe, ExternalLink,
  Landmark, BookOpen, Lock,
} from 'lucide-react'
import { gsap } from '@lib/gsap'
import { ease } from '@lib/animations'
import { SpotlightGlow } from '@components/effects'

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
const FILTERS = ['All', 'Laravel', 'React', 'JavaScript', 'HTML / CSS', 'Live Projects']

const GH = 'https://github.com/ImyMek1'

const PROJECTS = [
  {
    id: 1,
    featured: true,
    visual: 'laravel',
    title: 'MiniApp MyTask',
    tagline: 'Laravel Task Management Platform',
    category: 'Laravel',
    year: '2024',
    desc: 'A backend-driven task management application built with Laravel and Blade, focused on organizing tasks, managing workflow states, and creating a clean productivity experience.',
    stack: ['Laravel', 'Blade', 'PHP', 'MySQL', 'CSS'],
    links: {
      live: `${GH}/MiniApp_MyTask`,
      github: `${GH}/MiniApp_MyTask`,
    },
  },
  {
    id: 8,
    casestudy: true,
    visual: 'banking',
    title: 'DigiBank',
    tagline: 'Full-Stack Banking Platform',
    categories: ['Laravel', 'React'],
    category:   'Laravel',
    year: '2025',
    desc: 'AI-powered banking web application built with React and Laravel, featuring authentication, role-based dashboards, KYC OCR, smart notifications, tickets, Daret, donations, transactions, and financial tracking.',
    stack: ['React', 'Laravel', 'MySQL', 'Tailwind', 'Sanctum', 'JWT', 'OCR', 'AI'],
    links: { github: null, live: null },
  },
  {
    id: 7,
    highlight: true,
    live: true,
    visual: 'travel',
    title: 'YallaTrip',
    tagline: 'Travel Discovery & Trip Planning App',
    category: 'React',
    year: '2024',
    desc: 'A modern travel web application for discovering trips, exploring destinations, and planning adventures. Built with React for a clean, interactive user experience and deployed live on Netlify.',
    stack: ['React', 'JavaScript', 'CSS', 'Netlify'],
    links: {
      live: 'https://yalla-trip.netlify.app/',
      github: null,
    },
  },
  {
    id: 2,
    visual: 'react',
    title: 'React Final Project',
    tagline: 'Component-Based Frontend',
    category: 'React',
    year: '2024',
    desc: 'A modern React project focused on component-based UI architecture, responsive layout, and interactive frontend development.',
    stack: ['React', 'JavaScript', 'CSS'],
    links: { github: `${GH}/ImaneMaftahElKheir_Final_Project_React` },
  },
  {
    id: 3,
    visual: 'movie',
    title: 'MovieApp',
    tagline: 'JavaScript Movie Browser',
    category: 'JavaScript',
    year: '2023',
    desc: 'A movie browsing application built with JavaScript, focused on dynamic UI rendering and API-style data interaction.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    links: { github: `${GH}/MovieApp` },
  },
  {
    id: 4,
    visual: 'todo',
    title: 'ToDoList',
    tagline: 'Productivity App',
    category: 'JavaScript',
    year: '2023',
    desc: 'A simple productivity application for creating, managing, and organizing daily tasks with a clean interface.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    links: { github: `${GH}/ToDoList` },
  },
  {
    id: 5,
    visual: 'js',
    title: 'JS Fundamentals',
    tagline: 'JavaScript Beginner Project',
    category: 'JavaScript',
    year: '2022',
    desc: 'An early JavaScript project demonstrating DOM interaction, event handling, and dynamic behavior fundamentals.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    links: { github: `${GH}/first_project_js_imane_maftahelkheir` },
  },
  {
    id: 6,
    visual: 'html',
    title: 'HTML / CSS Interface',
    tagline: 'Static Frontend Layout',
    category: 'HTML / CSS',
    year: '2022',
    desc: 'A static frontend interface focused on layout, styling, responsive structure, and visual presentation.',
    stack: ['HTML', 'CSS'],
    links: { github: `${GH}/Imane_MaftahElKheir_Final_Projeft_HTML_CSS` },
  },
]

const TECH_STACK = [
  {
    label: 'Frontend', num: '01',
    color: 'var(--color-crimson)',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    label: 'Backend', num: '02',
    color: 'var(--color-violet)',
    items: ['Laravel', 'PHP', 'Java', 'Spring'],
  },
  {
    label: 'Database', num: '03',
    color: 'rgba(34,211,238,0.75)',
    items: ['MySQL', 'SQL Server', 'Oracle'],
  },
  {
    label: 'Tools', num: '04',
    color: 'var(--color-text-muted)',
    items: ['Git', 'GitHub', 'Netlify', 'VS Code'],
  },
]

const PULSE_LINES = [
  { text: '> building DigiBank · AI Banking',  color: 'rgba(251,191,36,0.70)',  delay: 0.0 },
  { text: '✓ React · Laravel · OCR · JWT',     color: 'rgba(74,222,128,0.65)',  delay: 0.5 },
  { text: '> netlify deploy YallaTrip',        color: 'rgba(34,211,238,0.75)',  delay: 1.0 },
  { text: '✓ React · LIVE at netlify.app',     color: 'rgba(74,222,128,0.72)',  delay: 1.5 },
  { text: '> git clone MiniApp_MyTask',        color: 'rgba(97,218,251,0.60)',  delay: 2.0 },
  { text: '✓ Laravel · Blade · PHP ready',     color: 'rgba(74,222,128,0.58)',  delay: 2.5 },
]

/* ════════════════════════════════════════════════════════════
   ACCENT MAP (by category)
════════════════════════════════════════════════════════════ */
const ACCENT = {
  'Laravel':    'var(--color-crimson)',
  'React':      'var(--color-violet)',
  'JavaScript': 'var(--color-rose)',
  'HTML / CSS': 'rgba(157,78,221,0.80)',
}

/* ════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
════════════════════════════════════════════════════════════ */

function StackBadge({ label, color = 'var(--color-crimson)', small = false }) {
  return (
    <span style={{
      fontFamily:    'JetBrains Mono, monospace',
      fontSize:      small ? '0.42rem' : '0.46rem',
      letterSpacing: '0.09em',
      padding:       small ? '2px 7px' : '3px 9px',
      borderRadius:  6,
      background:    `color-mix(in srgb, ${color} 10%, rgba(9,2,5,0.8))`,
      border:        `1px solid color-mix(in srgb, ${color} 24%, transparent)`,
      color:         `color-mix(in srgb, ${color} 85%, var(--color-text-soft))`,
      flexShrink:    0,
    }}>
      {label}
    </span>
  )
}

function FilterBtn({ label, active, onClick }) {
  const isLive = label === 'Live Projects'
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily:    'JetBrains Mono, monospace',
        fontSize:      '0.5rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding:       '6px 14px',
        borderRadius:  9999,
        border:        active
          ? isLive
            ? '1px solid rgba(34,211,238,0.38)'
            : '1px solid color-mix(in srgb, var(--color-rose) 40%, var(--border-soft))'
          : '1px solid var(--border-dim)',
        background:    active
          ? isLive
            ? 'rgba(34,211,238,0.09)'
            : 'color-mix(in srgb, var(--color-crimson) 12%, transparent)'
          : 'transparent',
        color:         active
          ? isLive ? '#22d3ee' : 'var(--color-text)'
          : 'var(--color-text-muted)',
        cursor:        'pointer',
        transition:    'all 0.25s ease',
        whiteSpace:    'nowrap',
        display:       'flex',
        alignItems:    'center',
        gap:           isLive ? '6px' : '0',
      }}
    >
      {isLive && (
        <span style={{
          width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
          background: active ? '#22d3ee' : 'rgba(34,211,238,0.40)',
          boxShadow: active ? '0 0 6px rgba(34,211,238,0.6)' : 'none',
          transition: 'all 0.25s ease',
        }} />
      )}
      {label}
    </button>
  )
}

/* ════════════════════════════════════════════════════════════
   ABSTRACT VISUALS
════════════════════════════════════════════════════════════ */

/* ── Laravel: task board columns ─────────────────────────── */
function LaravelVisual() {
  const COLS = [
    { label: 'To Do',       c: 'rgba(194,42,77,0.45)',  bg: 'rgba(194,42,77,0.08)',  items: [0.7, 0.5] },
    { label: 'In Progress', c: 'rgba(247,180,50,0.45)', bg: 'rgba(247,180,50,0.06)', items: [0.6] },
    { label: 'Done',        c: 'rgba(74,222,128,0.45)', bg: 'rgba(74,222,128,0.06)', items: [0.8, 0.5, 0.65] },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Dot-grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(194,42,77,0.08) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />

      {/* Mock task board */}
      <div style={{
        position: 'absolute', right: '3%', top: '8%',
        width: '62%', height: '84%',
        background: 'rgba(4,1,8,0.88)',
        borderRadius: 10, border: '1px solid rgba(194,42,77,0.16)',
        overflow: 'hidden', boxShadow: '0 8px 32px rgba(5,2,7,0.7)',
      }}>
        {/* App bar */}
        <div style={{
          height: 20, background: 'rgba(194,42,77,0.07)',
          borderBottom: '1px solid rgba(194,42,77,0.10)',
          display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
        }}>
          {['rgba(255,90,90,0.5)', 'rgba(255,195,50,0.5)', 'rgba(74,222,128,0.5)'].map((c, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
          ))}
          <div style={{ flex: 1, marginLeft: 6, height: 6, borderRadius: 3, background: 'rgba(194,42,77,0.10)' }} />
        </div>
        {/* Columns */}
        <div style={{ display: 'flex', gap: 4, padding: '6px 6px 0', height: 'calc(100% - 20px)' }}>
          {COLS.map((col, ci) => (
            <div key={ci} style={{
              flex: 1, borderRadius: 5,
              background: col.bg, border: `1px solid ${col.c}22`,
              padding: '4px',
            }}>
              <div style={{ width: '70%', height: 3, background: col.c, borderRadius: 2, marginBottom: 4 }} />
              {col.items.map((w, ii) => (
                <div key={ii} style={{
                  height: 16, borderRadius: 3, marginBottom: 3,
                  background: 'rgba(255,244,247,0.04)',
                  border: `1px solid ${col.c}28`,
                  padding: '0 4px',
                  display: 'flex', alignItems: 'center',
                }}>
                  <div style={{ width: `${w * 100}%`, height: 3, background: col.c, borderRadius: 2, opacity: 0.7 }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PHP badge */}
      <div style={{
        position: 'absolute', left: '4%', top: '20%',
        padding: '4px 9px', borderRadius: 7,
        background: 'rgba(194,42,77,0.10)', border: '1px solid rgba(194,42,77,0.26)',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem', color: 'rgba(194,42,77,0.88)' }}>
          Laravel · Blade
        </span>
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,2,5,0.96) 0%, rgba(9,2,5,0.44) 34%, rgba(9,2,5,0) 58%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,2,5,0.80) 0%, transparent 38%)' }} />
    </div>
  )
}

/* ── Travel / YallaTrip visual ───────────────────────────── */
function TravelVisual() {
  const DESTS = [
    { accent: 'rgba(224,68,109,0.42)', w1: '68%', w2: '44%' },
    { accent: 'rgba(34,211,238,0.34)', w1: '56%', w2: '36%' },
    { accent: 'rgba(157,78,221,0.36)', w1: '72%', w2: '50%' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Map dot-grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(34,211,238,0.06) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />
      {/* Latitude lines */}
      {[28, 54, 78].map((y, i) => (
        <div key={i} style={{
          position: 'absolute', left: 0, right: 0, top: `${y}%`,
          height: 1, background: 'rgba(34,211,238,0.04)',
        }} />
      ))}
      {/* Longitude lines */}
      {[38, 65].map((x, i) => (
        <div key={i} style={{
          position: 'absolute', top: 0, bottom: 0, left: `${x}%`,
          width: 1, background: 'rgba(34,211,238,0.04)',
        }} />
      ))}

      {/* Route SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        {/* Dashed arc route */}
        <path
          d="M 22 64 Q 98 12 178 52"
          stroke="rgba(34,211,238,0.28)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 3"
          strokeLinecap="round"
        />
        {/* Origin */}
        <circle cx="22" cy="64" r="2.8" fill="rgba(34,211,238,0.65)" />
        <circle cx="22" cy="64" r="6.5" fill="rgba(34,211,238,0.09)" stroke="rgba(34,211,238,0.22)" strokeWidth="0.7" />
        {/* Waypoint */}
        <circle cx="98" cy="26" r="1.8" fill="rgba(157,78,221,0.60)" />
        <circle cx="98" cy="26" r="4.5" fill="rgba(157,78,221,0.07)" stroke="rgba(157,78,221,0.18)" strokeWidth="0.7" />
        {/* Destination */}
        <circle cx="178" cy="52" r="3.2" fill="rgba(224,68,109,0.78)" />
        <circle cx="178" cy="52" r="7.5" fill="rgba(224,68,109,0.09)" stroke="rgba(224,68,109,0.24)" strokeWidth="0.7" />
        {/* Pin stem at destination */}
        <line x1="178" y1="52" x2="178" y2="62" stroke="rgba(224,68,109,0.40)" strokeWidth="0.8" />
      </svg>

      {/* Destination card mockups */}
      <div style={{
        position: 'absolute', right: '3%', top: '8%',
        width: '40%', height: '82%',
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        {DESTS.map((dest, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 7,
            background: 'rgba(4,1,8,0.82)',
            border: `1px solid ${dest.accent}`,
            overflow: 'hidden', display: 'flex',
          }}>
            {/* Color thumbnail */}
            <div style={{
              width: 26, flexShrink: 0,
              background: dest.accent.replace(/[\d.]+\)$/, '0.28)'),
            }} />
            {/* Text lines */}
            <div style={{
              flex: 1, padding: '5px 7px',
              display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center',
            }}>
              <div style={{ width: dest.w1, height: 3, background: dest.accent, borderRadius: 1.5 }} />
              <div style={{ width: dest.w2, height: 2, background: dest.accent.replace(/[\d.]+\)$/, '0.40)'), borderRadius: 1 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Netlify deploy badge */}
      <div style={{
        position: 'absolute', left: '4%', bottom: '10%',
        padding: '3px 9px', borderRadius: 6,
        background: 'rgba(0,198,177,0.07)', border: '1px solid rgba(0,198,177,0.24)',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.40rem', color: 'rgba(0,198,177,0.88)' }}>
          ◈ netlify · deployed
        </span>
      </div>

      {/* Left fade */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,2,5,0.97) 0%, rgba(9,2,5,0.52) 36%, rgba(9,2,5,0.04) 60%)' }} />
      {/* Bottom fade */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,2,5,0.72) 0%, transparent 40%)' }} />
    </div>
  )
}

/* ── Banking / DigiBank visual ───────────────────────────── */
function BankingVisual() {
  const GOLD = 'rgba(251,191,36,'
  const TXN = [
    { label: 'Salary Deposit',    arrow: '▲', amount: '+2,500', ac: 'rgba(74,222,128,0.65)',  bg: 'rgba(74,222,128,0.10)' },
    { label: 'Daret Payment',     arrow: '▼', amount: '-350',   ac: 'rgba(224,68,109,0.60)',  bg: 'rgba(224,68,109,0.09)' },
    { label: 'Donation Transfer', arrow: '▼', amount: '-80',    ac: `${GOLD}0.60)`,           bg: `${GOLD}0.07)` },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Gold dot-grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${GOLD}0.07) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />
      {/* Ambient gold glow */}
      <div style={{
        position: 'absolute', right: '32%', top: '18%',
        width: 110, height: 110,
        background: `radial-gradient(circle, ${GOLD}0.08) 0%, transparent 70%)`,
        filter: 'blur(22px)',
      }} />

      {/* Dashboard panel */}
      <div style={{
        position: 'absolute', right: '3%', top: '7%',
        width: '63%', height: '86%',
        background: 'rgba(4,1,8,0.90)',
        borderRadius: 10, border: `1px solid ${GOLD}0.18)`,
        overflow: 'hidden', boxShadow: `0 8px 32px rgba(5,2,7,0.7), 0 0 20px ${GOLD}0.05)`,
      }}>
        {/* Title bar */}
        <div style={{
          height: 20, background: `${GOLD}0.05)`,
          borderBottom: `1px solid ${GOLD}0.10)`,
          display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
        }}>
          {['rgba(255,90,90,0.5)', 'rgba(255,195,50,0.5)', 'rgba(74,222,128,0.5)'].map((c, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
          ))}
          <div style={{ flex: 1, marginLeft: 4, height: 6, borderRadius: 3, background: `${GOLD}0.08)`,
            display: 'flex', alignItems: 'center', padding: '0 5px', gap: 3 }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: `${GOLD}0.55)` }} />
            <div style={{ width: '28%', height: 2, borderRadius: 1, background: `${GOLD}0.22)` }} />
          </div>
          {/* Role tabs */}
          {['Admin', 'Client'].map((role, i) => (
            <div key={role} style={{
              padding: '1px 6px', borderRadius: 3, marginRight: i === 0 ? 1 : 0,
              background: i === 0 ? `${GOLD}0.14)` : 'transparent',
              border: `1px solid ${i === 0 ? `${GOLD}0.28)` : `${GOLD}0.08)`}`,
            }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.31rem',
                color: i === 0 ? `${GOLD}0.88)` : `${GOLD}0.38)`, letterSpacing: '0.08em' }}>
                {role}
              </span>
            </div>
          ))}
        </div>

        {/* Balance row */}
        <div style={{
          padding: '5px 8px 4px',
          borderBottom: `1px solid ${GOLD}0.07)`,
        }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.34rem',
            color: `${GOLD}0.50)`, letterSpacing: '0.15em', marginBottom: 2 }}>
            ACCOUNT BALANCE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(74,222,128,0.65)',
              flexShrink: 0, boxShadow: '0 0 5px rgba(74,222,128,0.4)' }} />
            <div style={{ height: 7, width: '48%', borderRadius: 2, background: 'rgba(255,244,247,0.20)' }} />
            <div style={{ height: 4, width: '16%', borderRadius: 2, background: `${GOLD}0.18)` }} />
          </div>
        </div>

        {/* Transactions */}
        <div style={{ padding: '5px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {TXN.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '3px 5px', borderRadius: 4,
              background: 'rgba(255,244,247,0.02)',
              border: `1px solid ${t.ac.replace(/[\d.]+\)$/, '0.12)')}`,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 3, flexShrink: 0,
                background: t.bg, border: `1px solid ${t.ac.replace(/[\d.]+\)$/, '0.22)')}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 4, color: t.ac, lineHeight: 1 }}>{t.arrow}</span>
              </div>
              <div style={{ flex: 1, height: 2.5, background: 'rgba(255,244,247,0.08)', borderRadius: 1 }} />
              <div style={{ width: 24, height: 2.5, background: t.ac, borderRadius: 1, flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Sparkline chart */}
        <svg width="100%" height="22" viewBox="0 0 160 18" style={{ display: 'block', padding: '0 8px' }}
          preserveAspectRatio="none">
          <defs>
            <linearGradient id="bankGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`${GOLD}0.18)`} />
              <stop offset="100%" stopColor={`${GOLD}0.00)`} />
            </linearGradient>
          </defs>
          <polyline points="0,14 22,10 44,12 66,6 88,9 110,4 130,6 152,3 160,5"
            fill="none" stroke={`${GOLD}0.40)`} strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="0,14 22,10 44,12 66,6 88,9 110,4 130,6 152,3 160,5 160,18 0,18"
            fill="url(#bankGrad)" />
        </svg>

        {/* Tech badge row */}
        <div style={{ display: 'flex', gap: 3, padding: '0 8px' }}>
          {[
            { label: 'KYC ✓', c: 'rgba(74,222,128,' },
            { label: 'AI',    c: 'rgba(157,78,221,' },
            { label: 'OCR',   c: GOLD },
            { label: 'JWT',   c: GOLD },
          ].map((b, i) => (
            <div key={i} style={{
              padding: '1px 5px', borderRadius: 3,
              background: `${b.c}0.08)`, border: `1px solid ${b.c}0.24)`,
            }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.32rem',
                color: `${b.c}0.82)`, letterSpacing: '0.04em' }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Left: status badges */}
      <div style={{ position: 'absolute', left: '4%', top: '22%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ padding: '4px 9px', borderRadius: 7,
          background: `${GOLD}0.08)`, border: `1px solid ${GOLD}0.26)` }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.40rem', color: `${GOLD}0.88)` }}>
            KYC · OCR
          </span>
        </div>
        <div style={{ padding: '4px 9px', borderRadius: 7,
          background: 'rgba(157,78,221,0.08)', border: '1px solid rgba(157,78,221,0.22)' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.40rem', color: 'rgba(157,78,221,0.85)' }}>
            AI · Powered
          </span>
        </div>
      </div>

      {/* Security concentric rings */}
      {[38, 26, 16].map((r, i) => (
        <div key={i} style={{
          position: 'absolute', left: '4%', bottom: '14%',
          width: r * 2, height: r * 2, borderRadius: '50%',
          border: `1px solid ${GOLD}${0.18 - i * 0.05})`,
        }} />
      ))}
      <div style={{
        position: 'absolute', left: 'calc(4% + 38px)', bottom: 'calc(14% + 38px)',
        width: 7, height: 7, borderRadius: '50%',
        background: `${GOLD}0.55)`, transform: 'translate(-50%, 50%)',
        boxShadow: `0 0 8px ${GOLD}0.38)`,
      }} />

      {/* Fades */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(9,2,5,0.97) 0%, rgba(9,2,5,0.46) 34%, rgba(9,2,5,0) 58%)' }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(9,2,5,0.80) 0%, transparent 40%)' }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   CASE STUDY CARD  (DigiBank)
════════════════════════════════════════════════════════════ */
function CaseStudyCard({ project }) {
  const G = 'rgba(251,191,36,'
  return (
    <motion.div
      className="tech-casestudy glass"
      style={{
        position:   'relative',
        overflow:   'hidden',
        borderRadius: 18,
        border:     `1px solid ${G}0.22)`,
        boxShadow:  `0 6px 32px rgba(5,2,7,0.65), 0 0 0 1px ${G}0.05), inset 0 1px 0 rgba(255,244,247,0.05)`,
        minHeight:  228,
        cursor:     'default',
        background: `color-mix(in srgb, rgba(251,191,36,1) 2.5%, transparent)`,
      }}
      whileHover={{
        boxShadow: `0 22px 56px rgba(5,2,7,0.82), 0 0 40px ${G}0.10), inset 0 1px 0 rgba(255,244,247,0.07)`,
        borderColor: `${G}0.36)`,
      }}
      transition={{ duration: 0.35, ease: ease.expo }}
    >
      <BankingVisual />

      <div className="tech-featured-content" style={{
        position: 'relative', zIndex: 2,
        padding:   'clamp(18px, 2.5vw, 28px)',
        maxWidth:  '54%',
        display:   'flex', flexDirection: 'column', gap: 11,
        minHeight: 228, justifyContent: 'center',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
            background: `${G}0.10)`, border: `1px solid ${G}0.28)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Landmark size={13} strokeWidth={1.5} color={`${G}0.88)`} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              {/* Case Study badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '2px 8px', borderRadius: 9999,
                background: `${G}0.10)`, border: `1px solid ${G}0.30)`,
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.40rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: `${G}0.88)`, fontWeight: 600,
                }}>
                  Case Study
                </span>
              </div>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.41rem',
                letterSpacing: '0.12em', color: 'var(--color-text-faint)',
              }}>
                {project.year}
              </span>
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem',
              letterSpacing: '0.12em', color: `${G}0.52)`,
            }}>
              Laravel · React · Full-Stack
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            fontWeight: 300, lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: '0 0 4px',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '0.85rem', fontStyle: 'italic', fontWeight: 300,
            color: 'var(--color-text-soft)', margin: 0, opacity: 0.8,
          }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.67rem, 0.9vw, 0.76rem)',
          color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0,
        }}>
          {project.desc}
        </p>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.stack.map((s) => (
            <StackBadge key={s} label={s} color={`${G}0.85)`} />
          ))}
        </div>

        {/* Actions */}
        <div className="tech-featured-buttons" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {/* View Case Study — styled, coming soon */}
          <button
            disabled
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderRadius: 9999, padding: '7px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              background: `${G}0.10)`, border: `1px solid ${G}0.32)`,
              color: `${G}0.80)`,
              boxShadow: `0 4px 16px ${G}0.12)`,
              cursor: 'default',
            }}
          >
            <BookOpen size={9} strokeWidth={1.5} />
            View Case Study
            <span style={{
              fontSize: '0.36rem', letterSpacing: '0.08em',
              padding: '1px 6px', borderRadius: 9999,
              background: `${G}0.10)`, border: `1px solid ${G}0.20)`,
              color: `${G}0.55)`,
            }}>
              Soon
            </span>
          </button>

          {/* Code Private */}
          <button
            disabled
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderRadius: 9999, padding: '7px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              background: 'transparent', border: '1px solid rgba(255,244,247,0.07)',
              color: 'var(--color-text-faint)', cursor: 'not-allowed',
            }}
          >
            <Lock size={9} strokeWidth={1.5} />
            Code Private
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Small card visuals ──────────────────────────────────── */
function SmallVisual({ type }) {
  const FADE = 'linear-gradient(to right, rgba(9,2,5,0.97) 0%, rgba(9,2,5,0.44) 36%, rgba(9,2,5,0) 62%)'

  /* React — component tree */
  if (type === 'react') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '5%', top: '10%', width: '56%', height: '80%',
        borderRadius: 8, background: 'rgba(4,1,8,0.85)',
        border: '1px solid rgba(157,78,221,0.16)', overflow: 'hidden', padding: '6px' }}>
        <div style={{ height: 10, borderRadius: 4, background: 'rgba(157,78,221,0.20)', marginBottom: 3 }} />
        <div style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
          <div style={{ flex: 1, height: 18, borderRadius: 3, background: 'rgba(157,78,221,0.10)',
            border: '1px solid rgba(157,78,221,0.20)', padding: '2px 3px' }}>
            <div style={{ width: '60%', height: 3, background: 'rgba(157,78,221,0.35)', borderRadius: 2 }} />
          </div>
          <div style={{ flex: 1, height: 18, borderRadius: 3, background: 'rgba(157,78,221,0.07)',
            border: '1px solid rgba(157,78,221,0.15)', padding: '2px 3px' }}>
            <div style={{ width: '40%', height: 3, background: 'rgba(157,78,221,0.25)', borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ height: 22, borderRadius: 3, background: 'rgba(157,78,221,0.06)',
          border: '1px solid rgba(157,78,221,0.12)', marginBottom: 3, padding: '3px 4px' }}>
          <div style={{ width: '75%', height: 3, background: 'rgba(157,78,221,0.22)', borderRadius: 2 }} />
        </div>
        <div style={{ height: 8, borderRadius: 3, background: 'rgba(157,78,221,0.08)',
          border: '1px solid rgba(157,78,221,0.12)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
    </div>
  )

  /* MovieApp — film card grid */
  if (type === 'movie') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '4%', top: '10%', width: '60%', height: '80%',
        borderRadius: 8, background: 'rgba(4,1,8,0.85)',
        border: '1px solid rgba(224,68,109,0.14)', overflow: 'hidden', padding: '6px' }}>
        <div style={{ height: 9, borderRadius: 5, background: 'rgba(224,68,109,0.08)',
          border: '1px solid rgba(224,68,109,0.14)', marginBottom: 5 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
          {[
            'rgba(157,78,221,0.30)', 'rgba(194,42,77,0.25)', 'rgba(97,218,251,0.20)',
            'rgba(224,68,109,0.22)', 'rgba(157,78,221,0.18)', 'rgba(194,42,77,0.20)',
          ].map((bg, i) => (
            <div key={i} style={{ height: 30, borderRadius: 4, background: bg,
              border: '1px solid rgba(255,244,247,0.05)' }}>
              <div style={{ height: '40%', background: 'rgba(0,0,0,0.3)', borderRadius: '4px 4px 0 0' }} />
              <div style={{ height: 2, margin: '3px 3px 0', background: 'rgba(255,244,247,0.12)', borderRadius: 1 }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
    </div>
  )

  /* ToDoList — checklist */
  if (type === 'todo') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '5%', top: '10%', width: '55%', height: '80%',
        borderRadius: 8, background: 'rgba(4,1,8,0.86)',
        border: '1px solid rgba(74,222,128,0.14)', overflow: 'hidden', padding: '7px 8px' }}>
        <div style={{ width: '55%', height: 4, background: 'rgba(74,222,128,0.35)', borderRadius: 2, marginBottom: 7 }} />
        {[
          { done: true,  w: '80%' }, { done: true,  w: '60%' },
          { done: false, w: '70%' }, { done: false, w: '50%' },
          { done: false, w: '65%' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
            <div style={{
              width: 8, height: 8, borderRadius: 2, flexShrink: 0,
              background: item.done ? 'rgba(74,222,128,0.55)' : 'transparent',
              border: item.done ? '1px solid rgba(74,222,128,0.55)' : '1px solid rgba(255,244,247,0.15)',
            }} />
            <div style={{
              flex: 1, height: 3, borderRadius: 2,
              background: item.done ? 'rgba(255,244,247,0.10)' : 'rgba(255,244,247,0.18)',
              width: item.w,
            }} />
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
    </div>
  )

  /* JavaScript — code editor */
  if (type === 'js') return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '5%', top: '10%', width: '56%', height: '80%',
        borderRadius: 8, background: 'rgba(4,1,8,0.87)',
        border: '1px solid rgba(247,223,30,0.14)', overflow: 'hidden' }}>
        <div style={{ height: 14, background: 'rgba(247,223,30,0.05)',
          borderBottom: '1px solid rgba(247,223,30,0.10)',
          display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
          {['rgba(255,90,90,0.45)','rgba(255,195,50,0.45)','rgba(74,222,128,0.45)'].map((c,i)=>(
            <div key={i} style={{width:4,height:4,borderRadius:'50%',background:c}} />
          ))}
        </div>
        {[
          { w: '70%', c: 'rgba(224,68,109,0.55)',  i: 0  },
          { w: '50%', c: 'rgba(247,223,30,0.40)',  i: 12 },
          { w: '60%', c: 'rgba(255,244,247,0.18)', i: 24 },
          { w: '40%', c: 'rgba(247,223,30,0.30)',  i: 24 },
          { w: '55%', c: 'rgba(224,68,109,0.35)',  i: 12 },
          { w: '30%', c: 'rgba(255,244,247,0.12)', i: 0  },
        ].map((line, idx) => (
          <div key={idx} style={{
            margin: `4px 0 0 ${line.i + 6}px`,
            width: line.w, height: 3, borderRadius: 1.5, background: line.c,
          }} />
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
    </div>
  )

  /* HTML / CSS — layout wireframe */
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '5%', top: '10%', width: '56%', height: '80%',
        borderRadius: 8, background: 'rgba(4,1,8,0.86)',
        border: '1px solid rgba(157,78,221,0.14)', overflow: 'hidden', padding: '6px' }}>
        <div style={{ height: 9, borderRadius: 3, background: 'rgba(157,78,221,0.14)',
          border: '1px solid rgba(157,78,221,0.18)', marginBottom: 4 }} />
        <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
          {[28, 24, 32, 20].map((w, i) => (
            <div key={i} style={{ width: w, height: 5, borderRadius: 2,
              background: `rgba(157,78,221,${0.20 - i * 0.04})` }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 3, height: 32 }}>
          <div style={{ flex: 2, borderRadius: 3, background: 'rgba(157,78,221,0.06)',
            border: '1px solid rgba(157,78,221,0.12)' }} />
          <div style={{ flex: 1, borderRadius: 3, background: 'rgba(157,78,221,0.04)',
            border: '1px solid rgba(157,78,221,0.09)' }} />
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(157,78,221,0.08)',
          border: '1px solid rgba(157,78,221,0.12)', marginTop: 4 }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: FADE }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   FEATURED CARD  (MiniApp MyTask)
════════════════════════════════════════════════════════════ */
function FeaturedCard({ project }) {
  return (
    <motion.div
      className="tech-featured glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 18,
        border:       '1px solid color-mix(in srgb, var(--color-crimson) 28%, var(--border-soft))',
        boxShadow:    '0 6px 32px rgba(5,2,7,0.65), inset 0 1px 0 rgba(255,244,247,0.05)',
        minHeight:    224,
        cursor:       'default',
      }}
      whileHover={{
        boxShadow: '0 22px 56px rgba(5,2,7,0.82), 0 0 40px rgba(194,42,77,0.12), inset 0 1px 0 rgba(255,244,247,0.07)',
        borderColor: 'color-mix(in srgb, var(--color-crimson) 42%, var(--border-soft))',
      }}
      transition={{ duration: 0.35, ease: ease.expo }}
    >
      <LaravelVisual />

      <div className="tech-featured-content" style={{
        position: 'relative', zIndex: 2,
        padding:   'clamp(18px, 2.5vw, 28px)',
        maxWidth:  '54%',
        display:   'flex', flexDirection: 'column', gap: 11,
        minHeight: 224, justifyContent: 'center',
      }}>
        {/* Header meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'rgba(194,42,77,0.12)',
            border: '1px solid rgba(194,42,77,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Globe size={13} strokeWidth={1.5} color="var(--color-crimson)" />
          </div>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-crimson)', opacity: 0.8,
            }}>
              Featured · {project.year}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem',
              letterSpacing: '0.12em', color: 'var(--color-text-faint)',
            }}>
              {project.category}
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            fontWeight: 300, lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: '0 0 4px',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '0.85rem', fontStyle: 'italic', fontWeight: 300,
            color: 'var(--color-text-soft)', margin: 0, opacity: 0.8,
          }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.67rem, 0.9vw, 0.76rem)',
          color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0,
        }}>
          {project.desc}
        </p>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.stack.map((s) => (
            <StackBadge key={s} label={s} color="var(--color-crimson)" />
          ))}
        </div>

        {/* Actions */}
        <div className="tech-featured-buttons" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.a
            href={project.links.live}
            target="_blank" rel="noopener noreferrer"
            className="btn-neon"
            style={{
              borderRadius: 9999, padding: '7px 16px', gap: '6px',
              fontSize: '0.5rem', letterSpacing: '0.14em', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(194,42,77,0.20)',
            }}
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(194,42,77,0.42)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: ease.expo }}
          >
            View Project
            <ExternalLink size={9} strokeWidth={1.5} />
          </motion.a>
          <motion.a
            href={project.links.github}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost"
            style={{
              borderRadius: 9999, padding: '7px 16px', gap: '6px',
              fontSize: '0.5rem', letterSpacing: '0.14em', textDecoration: 'none',
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: ease.expo }}
          >
            <GitBranch size={9} strokeWidth={1.5} />
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   HIGHLIGHT CARD  (YallaTrip – Live Project)
════════════════════════════════════════════════════════════ */
function HighlightCard({ project }) {
  return (
    <motion.div
      className="tech-highlight glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 16,
        border:       '1px solid rgba(34,211,238,0.20)',
        boxShadow:    '0 6px 32px rgba(5,2,7,0.65), 0 0 0 1px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,244,247,0.05)',
        minHeight:    190,
        cursor:       'default',
        background:   'color-mix(in srgb, rgba(34,211,238,1) 3%, transparent)',
      }}
      whileHover={{
        boxShadow: '0 22px 56px rgba(5,2,7,0.82), 0 0 36px rgba(34,211,238,0.10), inset 0 1px 0 rgba(255,244,247,0.07)',
        borderColor: 'rgba(34,211,238,0.34)',
      }}
      transition={{ duration: 0.35, ease: ease.expo }}
    >
      <TravelVisual />

      <div className="tech-featured-content" style={{
        position: 'relative', zIndex: 2,
        padding:   'clamp(16px, 2.2vw, 26px)',
        maxWidth:  '53%',
        display:   'flex', flexDirection: 'column', gap: 10,
        minHeight: 190, justifyContent: 'center',
      }}>
        {/* Header: LIVE + Netlify + year */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* LIVE badge */}
          <motion.div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 9px', borderRadius: 9999,
            background: 'rgba(34,211,238,0.10)',
            border: '1px solid rgba(34,211,238,0.34)',
            boxShadow: '0 0 14px rgba(34,211,238,0.14)',
          }}>
            <motion.span
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#22d3ee', display: 'block', flexShrink: 0,
              }}
              animate={{ opacity: [1, 0.25, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.41rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#22d3ee', fontWeight: 600,
            }}>
              Live
            </span>
          </motion.div>

          {/* Netlify badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 8px', borderRadius: 9999,
            background: 'rgba(0,198,177,0.07)',
            border: '1px solid rgba(0,198,177,0.22)',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.40rem',
              letterSpacing: '0.10em', color: '#00c6b1',
            }}>
              ◈ Netlify
            </span>
          </div>

          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.41rem',
            letterSpacing: '0.12em', color: 'var(--color-text-faint)',
          }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
            fontWeight: 300, lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: '0 0 4px',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '0.82rem', fontStyle: 'italic', fontWeight: 300,
            color: 'var(--color-text-soft)', margin: 0, opacity: 0.8,
          }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.65rem, 0.88vw, 0.73rem)',
          color: 'var(--color-text-muted)', lineHeight: 1.72, margin: 0,
        }}>
          {project.desc}
        </p>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.stack.map((s) => (
            <StackBadge key={s} label={s} color="rgba(34,211,238,0.85)" />
          ))}
        </div>

        {/* Actions */}
        <div className="tech-featured-buttons" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.a
            href={project.links.live}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderRadius: 9999, padding: '7px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none',
              background: 'rgba(34,211,238,0.11)',
              border: '1px solid rgba(34,211,238,0.34)',
              color: '#22d3ee',
              boxShadow: '0 4px 16px rgba(34,211,238,0.14)',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(34,211,238,0.28)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: ease.expo }}
          >
            <Globe size={9} strokeWidth={1.5} />
            Live Demo
            <ExternalLink size={9} strokeWidth={1.5} />
          </motion.a>

          <button
            disabled
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderRadius: 9999, padding: '7px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              background: 'transparent',
              border: '1px solid rgba(255,244,247,0.07)',
              color: 'var(--color-text-faint)',
              cursor: 'not-allowed',
            }}
          >
            <GitBranch size={9} strokeWidth={1.5} />
            Code Soon
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   PROJECT CARD (small)
════════════════════════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const accent = ACCENT[project.category] || 'var(--color-crimson)'

  return (
    <motion.div
      className="tech-card glass"
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 15,
        border:       `1px solid color-mix(in srgb, ${accent} 22%, var(--border-soft))`,
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        minHeight:    152,
        cursor:       'default',
      }}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, ease: ease.expo, delay: index * 0.08 }}
      whileHover={{
        y: -5,
        boxShadow: `0 20px 50px rgba(5,2,7,0.78), 0 0 28px ${accent}18, inset 0 1px 0 rgba(255,244,247,0.06)`,
        borderColor: `color-mix(in srgb, ${accent} 36%, var(--border-soft))`,
      }}
    >
      <SmallVisual type={project.visual} />

      <div className="tech-card-content" style={{
        position: 'relative', zIndex: 2,
        padding:  '15px 16px',
        maxWidth: '58%',
        display:  'flex', flexDirection: 'column', gap: 8, height: '100%',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            border:     `1px solid color-mix(in srgb, ${accent} 26%, transparent)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Code2 size={12} strokeWidth={1.5} color={accent} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.41rem',
              letterSpacing: '0.12em',
              color: `color-mix(in srgb, ${accent} 70%, var(--color-text-faint))`,
              padding: '1px 6px', borderRadius: 9999,
              background: `color-mix(in srgb, ${accent} 9%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 18%, transparent)`,
            }}>
              {project.category}
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.41rem',
              color: 'var(--color-text-faint)',
            }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* Title + tagline */}
        <div>
          <h3 className="font-editorial text-text" style={{
            fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-0.02em', margin: '0 0 3px',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '0.74rem', fontStyle: 'italic', fontWeight: 300,
            color: 'var(--color-text-soft)', margin: 0, opacity: 0.7,
          }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.59rem',
          color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0,
        }}>
          {project.desc}
        </p>

        {/* Stack + GitHub link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {project.stack.map((s) => (
              <StackBadge key={s} label={s} color={accent} small />
            ))}
          </div>
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem',
                letterSpacing: '0.1em', textDecoration: 'none',
                color: `color-mix(in srgb, ${accent} 65%, var(--color-text-muted))`,
                marginLeft: 8,
              }}
            >
              <GitBranch size={8} strokeWidth={1.5} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   TECH STACK PANEL
════════════════════════════════════════════════════════════ */
function TechStackPanel() {
  return (
    <motion.div
      className="tech-stack-panel glass"
      style={{
        borderRadius: 16, padding: '18px 20px',
        border:       '1px solid color-mix(in srgb, var(--color-crimson) 20%, var(--border-soft))',
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        display:      'flex', flexDirection: 'column', gap: 14,
      }}
      whileHover={{ boxShadow: '0 16px 44px rgba(5,2,7,0.72), inset 0 1px 0 rgba(255,244,247,0.06)' }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <Layers size={10} strokeWidth={1.5} color="var(--color-crimson)" />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-text-soft)', opacity: 0.72,
        }}>
          Tech Stack
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {TECH_STACK.map(({ label, num, color, items }) => (
          <div key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 3, height: 3, borderRadius: '50%', background: color, flexShrink: 0,
                boxShadow: `0 0 5px ${color}` }} />
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.40rem',
                color: 'var(--color-text-faint)', marginLeft: 'auto',
              }}>
                {num}
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {items.map((item) => <StackBadge key={item} label={item} color={color} small />)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   ENGINEERING PULSE
════════════════════════════════════════════════════════════ */
function EngineeringPulse() {
  return (
    <motion.div
      className="tech-pulse glass"
      style={{
        borderRadius: 16, padding: '18px 20px',
        border:       '1px solid color-mix(in srgb, var(--color-violet) 22%, var(--border-soft))',
        boxShadow:    '0 4px 24px rgba(5,2,7,0.55), inset 0 1px 0 rgba(255,244,247,0.04)',
        display:      'flex', flexDirection: 'column', gap: 14,
        overflow:     'hidden', position: 'relative',
      }}
      whileHover={{
        boxShadow: '0 16px 44px rgba(5,2,7,0.72), 0 0 24px rgba(157,78,221,0.08), inset 0 1px 0 rgba(255,244,247,0.06)',
      }}
      transition={{ duration: 0.3, ease: ease.expo }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Terminal size={10} strokeWidth={1.5} color="var(--color-violet)" />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-text-soft)', opacity: 0.72,
          }}>
            Engineering Pulse
          </span>
        </div>
        <motion.div
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(74,222,128,0.8)',
            boxShadow: '0 0 8px rgba(74,222,128,0.5)', flexShrink: 0 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { label: 'Repos', value: '10' },
          { label: 'Lang',  value: '4'  },
          { label: 'Live',  value: '1'  },
        ].map(({ label, value }) => (
          <div key={label} style={{
            flex: 1, padding: '6px 8px', borderRadius: 7,
            background: 'rgba(157,78,221,0.07)',
            border: '1px solid rgba(157,78,221,0.14)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
              color: label === 'Live' ? '#22d3ee' : 'var(--color-text)', fontWeight: 500,
            }}>
              {value}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.38rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--color-text-faint)',
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal window */}
      <div style={{
        background: 'rgba(4,1,8,0.85)', borderRadius: 8,
        border: '1px solid rgba(157,78,221,0.14)',
        padding: '10px 12px',
        display: 'flex', flexDirection: 'column', gap: 6, flex: 1,
      }}>
        {PULSE_LINES.map((line, i) => (
          <motion.div
            key={i}
            style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem',
              letterSpacing: '0.05em', color: line.color,
            }}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: line.delay, duration: 0.4, ease: ease.expo }}
          >
            {line.text}
          </motion.div>
        ))}
        <motion.div
          style={{ width: 6, height: 10, background: 'rgba(97,218,251,0.65)', borderRadius: 1, marginTop: 2 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <GitBranch size={8} strokeWidth={1.5} color="var(--color-text-faint)" />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.53rem',
          color: 'var(--color-text-muted)', fontStyle: 'italic',
        }}>
          Building and deploying full-stack and React projects.
        </span>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════ */
export default function Tech() {
  const sectionRef = useRef(null)
  const reduced    = useReducedMotion()
  const [filter, setFilter] = useState('All')

  const featured       = PROJECTS.find((p) => p.featured)
  const highlighted    = PROJECTS.find((p) => p.highlight)
  const caseStudyProj  = PROJECTS.find((p) => p.casestudy)

  const showFeatured    = filter === 'All' || filter === featured.category
  const showCaseStudy   = filter === 'All' || (caseStudyProj?.categories ?? []).includes(filter)
  const showHighlighted = filter === 'All' || filter === highlighted.category || filter === 'Live Projects'

  const smallProjects = PROJECTS
    .filter((p) => !p.featured && !p.highlight && !p.casestudy)
    .filter((p) => {
      if (filter === 'All') return true
      if (filter === 'Live Projects') return p.live === true
      return p.category === filter
    })

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.set(['.tech-featured', '.tech-casestudy', '.tech-highlight', '.tech-stack-panel', '.tech-pulse'], { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        defaults: { ease: 'expo.out' },
      })

      tl.from('.tech-label',    { y: 14, opacity: 0, duration: 0.65 }, 0.00)
        .from('.tech-title-1',  { y: 36, opacity: 0, duration: 0.85 }, 0.10)
        .from('.tech-title-2',  { y: 36, opacity: 0, duration: 0.85 }, 0.22)
        .from('.tech-subtitle', { y: 16, opacity: 0, duration: 0.70 }, 0.34)
        .from('.tech-intro',    { y: 14, opacity: 0, duration: 0.65 }, 0.42)
        .from('.tech-filters',  { y: 12, opacity: 0, duration: 0.60 }, 0.52)

        .fromTo('.tech-featured',
          { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.80 }, 0.28)
        .fromTo('.tech-casestudy',
          { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.78 }, 0.38)
        .fromTo('.tech-highlight',
          { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.48)
        .fromTo('.tech-stack-panel',
          { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.70)
        .fromTo('.tech-pulse',
          { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.80)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="tech"
      ref={sectionRef}
      style={{
        position:      'relative',
        paddingTop:    'clamp(88px, 11vh, 130px)',
        paddingBottom: 'clamp(72px, 9vh, 110px)',
        overflow:      'hidden',
      }}
    >
      <SpotlightGlow
        color="var(--color-crimson)"
        size="560px" intensity={7} blur={130}
        style={{ position: 'absolute', top: '30%', right: '8%', transform: 'translate(30%,-50%)', zIndex: 0 }}
      />
      <SpotlightGlow
        color="var(--color-violet)"
        size="420px" intensity={5} blur={120}
        style={{ position: 'absolute', bottom: '20%', left: '6%', transform: 'translate(-30%, 30%)', zIndex: 0 }}
      />

      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0,
        left: 'clamp(1.25rem, 3.5vw, 3.5rem)',
        right: 'clamp(1.25rem, 3.5vw, 3.5rem)',
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(194,42,77,0.18) 20%, rgba(194,42,77,0.18) 80%, transparent)',
        zIndex: 1,
      }} />

      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        padding:  '0 clamp(1.25rem, 3.5vw, 3.5rem)',
        position: 'relative', zIndex: 1,
      }}>
        <div
          className="tech-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '26% 74%',
            gap:                 'clamp(2rem, 4vw, 4.5rem)',
            alignItems:          'start',
          }}
        >
          {/* ── LEFT: Sidebar ──────────────────────────────── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1.3rem',
            position: 'sticky', top: '100px',
          }}>
            <span className="tech-label section-label" style={{ letterSpacing: '0.3em' }}>
              02 / Tech
            </span>

            <div>
              <h2
                className="tech-title-1 font-editorial text-text"
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 4rem)', fontWeight: 300,
                  lineHeight: 0.93, letterSpacing: '-0.03em',
                  margin: '0 0 0.04em', display: 'block',
                }}
              >
                Tech
              </h2>
              <h2
                className="tech-title-2 font-editorial"
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 4rem)',
                  fontWeight: 300, lineHeight: 0.93,
                  fontStyle: 'italic', letterSpacing: '-0.03em',
                  margin: 0, display: 'block',
                  color:            'color-mix(in srgb, var(--color-crimson) 8%, transparent)',
                  WebkitTextStroke: '1.2px color-mix(in srgb, var(--color-rose) 65%, var(--color-crimson))',
                  textShadow: '0 0 28px color-mix(in srgb, var(--color-crimson) 24%, transparent), 0 0 70px color-mix(in srgb, var(--color-rose) 10%, transparent)',
                }}
              >
                Projects.
              </h2>
            </div>

            <p
              className="tech-subtitle"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize:   'clamp(0.88rem, 1.25vw, 1.05rem)',
                fontStyle:  'italic', fontWeight: 300,
                color:      'var(--color-text-soft)', lineHeight: 1.42, margin: 0,
              }}
            >
              Systems, interfaces, and digital solutions built with precision.
            </p>

            <p
              className="tech-intro"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   'clamp(0.73rem, 0.98vw, 0.82rem)',
                fontWeight: 300, lineHeight: 1.82,
                color:      'color-mix(in srgb, var(--color-text-soft) 65%, var(--color-text-muted))',
                margin:     0,
              }}
            >
              Real repositories from{' '}
              <a
                href={GH}
                target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--color-crimson)', textDecoration: 'none', opacity: 0.85 }}
              >
                github.com/ImyMek1
              </a>
              {' '}— full-stack builds, frontend projects, and a live deployed app.
            </p>

            {/* Filter tabs */}
            <div className="tech-filters" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.43rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--color-text-faint)', marginBottom: 2,
              }}>
                Filter
              </span>
              {FILTERS.map((f) => (
                <FilterBtn key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
              ))}
            </div>

            {/* GitHub link */}
            <motion.a
              href={GH}
              target="_blank" rel="noopener noreferrer"
              style={{
                display:       'inline-flex', alignItems: 'center', gap: 7,
                fontFamily:    'JetBrains Mono, monospace',
                fontSize:      '0.48rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', textDecoration: 'none',
                color:         'var(--color-text-muted)',
                padding:       '8px 14px', borderRadius: 9999,
                border:        '1px solid var(--border-dim)',
                transition:    'all 0.25s ease',
                marginTop:     4,
              }}
              whileHover={{
                color: 'var(--color-text)',
                borderColor: 'var(--border-soft)',
                background: 'rgba(194,42,77,0.06)',
              }}
              transition={{ duration: 0.2 }}
            >
              <GitBranch size={11} strokeWidth={1.5} />
              All on GitHub
              <ArrowUpRight size={10} strokeWidth={1.5} />
            </motion.a>
          </div>

          {/* ── RIGHT: Content ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>

            {/* Featured card (MiniApp MyTask) */}
            <AnimatePresence mode="wait">
              {showFeatured && (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: ease.expo }}
                >
                  <FeaturedCard project={featured} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Case Study card (DigiBank) */}
            <AnimatePresence mode="wait">
              {showCaseStudy && (
                <motion.div
                  key="casestudy"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: ease.expo }}
                >
                  <CaseStudyCard project={caseStudyProj} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Highlight card (YallaTrip – Live) */}
            <AnimatePresence mode="wait">
              {showHighlighted && (
                <motion.div
                  key="highlighted"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: ease.expo }}
                >
                  <HighlightCard project={highlighted} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Small project cards */}
            <AnimatePresence mode="wait">
              {smallProjects.length > 0 && (
                <motion.div
                  key={filter}
                  className="tech-cards-grid"
                  style={{
                    display:             'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap:                 12,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {smallProjects.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom: stack + pulse */}
            <div
              className="tech-bottom-grid"
              style={{ display: 'grid', gridTemplateColumns: '56% 44%', gap: 12 }}
            >
              <TechStackPanel />
              <EngineeringPulse />
            </div>

          </div>
        </div>
      </div>

      {/* ── Responsive overrides ─────────────────────────────── */}
      <style>{`
        /* Hard overflow guard on the section itself */
        #tech {
          overflow-x: hidden;
          max-width: 100vw;
        }
        #tech * {
          box-sizing: border-box;
        }
        .tech-grid,
        .tech-cards-grid,
        .tech-bottom-grid {
          min-width: 0;
        }

        @media (max-width: 1100px) {
          .tech-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .tech-grid > *:first-child {
            position: static !important;
          }
          .tech-filters {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }
          .tech-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          /* All grid containers — prevent expansion */
          .tech-grid,
          .tech-cards-grid,
          .tech-bottom-grid {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          .tech-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .tech-bottom-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* Filter — wrap cleanly, no scrollbar */
          .tech-filters {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
            overflow: visible !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .tech-filters > span {
            width: 100% !important;
            margin-bottom: 0 !important;
          }
          .tech-filters button {
            flex: 0 1 auto !important;
            min-width: 0 !important;
            white-space: nowrap !important;
            padding: 7px 12px !important;
            font-size: 0.5rem !important;
          }

          /* Featured/highlight card content — full width */
          .tech-featured-content {
            max-width: 100% !important;
            width: 100% !important;
            min-width: 0 !important;
          }

          /* Buttons — stack vertically, full width, override btn-neon min-width */
          .tech-featured-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
            width: 100% !important;
          }
          .tech-featured-buttons > * {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            height: auto !important;
            padding: 10px 16px !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }

          /* Small project card content — full width */
          .tech-card-content {
            max-width: 100% !important;
            width: 100% !important;
            min-width: 0 !important;
          }

          /* All cards — hard overflow containment */
          .tech-featured,
          .tech-highlight,
          .tech-card {
            overflow: hidden !important;
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .tech-filters button {
            padding: 6px 10px !important;
            font-size: 0.48rem !important;
          }
        }
      `}</style>
    </section>
  )
}
