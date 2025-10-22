# Portfolio Clarita

A minimal Vite + React CV and portfolio scaffold.

Features:
- Multi-page with React Router: Home (About + CV) and Portfolio.
- Easy data-driven entries using `src/data/cv.json` and `src/data/projects.json`.
- Deploy to GitHub Pages via `gh-pages`.

Quick start

1. Install

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
```

4. Deploy to GitHub Pages

This project uses `gh-pages` to publish the `dist` folder. To build with the correct base path set the `GH_PAGES` env var and REPO_NAME to your repository name. Example for a repo `username/portfolioClarita`:

```bash
REPO_NAME=portfolioClarita GH_PAGES=1 npm run deploy
```

Notes

- To add a new CV experience or project, edit `src/data/cv.json` or `src/data/projects.json`.
- The `vite.config.js` reads `REPO_NAME` and `GH_PAGES` to set the router base and vite base accordingly. We use `HashRouter` so client-side routing works on GitHub Pages.

Admin UI

An admin page is available at `/admin` (in dev) which stores data in your browser `localStorage`. Use the Export button to copy a JSON snapshot, then paste it into `src/data/*.json` and commit if you want the data to be stored in the repository.

CI Deploy

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included. It builds the site and publishes the `dist` folder to the `gh-pages` branch whenever you push to `main`.
