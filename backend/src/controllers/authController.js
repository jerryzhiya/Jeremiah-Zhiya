import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
const prisma = new PrismaClient();
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== 'admin') {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret_key_change_me', { expiresIn: '7d' });
    res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});
//# sourceMappingURL=authController.js.map