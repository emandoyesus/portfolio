import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { saveMessage } from '../models/messageModel.js';

dotenv.config();
const router = express.Router();

// Helper to get transporter
const getTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 15000, // 15 seconds
        greetingTimeout: 15000,
        socketTimeout: 20000
    });
};

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    try {
        // 1. Save to Database
        try {
            await saveMessage({ name, email, message });
            console.log('✅ Message saved to database.');
        } catch (dbError) {
            console.error('❌ Database Error:', dbError);
            throw new Error(`Database connection failed: ${dbError.message}`);
        }

        // 2. Send Email
        const hasCredentials = process.env.EMAIL_USER &&
            process.env.EMAIL_USER !== 'your-email@gmail.com' &&
            process.env.EMAIL_PASS &&
            process.env.EMAIL_PASS !== 'your-app-password';

        if (hasCredentials) {
            try {
                const transporter = getTransporter();
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    replyTo: email,
                    to: process.env.EMAIL_USER,
                    subject: `New Portfolio Message from ${name}`,
                    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
                });
                console.log('✅ Email sent successfully.');
            } catch (mailError) {
                console.error('❌ Email Error:', mailError);
                // We don't throw here so the user at least knows the DB part worked
                return res.status(200).json({
                    message: 'Message saved to database, but notification email failed.',
                    warning: mailError.message
                });
            }
        }

        res.status(200).json({ message: 'Message received! Thank you.' });
    } catch (error) {
        console.error('General Error:', error);
        res.status(500).json({
            error: 'Server error',
            details: error.message
        });
    }
});

export default router;
