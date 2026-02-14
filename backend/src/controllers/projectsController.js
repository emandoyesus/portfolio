import {
  getAllProjects,
  getProjectById,
  createProject,
  getProjects,
  getProjectsCount
} from '../models/projectModel.js';

// Cache map: key -> { data, meta, ts }
const projectsCache = new Map();
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes cache

export const fetchProjects = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(Math.max(1, parseInt(req.query.limit || '12', 10)), 100);
    const q = req.query.q ? String(req.query.q).trim() : '';

    const cacheKey = `${page}:${limit}:${q}`;
    const cached = projectsCache.get(cacheKey);
    const now = Date.now();
    if (cached && (now - cached.ts < CACHE_DURATION)) {
      return res.status(200).json({ data: cached.data, meta: cached.meta, cached: true });
    }

    const [projects, total] = await Promise.all([
      getProjects({ page, limit, search: q }),
      getProjectsCount(q)
    ]);

    const totalPages = Math.ceil(total / limit) || 1;
    const meta = { page, limit, total, totalPages };

    projectsCache.set(cacheKey, { data: projects, meta, ts: now });

    res.status(200).json({ data: projects, meta });
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
    projectsCache.clear();

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};
