import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import projectsRoute from './routes/projects.js';
import contactRoute from './routes/contact.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Security: Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());

// Performance: Gzip compression for smaller response payloads
app.use(compression());

// Clean the frontend URL (remove trailing slash) to avoid CORS issues
const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : true;

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/projects', projectsRoute);
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
