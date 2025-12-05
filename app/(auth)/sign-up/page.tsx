// app/sign-up/page.tsx
"use client"

import React, { useState } from "react"
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { registerSchema, type RegisterInput } from "@/lib/zod"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type RoleType = RegisterInput["role"]

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      nationalId: "",
      dateOfBirth: "",
      role: "CIVIL_SERVANT",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    setError("")

    try {
      console.log("Sending registration data:", data)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("Registration response:", result)

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      router.push("/sign-in?message=Registration successful")
    } catch (error) {
      console.error("Registration error:", error)
      // Check if error is an instance of Error before accessing .message
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-uganda-cream via-uganda-silver/10 to-uganda-sunlight/20">
      {/* Desktop Layout - Split Screen */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Retirement Future Visualization */}
        <div className="relative w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-uganda-sky/90 via-uganda-grass/80 to-uganda-sun/70 z-10" />

          {/* Future-focused background visualization */}
          <div className="absolute inset-0">
            {/* Sky section */}
            <div className="h-1/3 bg-gradient-to-r from-uganda-sky via-uganda-sky/90 to-transparent" />

            {/* Horizon section */}
            <div className="h-1/3 bg-gradient-to-r from-uganda-grass via-uganda-grass/90 to-transparent" />

            {/* Ground section */}
            <div className="h-1/3 bg-gradient-to-r from-uganda-earth via-uganda-earth/90 to-transparent" />

            {/* Retirement timeline visualization */}
            <div className="absolute inset-0 opacity-20">
              {/* Timeline dots */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-uganda-yellow/50" />
              <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-uganda-red/50" />
              <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-uganda-black/50" />
              <div className="absolute top-2/3 left-2/3 w-6 h-6 rounded-full bg-uganda-sun/50" />
              <div className="absolute top-3/4 left-3/4 w-4 h-4 rounded-full bg-uganda-grass/50" />

              {/* Connecting lines */}
              <div className="absolute top-1/4 left-1/4 w-1/4 h-0.5 bg-gradient-to-r from-uganda-yellow/30 to-uganda-red/30 transform rotate-30" />
              <div className="absolute top-1/3 left-1/3 w-1/4 h-0.5 bg-gradient-to-r from-uganda-red/30 to-uganda-black/30 transform rotate-45" />
              <div className="absolute top-1/2 left-1/2 w-1/4 h-0.5 bg-gradient-to-r from-uganda-black/30 to-uganda-sun/30 transform rotate-60" />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-20 flex flex-col justify-center h-full p-12 text-white">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-uganda-sky to-uganda-grass flex items-center justify-center">
                  <span className="text-white font-bold text-xl">UR</span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-uganda-sky via-uganda-grass to-uganda-sun bg-clip-text text-transparent">
                  Plan Your Future
                </h1>
              </div>
              <p className="text-2xl font-semibold mb-2">
                Secure Your Retirement Journey
              </p>
              <p className="text-uganda-silver/90 text-lg">
                Join thousands of civil servants managing their retirement with
                confidence
              </p>
            </div>

            {/* Benefits of Registration */}
            <div className="mt-12 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-sky/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-sky" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Smart Projections
                  </h3>
                  <p className="text-uganda-silver/80">
                    AI-powered retirement benefit calculations tailored to your
                    service
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-grass/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-grass" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Real-time Tracking
                  </h3>
                  <p className="text-uganda-silver/80">
                    Monitor your application from submission to payout
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-sun/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-sun" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Document Management
                  </h3>
                  <p className="text-uganda-silver/80">
                    Securely store and manage all your retirement documents
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-red/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Government Backed
                  </h3>
                  <p className="text-uganda-silver/80">
                    Official system recognized by Ministry of Public Service
                  </p>
                </div>
              </div>
            </div>

            {/* Fade effect at the border */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-uganda-sky/90 via-uganda-sky/50 to-transparent" />
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <FormContent
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            error={error}
            loading={isLoading}
          />
        </div>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-gradient-to-r from-uganda-sky via-uganda-grass to-uganda-sun p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <span className="text-white font-bold">UR</span>
              </div>
              <h1 className="text-xl font-bold text-white">Join U-Retire</h1>
            </div>
            <div className="text-white/90 text-sm font-medium">
              Secure Registration
            </div>
          </div>
        </div>

        {/* Mobile Form Content */}
        <div className="flex-1 p-6">
          <FormContent
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            error={error}
            loading={isLoading}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  )
}

// FormContentProps interface with new RHF types and RegisterInput
interface FormContentProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  // Use RegisterInput
  register: UseFormRegister<RegisterInput>
  // Use RegisterInput
  setValue: UseFormSetValue<RegisterInput>
  // Use RegisterInput
  watch: UseFormWatch<RegisterInput>
  // Use RegisterInput
  errors: FieldErrors<RegisterInput>
  error: string
  loading: boolean
  isMobile?: boolean
}

function FormContent({
  onSubmit,
  register,
  setValue,
  watch,
  errors,
  error,
  loading,
  isMobile = false,
}: FormContentProps) {
  const password = watch("password", "")

  return (
    <div
      className={cn(
        "w-full",
        !isMobile &&
          "max-w-lg shadow-2xl rounded-2xl p-8 bg-white/95 backdrop-blur-sm border border-uganda-silver/20"
      )}
    >
      {!isMobile && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-uganda-charcoal mb-2">
            Create Account
          </h2>
          <p className="text-uganda-slate">
            Join the U-Retire system in minutes
          </p>
        </div>
      )}

      {isMobile && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-uganda-charcoal mb-1">
            Register
          </h2>
          <p className="text-uganda-slate text-sm">
            Fill in your details to get started
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        {error && (
          <div className="bg-gradient-to-r from-uganda-red/10 to-uganda-red/5 border border-uganda-red/30 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-uganda-red/20 flex items-center justify-center mr-3">
                <div className="w-3 h-3 rounded-full bg-uganda-red" />
              </div>
              <p className="text-uganda-red font-medium">{error}</p>
            </div>
          </div>
        )}

        <div
          className={cn("gap-4", isMobile ? "space-y-4" : "grid grid-cols-2")}
        >
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-uganda-charcoal font-medium"
            >
              First Name *
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              className={cn(
                "w-full py-3 rounded-lg border-2",
                errors.firstName
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-uganda-red text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-uganda-charcoal font-medium"
            >
              Last Name *
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className={cn(
                "w-full py-3 rounded-lg border-2",
                errors.lastName
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-uganda-red text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-uganda-charcoal font-medium"
          >
            Email Address *
          </Label>
          <div className="relative">
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                errors.email
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("email")}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-sky to-uganda-grass opacity-60" />
            </div>
          </div>
          {errors.email && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="phoneNumber"
            className="text-uganda-charcoal font-medium"
          >
            Phone Number *
          </Label>
          <div className="relative">
            <Input
              id="phoneNumber"
              placeholder="+256712345678"
              type="tel"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                errors.phoneNumber
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("phoneNumber")}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-yellow to-uganda-sun opacity-60" />
            </div>
          </div>
          {errors.phoneNumber && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.phoneNumber.message}
            </p>
          )}
          <p className="text-uganda-gray text-xs mt-1">
            Uganda format: +256712345678, 256712345678, or 0712345678
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="nationalId"
            className="text-uganda-charcoal font-medium"
          >
            National ID *
          </Label>
          <div className="relative">
            <Input
              id="nationalId"
              placeholder="CM123456789012"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                errors.nationalId
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("nationalId")}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-black to-uganda-red opacity-60" />
            </div>
          </div>
          {errors.nationalId && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.nationalId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="dateOfBirth"
            className="text-uganda-charcoal font-medium"
          >
            Date of Birth *
          </Label>
          <div className="relative">
            <Input
              id="dateOfBirth"
              type="date"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                errors.dateOfBirth
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("dateOfBirth")}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-red to-uganda-yellow opacity-60" />
            </div>
          </div>
          {errors.dateOfBirth && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="role"
            className="text-uganda-charcoal font-medium"
          >
            Role *
          </Label>
          {/* FIX: Explicitly cast the value to the correct RoleType */}
          <Select
            onValueChange={(value) => setValue("role", value as RoleType)}
          >
            <SelectTrigger
              className={cn(
                "w-full py-3 rounded-lg border-2",
                errors.role
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
            >
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CIVIL_SERVANT">Civil Servant</SelectItem>
              <SelectItem value="HR_OFFICER">HR Officer</SelectItem>
              <SelectItem value="PSPF_OFFICER">PSPF Officer</SelectItem>
              <SelectItem value="MINISTRY_ADMIN">Ministry Admin</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.role.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-uganda-charcoal font-medium"
          >
            Password *
          </Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                errors.password
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("password")}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-grass to-uganda-sky opacity-60" />
            </div>
          </div>
          {errors.password && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.password.message}
            </p>
          )}

          {/* Password strength indicator */}
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  password.length >= 8
                    ? "bg-uganda-success"
                    : "bg-uganda-silver"
                )}
              />
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  /[a-z]/.test(password)
                    ? "bg-uganda-success"
                    : "bg-uganda-silver"
                )}
              />
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  /[A-Z]/.test(password)
                    ? "bg-uganda-success"
                    : "bg-uganda-silver"
                )}
              />
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  /\d/.test(password) ? "bg-uganda-success" : "bg-uganda-silver"
                )}
              />
            </div>
            <p className="text-uganda-gray text-xs">
              Must be 8+ characters with uppercase, lowercase, and number
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-uganda-charcoal font-medium"
          >
            Confirm Password *
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                errors.confirmPassword
                  ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                  : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
              )}
              {...register("confirmPassword")}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-yellow to-uganda-red opacity-60" />
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-uganda-red text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300",
              "bg-gradient-to-r from-uganda-sky via-uganda-grass to-uganda-sun",
              "hover:from-uganda-sun hover:via-uganda-grass hover:to-uganda-sky",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg hover:shadow-xl"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-uganda-silver/50" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-uganda-slate">
              Already registered?
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-uganda-slate">
            Have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-uganda-sky hover:text-uganda-grass transition-colors"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-uganda-gray text-sm mt-2">
            By registering, you agree to our terms of service
          </p>
        </div>
      </form>

      {/* Security Note */}
      {!isMobile && (
        <div className="mt-8 pt-6 border-t border-uganda-silver/30">
          <div className="flex items-center space-x-3 text-uganda-slate text-sm">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-uganda-black/10 to-uganda-red/10 flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-uganda-success" />
            </div>
            <div>
              <p className="font-medium">Secure Registration</p>
              <p className="text-uganda-gray text-xs">
                Your information is encrypted and protected
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  )
}
