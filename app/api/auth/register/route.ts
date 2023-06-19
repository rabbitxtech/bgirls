import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { registerSchema } from '@/app/libs/validator'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, username, password, repassword } = body

    await registerSchema.validateAsync({
      email: email,
      username: username,
      password: password,
      repassword: repassword
    })

    const hashedPassword = await bcrypt.hash(password, 12)
    let user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.meta?.target) {
        case 'User_username_key':
          error.message = 'Username existed!'
          break
        case 'User_email_key':
          error.message = 'Email existed!'
        default:
          break
      }
    }
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
