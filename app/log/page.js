'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function LogPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [bedtime, setBedtime] = useState('10pm – midnight')
  const [waketime, setWaketime] = useState('7am – 9am')
  const [sleepHours, setSleepHours] = useState('')
  const [quality, setQuality] = useState('Good')
  const [disruption, setDisruption] = useState('None')

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }
      setUser(user)
      setLoading(false)
    }
    checkAuth()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: insertError } = await supabase.from('sleep_logs').insert({
      user_id: user.id,
      bedtime,
      waketime,
      sleep_hours: parseFloat(sleepHours),
      quality,
      disruption,
    })

    if (insertError) {
      setError(insertError.message)
      setSubmitting(false)
      return
    }

    window.location.href = '/dashboard'
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    )
  }

  return (
    <div
      style={{
        paddingTop: '10rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ width: '100%', maxWidth: '560px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>🌙 Sleep Log</div>
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            Log Tonight's Sleep
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Fill in the details and we'll generate personalised tips.
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}
          >
            {/* Bedtime */}
            <div className="form-group">
              <label htmlFor="bedtime">When did you go to bed?</label>
              <select
                id="bedtime"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
              >
                <option>Before 10pm</option>
                <option>10pm – midnight</option>
                <option>Midnight – 2am</option>
                <option>After 2am</option>
              </select>
            </div>

            {/* Wake time */}
            <div className="form-group">
              <label htmlFor="waketime">When did you wake up?</label>
              <select
                id="waketime"
                value={waketime}
                onChange={(e) => setWaketime(e.target.value)}
              >
                <option>Before 7am</option>
                <option>7am – 9am</option>
                <option>9am – 11am</option>
                <option>After 11am</option>
              </select>
            </div>

            {/* Sleep hours */}
            <div className="form-group">
              <label htmlFor="sleep_hours">How many hours did you sleep?</label>
              <input
                id="sleep_hours"
                type="number"
                min="0"
                max="24"
                step="0.5"
                placeholder="e.g. 7.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                required
              />
            </div>

            {/* Quality */}
            <div className="form-group">
              <label htmlFor="quality">How was your sleep quality?</label>
              <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option>Amazing</option>
                <option>Good</option>
                <option>Meh</option>
                <option>Terrible</option>
              </select>
            </div>

            {/* Disruption */}
            <div className="form-group">
              <label htmlFor="disruption">Any sleep disruptions?</label>
              <select
                id="disruption"
                value={disruption}
                onChange={(e) => setDisruption(e.target.value)}
              >
                <option>None</option>
                <option>Noise / roommate</option>
                <option>Phone / screens</option>
                <option>Stress / anxiety</option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <p
                style={{
                  color: '#f87171',
                  fontSize: '0.88rem',
                  background: 'rgba(248,113,113,0.08)',
                  border: '1px solid rgba(248,113,113,0.2)',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                }}
              >
                {error}
              </p>
            )}

            {/* Points preview */}
            {sleepHours !== '' && (
              <div
                style={{
                  background: 'rgba(124,106,247,0.07)',
                  border: '1px solid rgba(124,106,247,0.18)',
                  borderRadius: '10px',
                  padding: '0.8rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>🏆</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  You'll earn{' '}
                  <strong style={{ color: 'var(--accent3)' }}>
                    {10 +
                      (parseFloat(sleepHours) >= 7 ? 5 : 0) +
                      (quality === 'Amazing' || quality === 'Good' ? 5 : 0)}{' '}
                    StudyPoints
                  </strong>{' '}
                  for this log.
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {submitting ? 'Saving…' : 'Save Sleep Log →'}
            </button>

            {/* Back link */}
            <a
              href="/dashboard"
              style={{
                textAlign: 'center',
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                display: 'block',
              }}
            >
              ← Back to Dashboard
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}
