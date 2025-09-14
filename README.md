# Tube Status App

A React app built with Vite that displays the current status of the London Underground lines.

---

## Features

- Shows all Tube lines and their service statuses.
- Expands to see detailed disruptions.
- Multiple lines can be expanded at once.
- Responsive for mobile, tablet and desktop.
- Configurable API Key via environment variables.

---

## Requirements

- Node.js 18+ (or latest LTS)
- NPM or Yarn

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/zayn94/tfl-test.git
cd <your-repo-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure TFL API credentials**

Create a `.env` file in the project root or copy and rename the `.example.env` file:

```env
VITE_TFL_API_KEY=your-api-key
```

> ⚠️ Do **not** commit your `.env` file.

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for production

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

---

## Notes

- API credentials are configurable via `.env`.
- The app uses React functional components and TypeScript.
- Disruptions are displayed dynamically based on TFL API data.
