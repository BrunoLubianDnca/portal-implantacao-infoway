# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a modern React/Vite web application for guiding users through the deployment of Infoway's virtualized server.
- The frontend is in `src/` (React, CSS), with key pages in `src/pages/` and reusable components in `src/components/`.
- Backend example code is in `backend/` (Node.js/Express style, not tightly integrated).

## Architecture & Data Flow
- Main entry: `src/main.jsx` loads `App.jsx`.
- Routing and page logic are in `src/pages/` (`Home.jsx`, `ModulePage.jsx`).
- UI is modular: navigation (`Navbar.jsx`), hero section (`Hero.jsx`), step cards (`TrilhoImplantacao.jsx`), support (`Suporte.jsx`), and footer (`Footer.jsx`).
- Module data is managed in `modulosData` (see `ModulePage.jsx`).
- Images for module cards must be placed in `src/assets/images/trilho/` and imported explicitly in `TrilhoImplantacao.jsx`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev` (or use VS Code task "Run Dev Server")
- **Build for production:** `npm run build`
- **Preview build:** `npm run preview`
- **Backend:** Run with `node backend/index.js` (if needed)

## Project-Specific Conventions
- **Images:** Name images as `modulo-1-acesso.jpg`, `modulo-2-config.jpg`, etc. See `src/assets/images/trilho/README.md` and `IMAGENS_CARDS.md` for details.
- **CSS:** Global styles in `src/index.css`, theme in `src/styles/infoway-theme.css`. Edit CSS variables for theming.
- **Module Data:** Update/add modules by editing the `modulosData` object in `ModulePage.jsx`.
- **Component Imports:** Always import images as variables and use them in JSX, not as static URLs.

## Integration Points
- No direct API/backend integration; backend is for example only.
- Vite config in `vite.config.js` (customize build, aliases, etc.).
- Deployment config for Vercel in `vercel.json`.

## Patterns & Examples
- To add a new module card:
  1. Add image to `src/assets/images/trilho/`.
  2. Import image in `TrilhoImplantacao.jsx`.
  3. Update `modulosData` in `ModulePage.jsx`.
- To change theme, edit CSS variables in `src/index.css`.

## References
- See `README.md` for full project structure and setup.
- See `src/assets/images/trilho/README.md` and `IMAGENS_CARDS.md` for image conventions.

---
For unclear or missing conventions, ask the user for clarification before making assumptions.
