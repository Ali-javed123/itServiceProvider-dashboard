"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Formik, FastField, Form, ErrorMessage, FormikHelpers } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useApi } from '@/lib/useApi'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation' // Redirect ke liye


import { showSuccess, showError, showLoading, dismissToast } from '@/components/ui/toast' // ✅ Import

// 1. FIXED: Zod validation schema (Standard Zod syntax)
const loginSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === undefined || issue.input === "") {
        return "Email is required";
      }
      return "Invalid email address";
    },
  }),

  password: z
    .string({
      error: "Password is required",
    })
    .min(3, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
});
// 2. FIXED: Infer TypeScript type from Zod schema
type LoginFormValues = z.infer<typeof loginSchema>

// 3. FIXED: Proper Response Type (Login returns token/user, not password)
interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

// Initial values with proper typing
const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

// Validation schema for Formik
const validationSchema = toFormikValidationSchema(loginSchema)

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router=useRouter()

  // 4. FIXED: Hook MUST be called inside the React component
  const { loading: apiLoading, error: apiError, execute } = useApi<LoginResponse>()

  // 5. FIXED: onSubmit moved inside component to access hook and router
    const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    console.log("Submit called")
    
    // ✅ Declare outside try-catch for scope access
    let loadingToastId: string | number | undefined

    try {
      // ✅ Show loading toast
      loadingToastId = showLoading("Logging in...")

      const response = await execute(api.post<LoginResponse>('/auth/login', values))
      
      console.log('Login response:', response)

      // ✅ Dismiss loading toast
      if (loadingToastId) {
        dismissToast(loadingToastId)
      }

      // ✅ Check if login was successful
      if (response?.success) {
        showSuccess(
          "Welcome back! 🎉",
          `Successfully logged in as ${values.email}`
        )

        // Save data to sessionStorage
        sessionStorage.setItem("otp_email", values.email)
        sessionStorage.setItem("otp_password", values.password)
        
        if (response.verificationId) {
          sessionStorage.setItem("otp_verificationId", response.verificationId)
        }

        // Redirect to OTP verification
        router.push("/verify-otp")
      } else {
        // ✅ Show error if response success is false
        showError(
          "Login Failed",
          response?.message || "Invalid credentials. Please try again."
        )
      }
      
    } catch (error: any) {
      console.warn('Login failed:', error)

      // ✅ Dismiss loading toast if still showing
      if (loadingToastId) {
        dismissToast(loadingToastId)
      }

      // ✅ Show error toast
      showError(
        "Login Failed",
        error?.response?.data?.message || 
        error?.message || 
        "Invalid email or password. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }



  return (
    <Formik<LoginFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors,handleSubmit }) => (
        <Form className={cn("flex flex-col gap-6", className)} {...props}
                onSubmit={(e) => {
      e.preventDefault()
      handleSubmit(e)
    }}
            
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            {/* Global API Error Display (e.g., Invalid credentials) */}
            {apiError && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                {apiError.message || "Login failed. Please check your credentials."}
              </div>
            )}

            {/* FastField for email */}
            <FastField name="email">
              {({ field, meta }: any) => (
                <div className="space-y-1">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...field}
                    className={cn(
                      "transition-colors",
                      errors.email && touched.email && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              )}
            </FastField>

            {/* FastField for password */}
            <FastField name="password">
              {({ field, meta }: any) => (
                <div className="space-y-1">
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className={cn(
                      "transition-colors",
                      errors.password && touched.password && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              )}
            </FastField>

            {/* Submit button with loading state */}
            <Field>
              <Button 
                type="submit" 
                disabled={isSubmitting || apiLoading}
                className="w-full"
              >
                {(isSubmitting || apiLoading) ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            <Field>
              <Button variant="outline" type="button" className="w-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Login with GitHub
              </Button>
              <FieldDescription className="text-center mt-4">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4 hover:text-primary">
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </Form>
      )}
    </Formik>
  )
}