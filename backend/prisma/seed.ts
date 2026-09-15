import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'jerryzhiya574@gmail.com';
  const rawPassword = process.env.ADMIN_PASSWORD || 'SUPERlove1$';

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
      role: 'admin',
    },
  });

  console.log(`✅ Admin account created successfully for: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });