# Lamborghini Huracán | Scrollytelling Hyper-Showcase

An Awwwards-inspired luxury automotive scrollytelling experience for the **Lamborghini Huracán LP 640-4 Performante**. Powered by Next.js 14+ (App Router), Tailwind CSS v4, Framer Motion, and a 4K High-DPI HTML5 Canvas image sequence.

---

## Highlights

- **Master Scroll Architecture**: Synchronized 600vh scroll container locking the viewport until the complete 360° vehicle rotation finishes.
- **High-DPI 4K Canvas**: Crisp rendering scaled with `window.devicePixelRatio` and progressive batch preloading.
- **Sci-Fi HUD Overlay**: Transitions through 3 distinct telemetry phases:
  - **Phase 01 // Hero**: MSRP, acceleration, and peak horsepower overview.
  - **Phase 02 // Design**: Forged Composites® carbon matrix and Aerodinamica Lamborghini Attiva (ALA).
  - **Phase 03 // V10 Engine**: Atmospheric 5.2L naturally aspirated engine benchmarks and transmission specs.
- **Interactive ANIMA Drive Modes**: Real-time switching between STRADA, SPORT, and CORSA calibrations.
- **Bespoke Commission Form**: Client allocation dossier with interactive exterior livery selection.
- **Synthesized Engine Acoustics**: Web Audio API exhaust harmonic feedback.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (`@theme` variables)
- **Animation**: Framer Motion
- **Fonts**: Orbitron & Rajdhani (via `next/font/google`)
- **Icons**: Lucide React

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

---

## Building for Production

```bash
npm run build
npm start
```

---

© Automobili Lamborghini S.p.A. Showcase Tribute.
