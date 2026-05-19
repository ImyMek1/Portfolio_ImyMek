import { profile } from '@data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-crimson/10 px-8 lg:px-16 py-10">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span
          className="font-mono uppercase tracking-[0.2em] text-text-muted/50"
          style={{ fontSize: '0.6rem' }}
        >
          © {new Date().getFullYear()} · {profile.name}
        </span>

        <span
          className="font-mono uppercase tracking-[0.22em] text-text-faint/65"
          style={{ fontSize: '0.55rem' }}
        >
          Foundation v0
        </span>
      </div>
    </footer>
  )
}
