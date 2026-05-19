/*
  Reusable radial spotlight glow — placed behind important content
  to create depth and draw focus. Purely presentational; no animation.

  Usage:
    <SpotlightGlow className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    <SpotlightGlow color="var(--color-violet)" size="800px" intensity={14} />

  Positioning is fully controlled by the parent via className / style.
  pointer-events: none so it never blocks clicks.
*/
export default function SpotlightGlow({
  color     = 'var(--color-crimson)',
  size      = '700px',
  intensity = 16,
  blur      = 80,
  className = '',
  style     = {},
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        width:         size,
        height:        size,
        borderRadius:  '50%',
        background:    `radial-gradient(circle at center,
          color-mix(in srgb, ${color} ${intensity}%, transparent) 0%,
          color-mix(in srgb, ${color} ${Math.round(intensity * 0.3)}%, transparent) 40%,
          transparent 70%)`,
        filter:        `blur(${blur}px)`,
        pointerEvents: 'none',
        flexShrink:    0,
        ...style,
      }}
    />
  )
}
