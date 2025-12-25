import pool from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const seedProjects = async () => {
    const projects = [
        {
            title: 'E-Commerce Dashboard',
            description: 'A comprehensive admin dashboard for managing products, orders, and customers. Features include real-time analytics, dark mode, and role-based access control.',
            tech_stack: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Chart.js'],
            github_url: 'https://github.com/emandoyesus/ecommerce-dashboard',
            live_url: 'https://ecommerce-dashboard-demo.com',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000'
        },
        {
            title: 'TaskMaster Pro',
            description: 'Collaborative task management tool similar to Trello. Supports drag-and-drop, team workspaces, and deadline notifications.',
            tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
            github_url: 'https://github.com/emandoyesus/taskmaster',
            live_url: 'https://taskmaster-pro.vercel.app',
            image_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000'
        },
        {
            title: 'AI Image Generator',
            description: 'SaaS application allowing users to generate images from text prompts using OpenAI DALL-E 3 API. Includes credit system and gallery.',
            tech_stack: ['React', 'Express', 'Stripe', 'OpenAI API'],
            github_url: 'https://github.com/emandoyesus/ai-image-gen',
            live_url: 'https://ai-gen-saas.com',
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000'
        }
    ];

    try {
        console.log('Seeding projects...');

        // Optional: Clear existing projects
        // await pool.query('DELETE FROM projects'); 

        for (const project of projects) {
            await pool.query(
                `INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`, // Prevent duplicates if unique constraints exist, or just insert
                [project.title, project.description, project.tech_stack, project.github_url, project.live_url, project.image_url]
            );
        }

        console.log('Projects successfully seeded!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding projects:', err);
        process.exit(1);
    }
};

seedProjects();
