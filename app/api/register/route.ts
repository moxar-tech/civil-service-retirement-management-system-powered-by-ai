// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from "@/lib/zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

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

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nationalId,
      dateOfBirth,
      role,
      password,
    } = validatedFields.data

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 400 }
      )
    }

    // Check if national ID is already registered
    const existingProfile = await prisma.profile.findUnique({
      where: { nationalId },
    })

    if (existingProfile) {
      return NextResponse.json(
        { error: "National ID already registered" },
        { status: 400 }
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        role: role,
        profile: {
          create: {
            firstName,
            lastName,
            nationalId,
            phone: phoneNumber,
            dateOfBirth: new Date(dateOfBirth),
          },
        },
      },
      include: {
        profile: true,
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
