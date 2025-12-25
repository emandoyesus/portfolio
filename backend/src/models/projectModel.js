import pool from '../config/db.js';

export const getAllProjects = async () => {
  const result = await pool.query(
    'SELECT * FROM projects ORDER BY created_at DESC'
  );
  return result.rows;
};

export const getProjectById = async (id) => {
  const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProject = async (data) => {
  const { title, description, tech_stack, github_url, live_url, image_url } = data;

  const result = await pool.query(
    `INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, tech_stack, github_url, live_url, image_url]
  );

  return result.rows[0];
};
