import './globals.css'

export const metadata = {
  title: 'Study Sleep — AI sleep tracker for students',
  description: 'Study Sleep helps students track sleep, earn rewards, and get AI-backed routines for better rest.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Stars />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.5,
  }))

  return (
    <div className="stars" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--d': `${s.duration}s`,
            '--o': s.opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function NavBar() {
  return (
    <nav>
      <div className="nav-logo">
        <img src="/Logo-1.png" alt="Study Sleep logo" width="34" height="34" />
        Study Sleep
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/how-it-works">How It Works</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/#signup" className="nav-cta">Sign Up Free</a></li>
      </ul>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
        <span style={{ color: 'var(--accent)' }}>.</span>
      </div>
      <div>© 2026 Study Sleep · Built for students everywhere</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="/" style={{ color: 'var(--text-muted)' }}>Home</a>
        <a href="/about" style={{ color: 'var(--text-muted)' }}>About</a>
        <a href="/contact" style={{ color: 'var(--text-muted)' }}>Contact</a>
      </div>
    </footer>
  )
}
