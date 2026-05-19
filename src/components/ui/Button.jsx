import { motion } from 'framer-motion'
import { ease } from '@lib/animations'

const VARIANTS = {
  solid: 'bg-crimson text-text hover:opacity-90',
  ghost: 'border border-crimson/25 text-text-muted hover:border-rose/45 hover:text-text',
  gold:  'border border-crimson/45 text-rose hover:bg-crimson hover:text-text',
}

export default function Button({
  children,
  variant   = 'solid',
  href,
  onClick,
  className = '',
  external  = false,
}) {
  const Comp = href ? motion.a : motion.button
  const base =
    'inline-flex items-center gap-3 px-8 py-4 font-body text-sm tracking-widest uppercase ' +
    'transition-colors duration-500 relative overflow-hidden'

  return (
    <Comp
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${base} ${VARIANTS[variant] ?? ''} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease }}
    >
      {children}
    </Comp>
  )
}
