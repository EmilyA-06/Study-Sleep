'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

// ── Tip generation ────────────────────────────────────────────────────────────
function generateTip(log) {
  let tip = ''

  if (log.sleep_hours < 6) {
    tip =
      "You got under 6 hours — try going to bed 30 minutes earlier tonight. Even small shifts add up over a week."
  } else if (log.sleep_hours < 7) {
    tip =
      "You're close to the recommended 7 hours. Try cutting one late-night activity to hit that target."
  } else if (log.sleep_hours < 9) {
    tip =
      "Solid night. Keep your bedtime consistent within 30 minutes to lock in this rhythm."
  } else {
    tip =
      "Sleeping over 9 hours can actually leave you feeling groggy. Try setting an alarm to keep a consistent wake time."
  }

  if (log.disruption === 'Stress / anxiety') {
    tip +=
      " Also — high stress nights hurt sleep quality most. Even 5 minutes of deep breathing before bed can help."
  } else if (log.disruption === 'Phone / screens') {
    tip +=
      " Screens before bed delay your melatonin by up to 2 hours. Try putting your phone across the room at night."
  } else if (log.disruption === 'Noise / roommate') {
    tip +=
      " Noise disruptions are tough in dorms. A white noise app or earplugs can make a real difference."
  }

  return tip
}

// ── Points calculation ────────────────────────────────────────────────────────
function calcPoints(logs) {
  return logs.reduce((total, log) => {
    let pts = 10
    if (log.sleep_hours >= 7) pts += 5
    if (log.quality === 'Amazing' || log.quality === 'Good') pts += 5
    return total + pts
  }, 0)
}

// ── Streak calculation ────────────────────────────────────────────────────────
function calcStreak(logs) {
  if (!logs.length) return 0

  // Collect unique calendar dates (YYYY-MM-DD) from most recent to oldest
  const dates = [
    ...new Set(
      logs.map((l) => new Date(l.created_at).toISOString().slice(0, 10))
    ),
  ].sort((a, b) => (a > b ? -1 : 1)) // descending

  let streak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diffDays = (prev - curr) / (1000 * 60 * 60 * 24)
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  // Only count streak if the most recent log is today or yesterday
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
  if (dates[0] !== today && dates[0] !== yesterday) return 0

  return streak
}

// ── Quality badge colours ─────────────────────────────────────────────────────
function qualityStyle(quality) {
  const map = {
    Amazing: { color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' },
    Good: { color: 'var(--accent2)', bg: 'rgba(79,195,195,0.1)', border: 'rgba(79,195,195,0.25)' },
    Meh: { color: 'var(--accent3)', bg: 'rgba(245,166,35,0.1)', border: 'rgba(245,166,35,0.25)' },
    Terrible: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' },
  }
  return map[quality] || map['Meh']
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }
      setUser(user)

      const { data: sleepLogs } = await supabase
        .from('sleep_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setLogs(sleepLogs || [])
      setLoading(false)
    }
    init()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
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
        <p style={{ color: 'var(--text-muted)' }}>Loading your dashboard…</p>
      </div>
    )
  }

  const name = user?.user_metadata?.name || 'there'
  const points = calcPoints(logs)
  const streak = calcStreak(logs)

  return (
    <div className="section" style={{ paddingTop: '8rem' }}>
      {/* ── Top bar ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        <div>
          <p className="section-label">Dashboard</p>
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
            }}
          >
            Hey, {name} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {logs.length === 0
              ? "You haven't logged any sleep yet. Start below!"
              : `You've logged ${logs.length} night${logs.length !== 1 ? 's' : ''} of sleep.`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/log" className="btn-primary">
            Log Today's Sleep
          </a>
          <button className="btn-outline" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.2rem',
          marginBottom: '3rem',
        }}
      >
        {/* StudyPoints */}
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
            StudyPoints
          </p>
          <p
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--accent3)',
              lineHeight: 1,
              marginBottom: '0.4rem',
            }}
          >
            {points}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>pts earned</p>
        </div>

        {/* Streak */}
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
            Current Streak
          </p>
          <p
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--accent)',
              lineHeight: 1,
              marginBottom: '0.4rem',
            }}
          >
            {streak}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>day{streak !== 1 ? 's' : ''} in a row</p>
        </div>

        {/* Nights logged */}
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
            Nights Logged
          </p>
          <p
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--accent2)',
              lineHeight: 1,
              marginBottom: '0.4rem',
            }}
          >
            {logs.length}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>total entries</p>
        </div>
      </div>

      {/* ── Sleep log list ── */}
      {logs.length === 0 ? (
        <div
          className="card"
          style={{ textAlign: 'center', padding: '4rem 2rem' }}
        >
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌙</p>
          <h3 style={{ fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>
            No sleep logs yet
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Log your first night of sleep to start earning StudyPoints.
          </p>
          <a href="/log" className="btn-primary">
            Log Tonight's Sleep
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            Sleep History
          </h2>
          {logs.map((log) => {
            const qs = qualityStyle(log.quality)
            const tip = generateTip(log)
            const logPts = 10 + (log.sleep_hours >= 7 ? 5 : 0) + (log.quality === 'Amazing' || log.quality === 'Good' ? 5 : 0)
            const dateStr = new Date(log.created_at).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })

            return (
              <div key={log.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {/* Row 1: date + points */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    {dateStr}
                  </p>
                  <span className="point-chip">+{logPts} pts</span>
                </div>

                {/* Row 2: stats chips */}
                <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* Hours */}
                  <span
                    style={{
                      fontSize: '0.82rem',
                      background: 'rgba(124,106,247,0.1)',
                      border: '1px solid rgba(124,106,247,0.2)',
                      color: 'var(--accent)',
                      borderRadius: '50px',
                      padding: '0.25rem 0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {log.sleep_hours}h slept
                  </span>

                  {/* Quality */}
                  <span
                    style={{
                      fontSize: '0.82rem',
                      background: qs.bg,
                      border: `1px solid ${qs.border}`,
                      color: qs.color,
                      borderRadius: '50px',
                      padding: '0.25rem 0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {log.quality}
                  </span>

                  {/* Bedtime */}
                  <span
                    style={{
                      fontSize: '0.82rem',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      borderRadius: '50px',
                      padding: '0.25rem 0.8rem',
                    }}
                  >
                    Bed: {log.bedtime}
                  </span>

                  {/* Disruption */}
                  {log.disruption && log.disruption !== 'None' && (
                    <span
                      style={{
                        fontSize: '0.82rem',
                        background: 'rgba(245,166,35,0.08)',
                        border: '1px solid rgba(245,166,35,0.2)',
                        color: 'var(--accent3)',
                        borderRadius: '50px',
                        padding: '0.25rem 0.8rem',
                      }}
                    >
                      {log.disruption}
                    </span>
                  )}
                </div>

                {/* Row 3: tip */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    borderLeft: '2px solid var(--accent)',
                    paddingLeft: '0.8rem',
                  }}
                >
                  {tip}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
