import express, { Router } from 'express';
import { Resend } from 'resend';

const router: Router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Initialize Resend inside the route handler
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.EMAIL_USER || 'your-email@gmail.com'],
      replyTo: email,
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

    return res.status(200).json({ success: true, message: 'Message sent!', data });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
});

export default router;