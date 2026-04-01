export const metadata = {
  title: 'About — Study Sleep',
  description: 'Learn about Study Sleep and the student behind it.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderSection />
      <MissionSection />
    </>
  )
}

function AboutHero() {
  return (
    <div className="section" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
      <p className="section-label">My Story</p>
      <h1 className="section-title">Built by a student,<br />for students</h1>
      <p className="section-sub">
        Study Sleep started because I was exhausted — literally. I spent so many semesters
        running on 5 hours a night and wondering why I couldn't focus. No existing
        app understood what being a college student actually felt like. So I built one that does.
      </p>
    </div>
  )
}

function FounderSection() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>

          <div className="founder-gallery">
            <PhotoCard src="/mypicture-1.jpeg" alt="Study Sleep founder photo 1" />
            <PhotoCard src="/mypicture-2.jpeg" alt="Study Sleep founder photo 2" />
            <PhotoCard src="/mypicture-3.jpeg" alt="Study Sleep founder photo 3" />
          </div>

          <div>
            <div className="badge" style={{ marginBottom: '1.5rem' }}>👋 Meet the Founder</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '2rem', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Hi, I'm Emily Azarian
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              I'm a mechanical engineering student at Penn State balancing classes, studying, and sleep. Like most students, my sleep schedule was a disaster. I built Study Sleep
              to help students trade irregular rest for consistent routines without extra stress.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Most sleep apps are built for busy professionals, not for late-night study sessions,
              early lectures, and shared dorm rooms. Study Sleep fits the reality of campus life.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              It combines simple daily logging, AI-backed recommendations, and reward habits to help you study better rested.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge">🎓 Penn State</span>
              <span className="badge">🧠 Focused Student</span>
              <span className="badge">🌙 Reformed Night Owl</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhotoCard({ src, alt }) {
  return (
    <div className="founder-photo">
      <img src={src} alt={alt} />
    </div>
  )
}

function MissionSection() {
  return (
    <div className="section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
        <div>
          <p className="section-label">30-Second Pitch</p>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>Watch the pitch</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            In 30 seconds, here's exactly what Study Sleep does, who it's for, and why it works.
          </p>

          <div className="video-embed">
            <iframe
              src="https://www.youtube.com/embed/F0vABgUpTHg"
              title="Study Sleep 30 second pitch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div>
          <p className="section-label">Our Mission</p>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
            Sleep is a<br />student issue
          </h2>
          {[
            { stat: '60%', desc: 'of college students report poor sleep quality' },
            { stat: '1 in 4', desc: 'students suffer from clinical sleep disorders' },
            { stat: '2.7×', desc: 'more likely to drop a class when sleep-deprived' },
          ].map(s => (
            <div key={s.stat} style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              padding: '1.25rem 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '2rem',
                color: 'var(--accent)',
                minWidth: '80px',
              }}>{s.stat}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{s.desc}</div>
            </div>
          ))}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1.5rem' }}>
            Study Sleep exists to change these numbers — one logged night at a time.
          </p>
        </div>
      </div>
    </div>
  )
}
