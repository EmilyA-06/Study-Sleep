'use client'
import { useState } from 'react'

export default function HowItWorksPage() {
  return (
    <>
      <HowHero />
      <InteractiveDemo />
      <AISection />
      <CTASection />
    </>
  )
}

function HowHero() {
  return (
    <div className="section" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
      <p className="section-label">How It Works</p>
      <h1 className="section-title">From log to insight<br />in 30 seconds</h1>
      <p className="section-sub">
        Study Sleep is designed to take as little time as possible — so you can
        spend less time tracking and more time actually sleeping.
      </p>
    </div>
  )
}

function InteractiveDemo() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      id: 'bedtime',
      q: 'What time did you go to bed?',
      icon: '🛏️',
      options: ['Before 10pm', '10pm – midnight', 'Midnight – 2am', 'After 2am'],
    },
    {
      id: 'waketime',
      q: 'What time did you wake up?',
      icon: '⏰',
      options: ['Before 7am', '7am – 9am', '9am – 11am', 'After 11am'],
    },
    {
      id: 'quality',
      q: 'How would you rate your sleep quality?',
      icon: '💤',
      options: ['😴 Amazing', '😌 Pretty good', '😐 Meh', '😩 Terrible'],
    },
    {
      id: 'disruptions',
      q: 'Did anything disrupt your sleep?',
      icon: '🔊',
      options: ['Nope, slept through', 'Noise / roommate', 'Phone / screens', 'Stress / anxiety'],
    },
  ]

  const handleAnswer = (val) => {
    const q = questions[step]
    setAnswers(prev => ({ ...prev, [q.id]: val }))
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const getInsight = () => {
    const q = answers.quality || ''
    if (q.includes('Amazing')) return { msg: "Great night! Your consistency is paying off. Keep the same bedtime this week.", pts: 50, badge: '🏆' }
    if (q.includes('Pretty good')) return { msg: "Solid sleep! Try cutting screen time 30 min before bed to push toward Amazing.", pts: 40, badge: '⭐' }
    if (q.includes('Meh')) return { msg: "Room to improve. Your late bedtime is cutting into your deep sleep cycles.", pts: 30, badge: '💫' }
    return { msg: "Rough night — it happens. Try a consistent wake time tomorrow even if tired. It resets your rhythm.", pts: 25, badge: '🌱' }
  }

  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section">
        <p className="section-label">Interactive Demo</p>
        <h2 className="section-title">Try logging a night</h2>
        <p className="section-sub" style={{ marginBottom: '3rem' }}>
          This is what the morning check-in feels like. Takes about 30 seconds.
          <br /><em style={{ fontSize: '0.85rem', color: 'rgba(136,144,181,0.6)' }}>(Demo only — AI suggestions unlock in the full app)</em>
        </p>

        <div style={{
          maxWidth: '560px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          overflow: 'hidden',
        }}>
          {/* Phone header */}
          <div style={{
            background: 'var(--surface2)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>🌙 Study Sleep</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Morning Check-in</span>
          </div>

          <div style={{ padding: '2rem' }}>
            {!showResult ? (
              <>
                {/* Progress */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem' }}>
                  {questions.map((_, i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: '3px',
                      borderRadius: '2px',
                      background: i <= step ? 'var(--accent)' : 'var(--surface2)',
                      transition: 'background 0.3s',
                    }} />
                  ))}
                </div>

                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{questions[step].icon}</div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.3,
                }}>
                  {questions[step].q}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {questions[step].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '0.85rem 1.25rem',
                        color: 'var(--text)',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.background = 'rgba(124,106,247,0.08)'
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.background = 'var(--surface)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1.25rem', textAlign: 'center' }}>
                  Question {step + 1} of {questions.length}
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{getInsight().badge}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                  Sleep logged!
                </h3>
                <div className="point-chip" style={{ justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  ⭐ +{getInsight().pts} StudyPoints earned
                </div>
                <div style={{
                  background: 'rgba(124,106,247,0.08)',
                  border: '1px solid rgba(124,106,247,0.2)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>💡 AI INSIGHT (PREVIEW)</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {getInsight().msg}
                  </p>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Full AI coaching unlocks at 100 StudyPoints 🌙
                </p>
                <button className="btn-outline" onClick={reset} style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}>
                  Try again ↺
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function AISection() {
  const features = [
    {
      icon: '🔍',
      title: 'Pattern Detection',
      desc: 'The AI identifies your personal sleep patterns — whether you sleep better after exercise, on less-stressful days, or in certain environments.',
    },
    {
      icon: '🗓️',
      title: 'Schedule-Aware',
      desc: 'It factors in your class schedule and exam weeks to give recommendations that actually fit your calendar.',
    },
    {
      icon: '🎯',
      title: 'Goal-Oriented',
      desc: 'Set a sleep goal (more energy, better focus, falling asleep faster) and the AI works backward to create your custom plan.',
    },
    {
      icon: '📊',
      title: 'Improves Over Time',
      desc: 'The more you log, the smarter it gets. After 2 weeks, suggestions are highly personalized to your unique sleep biology.',
    },
  ]

  return (
    <div className="section">
      <p className="section-label">AI Engine</p>
      <h2 className="section-title">What the AI actually does</h2>
      <p className="section-sub" style={{ marginBottom: '3.5rem' }}>
        This isn't a generic tips generator. Our AI reads your specific logs and builds a model of your sleep over time.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {features.map(f => (
          <div key={f.title} className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CTASection() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="section" style={{ textAlign: 'center', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Ready to sleep smarter?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          Join hundreds of students already on the waitlist.
        </p>
        <a href="/#signup" className="btn-primary">Sign Up Free →</a>
      </div>
    </div>
  )
}
