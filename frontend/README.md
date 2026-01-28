# Vietnam Map Frontend

Interactive Vietnam map application built with React and Vite, displaying 34 administrative units.

## Features

- Interactive map visualization using Highcharts Maps
- Click on provinces to view details in a modal
- Random data visualization with color-coded provinces
- Responsive design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── MapChart.jsx       # Highcharts map component
│   │   ├── MapChart.css
│   │   ├── ProvinceModal.jsx  # Modal component for province details
│   │   └── ProvinceModal.css
│   ├── data/
│   │   └── vn-all-merged.json # Vietnam map GeoJSON data
│   ├── App.jsx                # Main application component
│   ├── App.css
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- React 18
- Vite
- Highcharts Maps (loaded via CDN)
- GeoJSON for map data

## Notes

- The map data (`vn-all-merged.json`) contains GeoJSON data for Vietnam's 34 administrative units
- Highcharts Maps is loaded from CDN in `index.html` for easier setup
- All original features from the HTML version have been preserved
