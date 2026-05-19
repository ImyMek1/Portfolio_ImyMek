import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'
import { profile } from '@data/profile'
import { ease } from '@lib/animations'
import { useScrollTo } from '@hooks/useLenis'

const LINKS = [
  { label: 'Home',      href: '#hero'         },
  { label: 'About',     href: '#about'        },
  { label: 'Tech',      href: '#tech'         },
  { label: 'Creative',  href: '#creative'     },
  { label: 'Volunteer', href: '#volunteering' },
  { label: 'Contact',   href: '#contact'      },
]

const SECTION_IDS = LINKS.map((l) => l.href.slice(1))

const NAV_BG_BASE     = 'color-mix(in srgb, var(--color-base) 58%, transparent)'
const NAV_BG_SCROLLED = 'color-mix(in srgb, var(--color-base) 88%, transparent)'
const MENU_BG         = 'color-mix(in srgb, var(--color-surface-1) 94%, transparent)'

export default function Navbar() {
  const reduced  = useReducedMotion()
  const scrollTo = useScrollTo()

  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [isOpen,   setIsOpen]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.35 },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const handleNav = (href) => { scrollTo(href); setIsOpen(false) }

  return (
    <motion.header
      style={{
        position:  'fixed',
        top:       '20px',
        /* left:0 right:0 + margin:auto = rock-solid centering, no scrollbar shift */
        left:      0,
        right:     0,
        margin:    '0 auto',
        width:     'min(calc(100vw - 32px), 1180px)',
        zIndex:    50,
      }}
      initial={reduced ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: ease.expo, delay: 0.2 }}
    >

      {/* ── Glass pill ─────────────────────────────────────────── */}
      <nav
        style={{
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          /* Responsive padding: tighter on narrow screens */
          padding:              '12px 20px',
          borderRadius:         '18px',
          background:           scrolled ? NAV_BG_SCROLLED : NAV_BG_BASE,
          backdropFilter:       'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border:               '1px solid var(--border-soft)',
          boxShadow:            scrolled
            ? 'var(--glow-sm), 0 12px 40px rgba(5,2,7,0.75), inset 0 1px 0 rgba(255,244,247,0.04)'
            : '0 8px 32px rgba(5,2,7,0.5), inset 0 1px 0 rgba(255,244,247,0.03)',
          transition:           'background 0.5s ease, box-shadow 0.5s ease',
          minWidth:             0,
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
          className="font-editorial tracking-widest uppercase select-none text-text shrink-0"
          style={{ fontSize: '1rem', fontWeight: 300, textDecoration: 'none' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.25, ease: ease.expo }}
        >
          {profile.initials[0]}
          <span className="text-rose">{profile.initials[1]}</span>
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center list-none m-0 p-0" style={{ gap: 'clamp(0.6rem, 1.2vw, 1.4rem)' }}>
          {LINKS.map(({ label, href }) => {
            const id       = href.slice(1)
            const isActive = active === id
            return (
              <li key={href} style={{ position: 'relative', flexShrink: 0 }}>
                <motion.a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href) }}
                  className={`font-mono uppercase transition-colors duration-300 whitespace-nowrap ${
                    isActive ? 'text-text' : 'text-text-muted/65 hover:text-text'
                  }`}
                  style={{ fontSize: '0.56rem', letterSpacing: '0.14em', textDecoration: 'none', display: 'block', paddingBottom: '5px' }}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2, ease: ease.expo }}
                >
                  {label}
                </motion.a>

                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute', bottom: 0, left: '50%',
                      transform: 'translateX(-50%)',
                      width: '3px', height: '3px', borderRadius: '50%',
                      background: 'var(--color-rose)',
                      boxShadow: '0 0 6px 1px color-mix(in srgb, var(--color-rose) 55%, transparent)',
                      display: 'block',
                    }}
                    transition={{ duration: 0.35, ease: ease.expo }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Let's Connect CTA — desktop only */}
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
          className="hidden md:flex items-center shrink-0"
          style={{
            gap:           '6px',
            padding:       '6px 14px',
            borderRadius:  9999,
            border:        '1px solid color-mix(in srgb, var(--color-rose) 32%, var(--border-soft))',
            background:    'color-mix(in srgb, var(--color-crimson) 10%, transparent)',
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '0.52rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--color-rose)',
            textDecoration: 'none',
            cursor:        'pointer',
          }}
          whileHover={{
            background: 'color-mix(in srgb, var(--color-crimson) 18%, transparent)',
            boxShadow:  '0 4px 18px rgba(194,42,77,0.22)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: ease.expo }}
        >
          <Mail size={10} strokeWidth={1.5} />
          Let's Connect
        </motion.a>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="md:hidden text-text-muted hover:text-text transition-colors duration-300 shrink-0"
          style={{ background: 'none', border: 'none', cursor: 'pointer', alignItems: 'center', padding: '4px' }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                style={{ display: 'flex' }}
              ><X size={18} /></motion.span>
            ) : (
              <motion.span key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                style={{ display: 'flex' }}
              ><Menu size={18} /></motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* ── Mobile dropdown ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0,  scaleY: 1   }}
            exit={{    opacity: 0, y: -8, scaleY: 0.94 }}
            style={{ transformOrigin: 'top center' }}
            transition={{ duration: 0.28, ease: ease.expo }}
          >
            <nav style={{
              marginTop: '8px', borderRadius: '16px',
              background: MENU_BG,
              backdropFilter: 'blur(28px) saturate(160%)',
              WebkitBackdropFilter: 'blur(28px) saturate(160%)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--glow-sm), 0 20px 50px rgba(5,2,7,0.85)',
              overflow: 'hidden',
            }}>
              {LINKS.map(({ label, href }, i) => {
                const isActive = active === href.slice(1)
                return (
                  <motion.a
                    key={href} href={href}
                    onClick={(e) => { e.preventDefault(); handleNav(href) }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.28, ease: ease.expo }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '15px 22px',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem',
                      letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
                      color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      borderBottom: i < LINKS.length - 1 ? '1px solid var(--border-dim)' : 'none',
                      transition: 'color 0.25s ease, background 0.25s ease',
                    }}
                    whileHover={{ background: 'color-mix(in srgb, var(--color-crimson) 5%, transparent)', color: 'var(--color-text)' }}
                  >
                    {label}
                    {isActive && (
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: 'var(--color-rose)', flexShrink: 0,
                        boxShadow: '0 0 8px 2px color-mix(in srgb, var(--color-rose) 50%, transparent)',
                      }} />
                    )}
                  </motion.a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
