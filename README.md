# Fresh Local Niagara

A local food directory for 45 purveyors across the Niagara Region, Ontario. Browse farm stands, cheese makers, butchers, bakeries, orchards, maple & honey producers, specialty food shops, and farmers' markets.

## Features

- **45 local purveyors** with full details, ratings, and contact info
- **Category & area filtering** — browse by food type and Niagara sub-region
- **Real-time search** across names, descriptions, tags, and addresses
- **Sort by** featured, rating, reviews, name, or distance
- **Find Near Me** — uses browser geolocation to show distances and sort by proximity
- **Detail modals** with full info, Google Maps directions, and user reviews
- **User reviews** stored in localStorage
- **Responsive design** — mobile-first, works on all screen sizes

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

1. Push to a GitHub repository
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no extra configuration needed
4. The included `vercel.json` handles SPA client-side routing

No environment variables are required.

## Project Structure

```
src/
├── components/      # UI components (Header, Footer, Hero, Card, Modal, Filters)
├── data/            # Purveyor data and category/city definitions
├── hooks/           # Custom hooks (useGeolocation)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (distance calculation, localStorage)
├── App.tsx          # Main app with filtering/sorting logic
├── main.tsx         # Entry point with router setup
└── index.css        # Tailwind directives and custom styles
```
