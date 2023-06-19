import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/app/libs/prismadb'

export const getSession = async () => {
  return getServerSession(authOptions)
}

const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.username && !session?.user?.email) {
      return null
    }
    
    const currentUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: session?.user?.username as string
          },
          {
            email: session?.user?.email as string
          }
        ]
      }
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    }
  } catch (error) {
    return null
  }
}

export default getCurrentUser
