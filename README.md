# Portfolio - Emandoyesus Tesfaye
🚀 Full-stack Developer | Building clarity through code 

**Welcome to my personal portfolio!**
This repository showcases my projects, technical skills, and the backend/frontend setup I use to build scalable applications. 
I specialize in React, Node.js, Express, and database integration.

## 🌐 Live Demo
Check out the live portfolio here: https://emando-portfolio.vercel.app

**Repository Structure**
- **Backend**: `backend/` — server source, models, controllers, routes, migration and seed scripts.
- **Frontend**: `frontend/` — Vite + React app with pages, components, and assets.

**Quick Start (Development)**
- **Backend**
  - Install deps:
    - `cd backend`
    - `npm install`
  - Run migrations (if needed):
    - `node src/migrate.js`
  - Seed sample data:
    - `node src/seed.js`
  - Start dev server (auto-restarts with `nodemon`):
    - `npm run dev`
  - Start production-style server:
    - `npm run start`
- **Frontend**
  - Install deps:
    - `cd frontend`
    - `npm install`
  - Start dev server:
    - `npm run dev`
  - Build for production:
    - `npm run build`
  - Preview production build:
    - `npm run preview`

**Scripts (from package.json)**
- **Backend** (`backend/package.json`):
  - `dev`: `nodemon src/server.js`
  - `start`: `node src/server.js`
- **Frontend** (`frontend/package.json`):
  - `dev`: `vite`
  - `build`: `vite build`
  - `lint`: `eslint .`
  - `preview`: `vite preview`

**Environment**
- **Backend**
  - `PORT`: backend port (defaults commonly to `3000`).
  - `DATABASE_URL` or other DB connection envs: configured in `backend/src/config/db.js`.
  - `NODE_ENV`: `development` or `production`.
  - `FRONTEND_URL`: allowed origin for CORS (optional).
- **Frontend**
  - Use `VITE_`-prefixed environment variables for values exposed to client code.

**API**
- **Base**: API endpoints are mounted under `/api`.
- **Projects**
  - `GET /api/projects` — list all projects (cached in memory for 15 minutes).
  - `GET /api/projects/:id` — get a single project by ID.
  - `POST /api/projects` — create a new project (requires JSON body with at least `title` and `description`).
- **Contact**
  - `POST /api/contact` — submit a contact message (see `backend/src/routes/contact.js` and `backend/src/models/messageModel.js` for payload details).

**Implementation Notes**
- **Projects Cache**: `backend/src/controllers/projectsController.js` implements an in-memory cache for `GET /api/projects` (15-minute TTL). Cache is invalidated when a new project is created.
- **Security & Performance**: `helmet`, `compression`, and `cors` are used in `backend/src/app.js`.
- **Email**: `nodemailer` is included as a dependency — used by the contact/message handling (check `backend/src/routes/contact.js`).

**Database**
- The project uses `pg` (Postgres). Ensure your Postgres server is running and that the connection string is set in environment variables used by `backend/src/config/db.js`.
- Run `node src/migrate.js` and `node src/seed.js` to create tables and populate sample data if those scripts are present.

**Linting & Tests**
- **Linting**: Frontend includes an ESLint setup (`eslint.config.js`). Use `npm run lint` in `frontend`.
- **Tests**: No test suite is included by default; consider adding tests under `backend/test/` and `frontend/test/`.

**Deployment Tips**
- Replace the in-memory cache with Redis (or another external cache) for multi-instance deployments.
- Serve the frontend `dist/` statically (Netlify, Vercel, CDN) or have the backend serve static files.
- Use a process manager like `pm2` or a container orchestrator for production backend processes.
- Secure env vars and use HTTPS in production.

**Troubleshooting**
- Port occupied: change `PORT` or free the port.
- DB errors: verify `DATABASE_URL` and that Postgres is accessible.
- CORS issues: set `FRONTEND_URL` to your frontend origin (no trailing slash).

**Useful Files**
- Backend entry: `backend/src/server.js`
- Backend app: `backend/src/app.js`
- DB config: `backend/src/config/db.js`
- Projects controller: `backend/src/controllers/projectsController.js`
- Projects routes: `backend/src/routes/projects.js`
- Contact routes: `backend/src/routes/contact.js`
- Frontend entry: `frontend/src/main.jsx`
- Frontend components/pages: `frontend/src/components/` and `frontend/src/pages/`

**Contributing**
- Fork → branch → PR.
- Keep changes focused, add tests when possible, and follow existing code style.

