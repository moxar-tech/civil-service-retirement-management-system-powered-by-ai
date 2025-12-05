// app/sign-in/page.tsx
"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signInSchema } from "@/lib/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

type SignInForm = z.infer<typeof signInSchema>

export default function SignInPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInForm) => {
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        login: data.login,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email/phone or password")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("An error occurred during sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-uganda-cream via-uganda-silver/10 to-uganda-sunlight/20">
      {/* Desktop Layout - Split Screen */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Uganda Heritage Image */}
        <div className="relative w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-uganda-black/90 via-uganda-red/80 to-uganda-yellow/70 z-10" />

          {/* Simulated Image Background - Using gradient overlay */}
          <div className="absolute inset-0">
            {/* Top gradient stripe - Uganda flag inspired */}
            <div className="h-1/3 bg-gradient-to-r from-uganda-black via-uganda-black/95 to-transparent" />

            {/* Middle gradient stripe */}
            <div className="h-1/3 bg-gradient-to-r from-uganda-yellow via-uganda-yellow/90 to-transparent" />

            {/* Bottom gradient stripe */}
            <div className="h-1/3 bg-gradient-to-r from-uganda-red via-uganda-red/90 to-transparent" />

            {/* Uganda Crest Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 rounded-full border-4 border-uganda-yellow/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-uganda-red/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-uganda-black/30" />
              </div>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-20 flex flex-col justify-center h-full p-12 text-white">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-uganda-yellow to-uganda-sun flex items-center justify-center">
                  <span className="text-uganda-black font-bold text-xl">
                    UR
                  </span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-uganda-yellow via-uganda-sun to-uganda-red bg-clip-text text-transparent">
                  U-Retire
                </h1>
              </div>
              <p className="text-2xl font-semibold mb-2">
                Civil Servant Retirement System
              </p>
              <p className="text-uganda-silver/90 text-lg">
                Serving Uganda&apos;s Public Servants with Dignity
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="mt-12 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-yellow/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Secure & Transparent
                  </h3>
                  <p className="text-uganda-silver/80">
                    Your retirement benefits managed with utmost security and
                    clarity
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-red/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Real-time Tracking
                  </h3>
                  <p className="text-uganda-silver/80">
                    Monitor your retirement application progress anytime,
                    anywhere
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-uganda-black/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-uganda-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    AI-Powered Projections
                  </h3>
                  <p className="text-uganda-silver/80">
                    Smart calculations for your retirement benefits
                  </p>
                </div>
              </div>
            </div>

            {/* Fade effect at the border */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-uganda-black/90 via-uganda-black/50 to-transparent" />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <FormContent
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            error={error}
            loading={loading}
          />
        </div>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-gradient-to-r from-uganda-black via-uganda-red to-uganda-yellow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-uganda-black font-bold">UR</span>
              </div>
              <h1 className="text-xl font-bold text-white">U-Retire</h1>
            </div>
            <div className="text-white/80 text-sm">Civil Service Portal</div>
          </div>
        </div>

        {/* Mobile Form Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <FormContent
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            error={error}
            loading={loading}
            isMobile={true}
          />
        </div>

        {/* Mobile Footer */}
        <div className="bg-uganda-cream border-t border-uganda-silver p-4 text-center">
          <p className="text-uganda-slate text-sm">
            Ministry of Public Service • Republic of Uganda
          </p>
        </div>
      </div>
    </div>
  )
}

// 1. Define the structure of your form data
interface FormData {
  login: string
  password: string
}

interface FormContentProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  error: string
  loading: boolean
  isMobile?: boolean
}

function FormContent({
  onSubmit,
  register,
  errors,
  error,
  loading,
  isMobile = false,
}: FormContentProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md",
        !isMobile &&
          "shadow-2xl rounded-2xl p-8 bg-white/95 backdrop-blur-sm border border-uganda-silver/20"
      )}
    >
      {!isMobile && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-uganda-charcoal mb-2">
            Welcome Back
          </h2>
          <p className="text-uganda-slate">
            Sign in to manage your retirement benefits
          </p>
        </div>
      )}

      {isMobile && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-uganda-charcoal mb-1">
            Sign In
          </h2>
          <p className="text-uganda-slate text-sm">
            Access your U-Retire account
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-6"
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="login"
              className="text-uganda-charcoal font-medium"
            >
              Email or Phone Number
            </Label>
            <div className="relative">
              <Input
                id="login"
                type="text"
                placeholder="you@example.com or +256712345678"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                  errors.login
                    ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                    : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
                )}
                {...register("login")}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-sky to-uganda-grass opacity-60" />
              </div>
            </div>
            {errors.login && (
              <p className="text-uganda-red text-sm flex items-center mt-1">
                <span className="mr-1">⚠</span>
                {errors.login.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-uganda-charcoal font-medium"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm text-uganda-sky hover:text-uganda-grass transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border-2",
                  errors.password
                    ? "border-uganda-red focus:border-uganda-red focus:ring-uganda-red/20"
                    : "border-uganda-silver focus:border-uganda-sky focus:ring-uganda-sky/20"
                )}
                {...register("password")}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-uganda-yellow to-uganda-sun opacity-60" />
              </div>
            </div>
            {errors.password && (
              <p className="text-uganda-red text-sm flex items-center mt-1">
                <span className="mr-1">⚠</span>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300",
            "bg-gradient-to-r from-uganda-black via-uganda-red to-uganda-yellow",
            "hover:from-uganda-yellow hover:via-uganda-red hover:to-uganda-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-lg hover:shadow-xl"
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-uganda-silver/50" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-uganda-slate">
              Or continue with
            </span>
          </div>
        </div>

        {/* Alternative Login Options */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-uganda-silver hover:border-uganda-sky hover:bg-uganda-sky/5"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-br from-uganda-black to-uganda-charcoal rounded" />
              <span>Email</span>
            </div>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-uganda-silver hover:border-uganda-sky hover:bg-uganda-sky/5"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-br from-uganda-yellow to-uganda-sun rounded" />
              <span>Phone</span>
            </div>
          </Button>
        </div>

        <div className="text-center pt-4">
          <p className="text-uganda-slate">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-uganda-sky hover:text-uganda-grass transition-colors"
            >
              Register here
            </Link>
          </p>
          <p className="text-uganda-gray text-sm mt-2">
            For assistance, contact: support@uretire.go.ug
          </p>
        </div>
      </form>

      {/* Security Badge */}
      {!isMobile && (
        <div className="mt-8 pt-6 border-t border-uganda-silver/30">
          <div className="flex items-center justify-center space-x-2 text-uganda-slate text-sm">
            <div className="w-3 h-3 rounded-full bg-uganda-success" />
            <span>Secured by Government of Uganda</span>
            <div className="w-3 h-3 rounded-full bg-uganda-success" />
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
