# 🎵 Spotify Web Player Clone (Modern React + Web Audio DSP)

A modern, high-fidelity Spotify Web Player clone built with React 18, Vite, Framer Motion, and Web Audio API.

## ✨ Features

- 🧠 **Smart Mood-Based Autoplay & Chaining**: Plays songs matching your exact emotional vibe (Sad ➡️ Sad, Viral ➡️ Viral, Romantic ➡️ Romantic).
- 🔥 **Instagram Reels Hits & 2 AM Sad Shelves**: Curated shelves with badge chips (`🔥 Reels Trending`, `🌙 2 AM Sad Reel`).
- 🎛️ **1-Tap Mood Filter Pills**: Instant switching between `All`, `🌙 2 AM Sad Reels`, `🔥 Instagram Viral`, `💖 Romantic`, `☕ Cozy Lo-Fi`, `🎸 Indie & Acoustic`.
- ⚡ **Dynamic Live Trends Sync Engine**: Auto-syncs latest trending songs from JioSaavn Live Charts API in the background.
- 🎧 **Studio Peace Sound & Vocal Clarity (Web Audio API)**:
  - 🎙️ Vocal Clarity Peaking Filter (2.8 kHz +1.6 dB) for crisp voice presence.
  - ☕ Warm Acoustic Bass Low-Shelf (110 Hz +1.2 dB).
  - 👂 Anti-Ear-Fatigue High-Shelf (5.2 kHz -1.8 dB) to eliminate ear fatigue.
  - 🎛️ Studio Dynamics Mastering Compressor.
  - 🌊 Smooth 1.5s volume crossfading between songs.
  - 💎 Direct official 320 kbps high-bitrate AAC streams.
- 📝 **Full Custom Playlist System (No Login Needed)**: Create, edit, and organize playlists in-browser with gradient and emoji pickers.
- 🔍 **Live Music Search**: Search across millions of songs via JioSaavn API with instant streaming.
- 📱 **100% Mobile & Desktop Responsive**: Native mobile bottom player, full-screen now playing modal, desktop sidebar, and fluid 60 FPS animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework:** React 18
- **Bundler:** Vite 5
- **Animations:** Framer Motion
- **Audio Engine:** HTML5 Audio + Web Audio API DSP
- **API:** JioSaavn Music API (Trending & Search)

---
Created with ❤️ by rohanwadkar68-byte
