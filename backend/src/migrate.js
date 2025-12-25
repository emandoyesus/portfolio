import pool from './config/db.js';

const createMessagesTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        await pool.query(queryText);
        console.log('Messages table created or already exists.');
        process.exit(0);
    } catch (err) {
        console.error('Error creating messages table:', err);
        process.exit(1);
    }
};

createMessagesTable();
