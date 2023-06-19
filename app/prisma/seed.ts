import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
  try {
    const hashedPassword = await hash('Gacon1234@', 10)
    const user = await prisma.user.upsert({
      where: { email: 'nguyendonganh510@gmail.com' },
      update: {},
      create: {
        email: 'nguyendonganh510@gmail.com',
        username: 'admin',
        name: 'admin',
        hashedPassword,
        role: 'Admin'
      }
    })
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main().then(() => prisma.$disconnect())
