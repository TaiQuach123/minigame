# Vietnam Map Frontend

Interactive Vietnam map application built with React and Vite.

## Prerequisites

- Node.js v18.0.0+ or v20.0.0+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`) in your browser.

**One-liner (from project root):**
```bash
cd frontend && npm install && npm run dev
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## Troubleshooting

**Node.js version warning:**
- Upgrade to Node.js v18 LTS or v20 LTS
- Or use nvm: `nvm install 20 && nvm use 20`

**Security vulnerabilities:**
```bash
npm audit fix
```

**Clean install (if issues occur):**
```bash
rm -rf node_modules package-lock.json && npm install
```
