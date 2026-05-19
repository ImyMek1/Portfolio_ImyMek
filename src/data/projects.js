/* ─────────────────────────────────────────────────────────────
   projects.js — engineering / IT portfolio items
───────────────────────────────────────────────────────────── */

export const projects = [
  {
    id:          '01',
    title:       'Project Alpha',
    category:    'Full-Stack Web',
    year:        '2024',
    status:      'Live',
    featured:    true,
    description:
      'Full-stack web application with real-time data processing, live ' +
      'collaboration, and a cinematic UI built for scale.',
    stack:       ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    cover:       null,                 /* import('@assets/images/project-01.jpg') */
    repo:        null,
    live:        null,
  },
  {
    id:          '02',
    title:       'Project Beta',
    category:    'Machine Learning',
    year:        '2023',
    status:      'Production',
    featured:    false,
    description:
      'ML pipeline for visual pattern recognition at scale — trained on ' +
      '500k images, deployed to production with 94% accuracy.',
    stack:       ['Python', 'TensorFlow', 'Docker', 'FastAPI'],
    cover:       null,
    repo:        null,
    live:        null,
  },
  {
    id:          '03',
    title:       'Project Gamma',
    category:    'Infrastructure',
    year:        '2023',
    status:      'Open Source',
    featured:    false,
    description:
      'CLI toolchain for automated cloud infrastructure provisioning. ' +
      'Reduced deployment time from 40 min to under 3 min.',
    stack:       ['Go', 'Terraform', 'AWS', 'CI/CD'],
    cover:       null,
    repo:        null,
    live:        null,
  },
]
