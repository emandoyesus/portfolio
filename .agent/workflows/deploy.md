---
description: How to deploy the Portfolio (Frontend & Backend)
---

### 1. **Prepare the Database**
1. Sign up for a free PostgreSQL database at **[Neon.tech](https://neon.tech/)** or **[Supabase](https://supabase.com/)**.
2. Create a new project and copy your **Connection String** (looks like `postgresql://user:pass@host/db`).

### 2. **Deploy the Backend (API)**
1. Sign up for **[Render.com](https://render.com/)**.
2. Click **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following details:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
5. Add **Environment Variables** in the Render settings:
   - `DATABASE_URL` = (Your Neon/Supabase connection string)
   - `EMAIL_USER` = (Your Gmail)
   - `EMAIL_PASS` = (Your Gmail App Password)
   - `FRONTEND_URL` = (Leave blank for now, come back after step 3)
6. Once deployed, copy your **Backend URL** (e.g., `https://my-portfolio-api.onrender.com`).

### 3. **Deploy the Frontend (Website)**
1. Sign up for **[Vercel.com](https://vercel.com/)**.
2. Click **Add New** -> **Project**.
3. Connect your GitHub repository.
4. Set the following details:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
5. Add **Environment Variables** in the Vercel settings:
   - `VITE_API_URL` = (Your Backend URL from Step 2)
6. Click **Deploy**.
7. Once finished, you will get your **Live Website URL** (e.g., `https://my-portfolio.vercel.app`).

### 4. **Final Step: Connect Backend to Frontend**
1. Go back to your **Render (Backend)** settings.
2. Update the `FRONTEND_URL` environment variable with your **Live Website URL** from Vercel.
3. This ensures the contact form works correctly and securely.
