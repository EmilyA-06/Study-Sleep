'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'signup') {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })
      if (signUpError) {
        setError(signUpError.message)
      } else {
        setMessage('Check your email to confirm your account.')
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError(signInError.message)
      } else {
        window.location.href = '/dashboard'
      }
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        paddingTop: '10rem',
        paddingBottom: '6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        padding: '10rem 1.5rem 6rem',
      }}
    >
      <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            {mode === 'signin' ? '👋 Welcome back' : '🌙 Join Study Sleep'}
          </div>
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {mode === 'signin'
              ? 'Track your sleep, earn your points.'
              : 'Start logging sleep and earning StudyPoints.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
          </div>

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

          {message && (
            <p
              style={{
                color: 'var(--accent2)',
                fontSize: '0.88rem',
                background: 'rgba(79,195,195,0.08)',
                border: '1px solid rgba(79,195,195,0.2)',
                borderRadius: '8px',
                padding: '0.7rem 1rem',
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.4rem' }}
          >
            {loading
              ? 'Please wait…'
              : mode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        {/* Toggle */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin')
                setError('')
                setMessage('')
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem',
                padding: 0,
              }}
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
