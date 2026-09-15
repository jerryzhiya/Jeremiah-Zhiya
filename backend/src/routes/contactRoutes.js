import express, { Router } from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();
router.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // TLS on port 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New Portfolio Contact Message from ${name}`,
            html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #1c2420;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        });
        return res.status(200).json({ success: true, message: 'Message sent!' });
    }
    catch (error) {
        console.error('Nodemailer Error:', error);
        return res.status(500).json({ error: 'Failed to send message.' });
    }
});
export default router;
//# sourceMappingURL=contactRoutes.js.map