/* ─────────────────────────────────────────────────────────────
   profile.js — core identity, biography, stats, social links
───────────────────────────────────────────────────────────── */

export const profile = {
  name:      'Imane Maftah El Kheir',
  firstName: 'Imane',
  lastName:  'Maftah El Kheir',
  initials:  'IMY',
  location:  'Morocco',
  email:     'imane.maftah19@gmail.com',
  year:      2026,

  /* Headline & rotator */
  tagline:   'Creative developer & filmmaker',
  roles: [
    'IT Engineer',
    'Photographer',
    'Filmmaker',
    'Creative Technologist',
  ],

  /* Hero / About copy */
  intro:
    'Engineering robust systems by day, capturing light by night. I bridge ' +
    'technical precision with visual storytelling — bringing full-stack ' +
    'thinking to every creative pursuit.',

  bio:
    'A creative developer based in Morocco working at the intersection of ' +
    'code, photography, and film. I build cinematic interfaces, design ' +
    'resilient systems, and document the world one frame at a time.',

  /* Quick numbers for the hero stats row */
  stats: [
    { value: '4+',  label: 'Years' },
    { value: '20+', label: 'Projects' },
    { value: '3',   label: 'Disciplines' },
  ],

  /* Availability pill */
  availability: {
    open:  true,
    label: 'Available · Morocco',
  },

  /* Social — icons resolved via lucide-react or react-icons in components */
  socials: [
    { label: 'LinkedIn', href: '#',                                 icon: 'linkedin' },
    { label: 'GitHub',   href: '#',                                 icon: 'github'   },
    { label: 'Behance',  href: '#',                                 icon: 'behance'  },
    { label: 'Email',    href: 'mailto:imane.maftah19@gmail.com',   icon: 'mail'     },
  ],
}
