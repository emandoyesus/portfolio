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

/**
 * Paginated projects fetch
 * options: { page, limit, fields, search }
 */
export const getProjects = async ({ page = 1, limit = 12, fields = ['id','title','description','image_url','created_at'], search } = {}) => {
  const offset = (Math.max(1, page) - 1) * limit;
  const cols = fields.join(', ');
  let params = [];
  let idx = 1;
  let where = '';

  if (search && String(search).trim() !== '') {
    where = `WHERE title ILIKE $${idx} OR description ILIKE $${idx + 1}`;
    params.push(`%${search}%`);
    params.push(`%${search}%`);
    idx += 2;
  }

  params.push(limit);
  params.push(offset);

  const limitIdx = idx;
  const offsetIdx = idx + 1;

  const query = `SELECT ${cols} FROM projects ${where} ORDER BY created_at DESC LIMIT $${limitIdx} OFFSET $${offsetIdx}`;
  const result = await pool.query(query, params);
  return result.rows;
};

export const getProjectsCount = async (search) => {
  let params = [];
  let idx = 1;
  let where = '';

  if (search && String(search).trim() !== '') {
    where = `WHERE title ILIKE $${idx} OR description ILIKE $${idx + 1}`;
    params.push(`%${search}%`);
    params.push(`%${search}%`);
  }

  const query = `SELECT COUNT(*)::int AS total FROM projects ${where}`;
  const result = await pool.query(query, params);
  return result.rows[0].total;
};
