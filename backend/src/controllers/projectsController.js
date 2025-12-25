import {
  getAllProjects,
  getProjectById,
  createProject
} from '../models/projectModel.js';

export const fetchProjects = async (req, res, next) => {
  try {
    const projects = await getAllProjects();
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

// simple "admin" endpoint – later you can protect it with auth
export const addProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};
