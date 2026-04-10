'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorksPreview />
      <PointsSystem />
      <PricingSection />
      <SignupSection />
    </>
  )
}

function Hero() {
  return (
    <section style={{
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 4rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ maxWidth: '700px' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <span className="badge">AI-Powered</span>
          <span className="badge">Built for College Students</span>
          <span className="badge" style={{ background: 'rgba(79,195,195,0.1)', borderColor: 'rgba(79,195,195,0.25)', color: 'var(--accent2)' }}>Now Live</span>
          <span className="point-chip">⭐ Earn Sleep Points</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
        }}>
          Sleep smarter.<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Score higher.</span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
          marginBottom: '2.5rem',
          maxWidth: '520px',
        }}>
          Study Sleep is the AI sleep tracker built for student schedules.
          Log your rest, earn rewards, and get personalized guidance that
          actually fits campus life — not a one-size-fits-all plan.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/#signup" className="btn-primary">
            Sign Up Free →
          </a>
          <a href="/how-it-works" className="btn-outline">
            See How It Works
          </a>
        </div>

      </div>

      {/* Floating phone mockup */}
      <div style={{
        position: 'absolute',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '320px',
        display: 'none', // shown via media would require CSS — keeping layout clean
      }} aria-hidden="true" />
    </section>
  )
}

function ValueProps() {
  const features = [
    {
      icon: '💡',
      title: 'AI-Personalized Tips',
      desc: 'After each sleep log, our AI analyzes your patterns and delivers suggestions tailored to your exact schedule and habits.',
    },
    {
      icon: '☀️',
      title: 'Smart Sleep Tracking',
      desc: 'Answer a few quick questions each morning. We track bedtime, wake time, quality, and stress to build your sleep profile.',
    },
    {
      icon: '⭐',
      title: 'Points & Rewards',
      desc: 'Log your sleep, earn StudyPoints. Redeem them for premium AI insights, sleep challenges, and exclusive tips.',
    },
    {
      icon: '🎒',
      title: 'Built for College Life',
      desc: 'Late-night study sessions, early lectures, irregular schedules — we get it. Study Sleep works with your college reality.',
    },
    {
      icon: '📅',
      title: 'Track Your Progress',
      desc: 'Visual dashboards show your weekly sleep trends so you can actually see yourself improving over time.',
    },
    {
      icon: '🔒',
      title: 'Private & Yours',
      desc: 'Your sleep data is personal. We never sell it, never share it. Your rest is your business.',
    },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section">
        <p className="section-label">Why Study Sleep</p>
        <h2 className="section-title">Everything you need to fix your sleep</h2>
        <p className="section-sub" style={{ marginBottom: '3.5rem' }}>
          We combined AI coaching, habit tracking, and a rewards system into one app that makes improving your sleep actually fun.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map(f => (
            <div key={f.title} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HowItWorksPreview() {
  const steps = [
    { n: '01', title: 'Answer a quick quiz', desc: 'Tell us about your sleep goals, schedule, and habits. Takes under 2 minutes.' },
    { n: '02', title: 'Log each night', desc: 'After you wake up, log your sleep in 30 seconds. Rate quality, note disruptions.' },
    { n: '03', title: 'Earn StudyPoints', desc: 'Every log earns you points. Streak bonuses, milestone rewards, and more.' },
    { n: '04', title: 'Unlock AI insights', desc: 'Redeem points for deeper AI analysis and personalized sleep improvement plans.' },
  ]

  return (
    <div className="section">
      <p className="section-label">The Process</p>
      <h2 className="section-title">Four steps to better sleep</h2>
      <p className="section-sub" style={{ marginBottom: '3.5rem' }}>
        No complicated onboarding. No wearables required. Just your phone and two minutes a day.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((s) => (
          <div key={s.n} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '1.75rem 2rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            transition: 'border-color 0.3s',
          }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '2.5rem',
              color: 'rgba(124, 106, 247, 0.2)',
              minWidth: '60px',
            }}>{s.n}</div>
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.3rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2.5rem' }}>
        <a href="/how-it-works" className="btn-outline">See the Full Demo →</a>
      </div>
    </div>
  )
}

function PointsSystem() {
  const tiers = [
    { name: 'Night Owl', pts: '0 – 99 pts', color: '#8890b5', icon: '🦉', perks: 'Daily sleep logging, basic streak tracking' },
    { name: 'Dream Chaser', pts: '100 – 299 pts', color: 'var(--accent2)', icon: '🌙', perks: '+ Weekly pattern analysis, sleep score history' },
    { name: 'Sleep Scholar', pts: '300 – 699 pts', color: 'var(--accent)', icon: '📖', perks: '+ AI personalized tips, custom sleep goals' },
    { name: 'Rest Master', pts: '700+ pts', color: 'var(--accent3)', icon: '👑', perks: '+ Full AI coaching, priority new features' },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section">
        <p className="section-label">Reward System</p>
        <h2 className="section-title">The more you log, the more you unlock</h2>
        <p className="section-sub" style={{ marginBottom: '3.5rem' }}>
          StudyPoints aren't just fun — they unlock real AI-powered insights. Every night you log gets you closer to smarter sleep coaching.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {tiers.map(t => (
            <div key={t.name} className="card" style={{ borderTop: `3px solid ${t.color}` }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t.icon}</div>
              <div style={{ color: t.color, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{t.pts}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.perks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PricingSection() {
  const [email, setEmail] = useState('')
  const [clicked, setClicked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase.from('signups').insert({ email })
    setClicked(true)
  }

  return (
    <div className="section" style={{ textAlign: 'center' }}>
      <p className="section-label" style={{ textAlign: 'center' }}>Pricing</p>
      <h2 className="section-title" style={{ textAlign: 'center' }}>Simple, affordable access</h2>
      <p className="section-sub" style={{ margin: '0 auto 3.5rem', textAlign: 'center' }}>
        One plan. Everything included. Cancel anytime.
      </p>

      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        overflow: 'hidden',
      }}>
        {/* Plan header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', opacity: 0.85 }}>
            Study Sleep Pro
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>$</span>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '5rem', fontWeight: 800, lineHeight: 1 }}>5</span>
            <span style={{ fontSize: '1rem', opacity: 0.8, alignSelf: 'flex-end', marginBottom: '0.75rem' }}>/month</span>
          </div>
          <p style={{ opacity: 0.85, fontSize: '0.9rem', marginTop: '0.5rem' }}>Everything you need to sleep better</p>
        </div>

        {/* Features list */}
        <div style={{ padding: '2rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem', textAlign: 'left' }}>
            {[
              'Daily sleep logging',
              'Full AI-personalized tips',
              'Weekly pattern analysis',
              'StudyPoints & rewards',
              'Custom sleep goals',
              'Priority access to new features',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent2)', fontWeight: 700, fontSize: '1rem' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          {clicked ? (
            <div style={{
              background: 'rgba(124, 106, 247, 0.08)',
              border: '1px solid rgba(124, 106, 247, 0.2)',
              borderRadius: '14px',
              padding: '1.25rem',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.4rem' }}>Coming soon!</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Payments aren't live yet — join the waitlist below to be first in line.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                Get Started for $5/mo
              </button>
            </form>
          )}

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
            No contracts. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

function SignupSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email) return
    setLoading(true)
    await supabase.from('signups').insert({ name, email })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div id="signup" className="section" style={{ textAlign: 'center' }}>
      <p className="section-label" style={{ textAlign: 'center' }}>Get Started</p>
      <h2 className="section-title" style={{ textAlign: 'center' }}>Create your free account</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem' }}>
        Sign up with your college email and get 100 bonus StudyPoints on your first login.
      </p>

      {submitted ? (
        <div style={{
          background: 'rgba(79, 195, 195, 0.08)',
          border: '1px solid rgba(79, 195, 195, 0.3)',
          borderRadius: '20px',
          padding: '3rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌙</div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            Welcome, {name.split(' ')[0]}!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Your account has been created. We sent a confirmation to <strong style={{ color: 'var(--accent2)' }}>{email}</strong>.
          </p>
          <div className="point-chip" style={{ marginTop: '1.5rem', justifyContent: 'center' }}>⭐ +100 StudyPoints Added</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Alex Johnson"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>College Email</label>
            <input
              type="email"
              placeholder="you@psu.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
            {loading ? 'Creating your account...' : 'Create Free Account'}
          </button>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  )
}
