// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"
import { UserRole } from "@prisma/client" // Import the enum type from your generated Prisma client

/**
 * Define the exact types for custom fields that match your Prisma User model.
 * Note: You must run `npx prisma generate` for @prisma/client to recognize the UserRole enum.
 */

declare module "next-auth" {
  /**
   * Extends the Session type to include custom fields.
   */
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: UserRole // Using the Prisma enum type
      phoneNumber?: string | null
    } & DefaultSession["user"]
  }

  /**
   * Extends the User type (passed from the `authorize` function) to include custom fields.
   */
  interface User extends DefaultUser {
    role: UserRole // Using the Prisma enum type
    phoneNumber?: string | null
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the JWT type (stored in the token) to include custom fields.
   */
  interface JWT extends DefaultJWT {
    role: UserRole // Using the Prisma enum type
    phoneNumber?: string | null
  }
}
