# SnoozeIQ — Sleep Tracker for College Students

A full Next.js website with 4 pages, email capture, interactive demo, and gamified points system.

## Pages
- `/` — Homepage (hero, features, points tiers, waitlist signup)
- `/about` — Founder story, photos, pitch video embed, mission stats
- `/how-it-works` — Interactive sleep logging demo + AI feature breakdown
- `/contact` — Full contact form

---

## Before You Deploy: Personalize These

### 1. Add Your Photos
In `app/about/page.js`, replace the `<PhotoPlaceholder>` components with real `<img>` tags:
```jsx
<img src="/photo1.jpg" alt="Your name" style={{ width: '100%', borderRadius: '16px' }} />
```
Put your images in the `/public` folder, then reference them as `/yourphoto.jpg`.

### 2. Add Your Pitch Video
In `app/about/page.js`, find the video section and replace the placeholder with:
```jsx
<iframe
  width="100%"
  style={{ aspectRatio: '16/9', border: 'none', borderRadius: '16px' }}
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  allowFullScreen
/>
```

### 3. Update Your Name & Details
- In `app/about/page.js`: Replace `[Your Name]` and `[Your Major]`
- In `app/contact/page.js`: Update the email address

### 4. Logo
The current logo is text-based (SnoozeIQ). To add an AI-generated image logo:
- Place your logo file in `/public/logo.png`
- Edit `app/layout.js` NavBar to add `<img src="/logo.png" height="32" alt="SnoozeIQ" />`

---

## Deploy to Vercel (Step by Step)

### Option A: GitHub → Vercel (Recommended)
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project"
4. Import your repo — Vercel auto-detects Next.js
5. Click Deploy — your site will be live at `your-project.vercel.app`

### Option B: Vercel CLI
```bash
npm install -g vercel
cd sleep-tracker
vercel
```
Follow the prompts — done in under 2 minutes.

---

## Local Development
```bash
cd sleep-tracker
npm install
npm run dev
# Open http://localhost:3000
```
