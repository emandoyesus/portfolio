import express from 'express';
import dotenv from 'dotenv';
import { saveMessage } from '../models/messageModel.js';

dotenv.config();
const router = express.Router();

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

        // 2. Send Email via Resend API (HTTP bypasses Render blocks)
        const apiKey = process.env.RESEND_API_KEY;

        if (apiKey) {
            try {
                const response = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        from: 'Portfolio <onboarding@resend.dev>', // Resend's default free domain
                        to: process.env.EMAIL_USER, // Your Gmail
                        reply_to: email,
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
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Resend API failed');
                }

                console.log('✅ Email sent successfully via Resend API.');
            } catch (mailError) {
                console.error('❌ Email Error:', mailError);
                return res.status(200).json({
                    message: 'Message saved to database, but notification email failed.',
                    warning: mailError.message
                });
            }
        } else {
            console.warn('⚠️ RESEND_API_KEY not found. Skipping email notification.');
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
