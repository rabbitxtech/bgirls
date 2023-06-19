import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { AdapterUser } from "next-auth/adapters"
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user?: {
      username: string
      role?: string
    } & DefaultSession['user']
  }
  interface User extends DefaultUser {
    username?: string | null
    role?: string | null
  } 
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      username: string
      role?: string
    }
  }
}
