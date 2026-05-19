export default function Tag({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'border border-crimson/15 text-text-muted bg-surface-1',
    gold:    'border border-ruby/30 text-ruby bg-ruby/5',
    mono:    'border border-crimson/15 text-text-muted bg-surface-2 font-mono text-xs',
  }

  return (
    <span
      className={`inline-block px-3 py-1 text-xs tracking-widest uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
