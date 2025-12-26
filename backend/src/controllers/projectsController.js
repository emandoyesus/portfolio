import {
  getAllProjects,
  getProjectById,
  createProject
} from '../models/projectModel.js';

// Optimized in-memory cache
let projectsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes cache

export const fetchProjects = async (req, res, next) => {
  try {
    const now = Date.now();

    // Return cached data if valid
    if (projectsCache && (now - lastFetchTime < CACHE_DURATION)) {
      return res.status(200).json(projectsCache);
    }

    const projects = await getAllProjects();

    // Update cache
    projectsCache = projects;
    lastFetchTime = now;

    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

export const fetchProject = async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project)
      return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const project = await createProject(req.body);

    // Invalidate cache when new content is added
    projectsCache = null;

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};
