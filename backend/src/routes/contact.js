import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { saveMessage } from '../models/messageModel.js';

dotenv.config();
const router = express.Router();

// Helper to get transporter
const getTransporter = () => {
    // We already checked in the route, but this is the Gmail config
    return nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    try {
        // 1. Save to Database (Always do this first)
        await saveMessage({ name, email, message });
        console.log('Message saved to database.');

        // 2. Check if we should send a real email
        const hasCredentials = process.env.EMAIL_USER &&
            process.env.EMAIL_USER !== 'your-email@gmail.com' &&
            process.env.EMAIL_PASS &&
            process.env.EMAIL_PASS !== 'your-app-password';

        if (hasCredentials) {
            const transporter = getTransporter();

            const mailOptions = {
                from: process.env.EMAIL_USER, // Gmail requires this to be your email
                replyTo: email,              // This allows you to reply to the sender
                to: process.env.EMAIL_USER,    // You are sending it to yourself
                subject: `New Portfolio Message from ${name}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #6d28d9;">New Contact Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <hr />
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully via Gmail.');
        } else {
            console.warn('Real email credentials not set or still placeholders. Message only saved to DB.');
        }

        res.status(200).json({ message: 'Message received! Thank you.' });
    } catch (error) {
        console.error('Email/DB Error:', error);
        res.status(500).json({ error: 'Failed to process message completely.' });
    }
});

export default router;
