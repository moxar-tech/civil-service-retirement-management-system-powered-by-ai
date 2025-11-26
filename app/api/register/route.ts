import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/zod"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the input data using Zod schema
    const validatedFields = registerSchema.safeParse(body)

    if (!validatedFields.success) {
      const errorMessage =
        validatedFields.error.issues[0]?.message || "Invalid input data"
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }
    const { firstName, lastName, email, phoneNumber, password } =
      validatedFields.data

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, ...(phoneNumber ? [{ phoneNumber }] : [])],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 400 }
      )
    }

    // Hash the password (important for security!)
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with all the fields

    const user = await prisma.user.create({
      data: {
        email,
        phoneNumber: phoneNumber || null,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        // Add any other fields you need
        role: "user", // Default role
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
