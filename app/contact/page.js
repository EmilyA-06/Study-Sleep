'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <>
      <div className="section" style={{ paddingTop: '10rem', paddingBottom: '2rem' }}>
        <p className="section-label">Get in Touch</p>
        <h1 className="section-title">We'd love to hear<br />from you</h1>
        <p className="section-sub">
          Have a question, want to partner with us, or just want to share your sleep horror story?
          Reach out — we read every message.
        </p>
      </div>

      <div className="section" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>
        {/* Left: info */}
        <div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem' }}>Contact Info</h2>

          {[
            { icon: '📧', label: 'Email', value: 'hello@studysleep.ai' },
            { icon: '🐦', label: 'Twitter / X', value: '@studysleep' },
            { icon: '📍', label: 'Location', value: 'Penn State University, PA' },
          ].map(c => (
            <div key={c.label} style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              marginBottom: '1.75rem',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
              }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{c.label}</div>
                <div style={{ fontSize: '0.95rem' }}>{c.value}</div>
              </div>
            </div>
          ))}

          <div style={{
            marginTop: '3rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.5rem' }}>Response time</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              We typically respond within 24–48 hours. For urgent matters, reach out on Twitter/X for a faster reply.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div style={{
              background: 'rgba(79, 195, 195, 0.08)',
              border: '1px solid rgba(79, 195, 195, 0.3)',
              borderRadius: '20px',
              padding: '3rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                Message received!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Thanks {form.name.split(' ')[0]}! We'll get back to you at {form.email} within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Alex Johnson" value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={e => update('subject', e.target.value)} required>
                  <option value="">Select a topic...</option>
                  <option>General Question</option>
                  <option>Partnership / Collaboration</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Press / Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
                {loading ? 'Sending...' : '✉️ Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
