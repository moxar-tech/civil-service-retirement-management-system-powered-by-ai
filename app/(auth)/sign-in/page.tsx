"use client"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { loginSchema, type LoginInput } from "@/lib/zod"

export default function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const loginValue = watch("login")

  // Auto-detect login method and set validation
  React.useEffect(() => {
    if (loginValue.includes("@")) {
      setValue("login", loginValue, { shouldValidate: true })
    } else if (loginValue) {
      setValue("login", loginValue, { shouldValidate: true })
    }
  }, [loginValue, setValue])

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        login: data.login,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      setError("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const getInputType = () => {
    return loginValue.includes("@") ? "email" : "text"
  }

  const getPlaceholder = () => {
    return loginValue.includes("@") ? "youremail@mail.com" : "+256712345678"
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to U-Retire
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to access your retirement account
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form
        className="my-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelInputContainer className="mb-4">
          <Label htmlFor="login">
            Email or Phone Number
            <span className="ml-1 text-red-500">*</span>
          </Label>
          <Input
            id="login"
            type={getInputType()}
            placeholder={getPlaceholder()}
            className={cn(
              errors.login && "border-red-500 focus:border-red-500"
            )}
            {...register("login")}
          />
          {errors.login && (
            <p className="mt-1 text-sm text-red-500">{errors.login.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">
            Password
            <span className="ml-1 text-red-500">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className={cn(
              errors.password && "border-red-500 focus:border-red-500"
            )}
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all duration-200 hover:from-neutral-700 hover:to-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Signing in...</span>
            </div>
          ) : (
            "Sign in →"
          )}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black transition-all duration-200 hover:bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] dark:hover:bg-zinc-800"
            type="button"
            onClick={() => {
              setError("GitHub authentication not implemented yet")
            }}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black transition-all duration-200 hover:bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] dark:hover:bg-zinc-800"
            type="button"
            onClick={() => {
              setError("Google authentication not implemented yet")
            }}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black transition-all duration-200 hover:bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] dark:hover:bg-zinc-800"
            type="button"
            onClick={() => {
              setError("OnlyFans authentication not implemented yet")
            }}
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
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
