import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { EmailProvider } from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/app/libs/prismadb'
import { signIn } from 'next-auth/react'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.username },
              { email: credentials.username }
            ]
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }
        return user
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  debug: false, //process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const newUser = await prisma.user.upsert({
          where: {
            email: profile?.email
          },
          update: {},
          create: {
            name: user?.name,
            username: user.email,
            email: user?.email,
            emailVerified: null,
            image: user?.image
          }
        })
        const newAccount = await prisma.account.findFirst({
          where: {
            providerAccountId: account?.providerAccountId,
            provider: 'google'
          }
        })
        if (!newAccount) {
          await prisma.account.create({
            data: {
              type: 'oauth',
              userId: newUser?.id as string,
              provider: 'google',
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token
            }
          })
        }
      }
      return true
    },
    async jwt({ token, user, account, session, profile, trigger }) {
      if (user) {
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.username = token.username as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  events: {}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
