import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  const email = 'diby_eric@yahoo.fr'
  const password = 'Azer102385@@'
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name: 'Eric Diby',
      role: 'SUPERADMIN',
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Eric Diby',
      role: 'SUPERADMIN',
    },
  })

  console.log('Admin user created/updated:', user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
