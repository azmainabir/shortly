# 🔗 Shortly — Modern URL Shortener with Analytics

![Shortly Preview](https://shortly-gilt-eight.vercel.app/og.png)

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Supabase](https://img.shields.io/badge/Supabase-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![License](https://img.shields.io/badge/license-MIT-green)

> A blazingly fast URL shortener with real-time analytics, custom short codes, QR code generation, and geolocation tracking.

🚀 **[Live Demo](https://shortly-gilt-eight.vercel.app)** | 👨‍💻 **[GitHub](https://github.com/azmainabir/shortly)**

---

## ✨ Features

- 🔗 Instantly shorten any long URL
- 📊 Track every click with detailed analytics
- 📱 Device & browser detection
- 🌍 Geolocation tracking (country, city)
- 📲 QR code generation for every link
- ⚡ Fast redirects with database caching
- 🌙 Beautiful dark mode UI
- 🚀 Deployed on Vercel with CI/CD

## 🛠️ Tech Stack

| Layer              | Technology                           |
| ------------------ | ------------------------------------ |
| Frontend           | Next.js 15, TypeScript, Tailwind CSS |
| Backend            | Next.js API Routes                   |
| Database           | PostgreSQL (Supabase)                |
| Deployment         | Vercel                               |
| Auth (coming soon) | NextAuth.js                          |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/azmainabir/shortly.git
cd shortly
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
