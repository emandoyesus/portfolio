import express from 'express';
import cors from 'cors';
import projectsRoute from './routes/projects.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Clean the frontend URL (remove trailing slash) to avoid CORS issues
const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : true;

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

import contactRoute from './routes/contact.js';

app.use('/api/projects', projectsRoute);
app.use('/api/contact', contactRoute);

app.use(errorHandler);

export default app;
