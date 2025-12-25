import express from 'express';
import cors from 'cors';
import projectsRoute from './routes/projects.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

app.use('/api/projects', projectsRoute);

app.use(errorHandler);

export default app;
