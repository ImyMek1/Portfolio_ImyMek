/*
  Static supplemental grain layer rendered as a React component.

  The global body::before in globals.css already adds an animated grain
  at z-9998. This component provides a *lower* static layer (z-3) that
  can be composed per-section or used as a standalone React-controlled
  alternative when the CSS grain is removed from globals.

  Using soft-light blend mode (vs overlay in globals.css) gives a
  slightly different photographic texture — layering both is intentional.
*/

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function NoiseOverlay({ opacity = 0.032, zIndex = 3 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:        'fixed',
        inset:           '-25%',
        width:           '150%',
        height:          '150%',
        zIndex,
        pointerEvents:   'none',
        opacity,
        backgroundImage: NOISE_SVG,
        backgroundRepeat: 'repeat',
        backgroundSize:  '220px',
        mixBlendMode:    'soft-light',
      }}
    />
  )
}
