import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const rawPassword = process.env.ADMIN_PASSWORD;

  // Strict check: Fail early if environment variables are missing
  if (!adminEmail || !rawPassword) {
    throw new Error(
      '❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables (.env).'
    );
  }

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('⚡ Admin user already exists.');
    return;
  }

  // Hash password with bcrypt
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(rawPassword, salt);

  await prisma.user.create({
    data: {
      name: 'Jeremiah Zhiya',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN', // Set uppercase to match updated auth middleware/controller
    },
  });

  console.log(`✅ Admin account created successfully for: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e.message || e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });