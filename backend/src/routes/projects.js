import express from 'express';
import {
  fetchProjects,
  fetchProject,
  addProject
} from '../controllers/projectsController.js';

const router = express.Router();

router.get('/', fetchProjects);
router.get('/:id', fetchProject);
router.post('/', addProject); // later, secure this

export default router;
