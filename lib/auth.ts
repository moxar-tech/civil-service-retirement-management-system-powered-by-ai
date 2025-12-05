import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import bcrypt from "bcryptjs"
import prisma from "./prisma"

// Type definitions directly in the file
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: string
      phoneNumber?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    phoneNumber?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    phoneNumber?: string | null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // REMOVED THE ADAPTER - we'll handle sessions manually
  providers: [
    Credentials({
      credentials: {
        login: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const validatedCredentials = await signInSchema.parseAsync(
            credentials
          )
          const { login, password } = validatedCredentials

          const dbUser = await prisma.user.findFirst({
            where: {
              OR: [{ email: login }, { phoneNumber: login }],
            },
            include: {
              profile: true,
            },
          })

          if (!dbUser || !dbUser.password) {
            throw new Error("Invalid email/phone or password.")
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            dbUser.password
          )

          if (!isPasswordValid) {
            throw new Error("Invalid password")
          }

          // Return user object with correct typing
          return {
            id: dbUser.id,
            email: dbUser.email,
            name:
              dbUser.name ||
              `${dbUser.profile?.firstName} ${dbUser.profile?.lastName}`,
            role: dbUser.role,
            phoneNumber: dbUser.phoneNumber,
          }
        } catch (error) {
          console.error("Error during authentication:", error)
          throw new Error("Authentication failed.")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.phoneNumber = user.phoneNumber
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.phoneNumber = token.phoneNumber as string
      }
      return session
    },
  },
  pages: {
    signIn: "/sign-in",
  },
})
