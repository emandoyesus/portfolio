import pool from '../config/db.js';

export const saveMessage = async (data) => {
    const { name, email, message } = data;
    const result = await pool.query(
        'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
    );
    return result.rows[0];
};

export const getAllMessages = async () => {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    return result.rows;
};
