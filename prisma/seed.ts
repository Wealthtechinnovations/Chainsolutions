import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Azer102385@', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'diby_eric@yahoo.fr' },
    update: {},
    create: {
      email: 'diby_eric@yahoo.fr',
      password: hashedPassword,
      name: 'Eric Diby',
      role: 'SUPERADMIN',
    },
  })
  console.log('✅ SuperAdmin créé :', admin.email)
}

main()
  .catch((e) => { console.error('❌', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
