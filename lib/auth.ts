import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import bcrypt from "bcryptjs"
import prisma from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        login: {},
        password: {},
      },

      /**
       * The core authentication logic.
       * * 1. Validate the input (Zod).
       * 2. Find the user by email in the database.
       * 3. Verify the submitted password against the stored hash.
       * 4. Return the user object on success.
       */

      authorize: async (credentials) => {
        try {
          // 1. VALIDATION: Parse and validate credentials using Zod

          const validatedCredentials = await signInSchema.parseAsync(
            credentials
          )
          const { login, password } = validatedCredentials

          // 2. FIND USER: Retrieve user data from the database using the email
          const dbUser = await prisma.user.findFirst({
            where: {
              OR: [{ email: login }, { phoneNumber: login }],
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

          return {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
          }
        } catch (error) {
          console.error("Error during authentication:", error)

          throw new Error("Authentication failed.")

          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Recommended for Credentials provider
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/sign-in",
  },
})
