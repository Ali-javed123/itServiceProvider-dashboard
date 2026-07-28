"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { OtpInput } from "@/components/otp-input";
import { cn } from "@/lib/utils";

import { useApi } from '@/lib/useApi'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation' // Redirect ke liye


interface otp {
    otp: string 
    password: string
    email: string
}


// 1. Zod Schema for Type Safety
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
interface verification{
    email:string
    verficationID:string    
    password:string
}

export default function VerifyOtpPage() {
    const router=useRouter()

  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Yeh email aap login response ya search params se le sakte hain
//   const email = "user@example.com"; 
  const email = typeof window !== "undefined" ? sessionStorage.getItem("otp_email") : null;
    const password= typeof window !== "undefined" ? sessionStorage.getItem("otp_password") : null;
  const verificationId = typeof window !== "undefined" ? sessionStorage.getItem("otp_verificationId") : null;



  // Countdown Timer Logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 2. Formik Setup with Zod Adapter
  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: toFormikValidationSchema(otpSchema),
      onSubmit: async (values, { setSubmitting }) => {
    try {
      // Get stored data from sessionStorage
      const email = sessionStorage.getItem("otp_email");
      const password = sessionStorage.getItem("otp_password");
      const verificationId = sessionStorage.getItem("otp_verificationId");

      // Make API call to verify OTP
      const response = await api.post('/auth/verify-otp', {
        otp:Number( values.otp),
        email: email,
        password: password,
        
      } as any);

      console.log('Verification successful:', response);
      
      // Handle success
      setIsSuccess(true);
      router.push("/dashboard")
      
      // Clear session storage after successful verification
      sessionStorage.removeItem("otp_email");
      sessionStorage.removeItem("otp_password");
      sessionStorage.removeItem("otp_verificationId");
      
      // Safely extract token from response (handle different response shapes)
      const token = (response as any)?.data?.token ?? (response as any)?.token;
      if (token) localStorage.setItem("token", token);

      

      // Store auth token if returned
      // if (response.data?.token) {
      //   localStorage.setItem("auth_token", response.data.token);
      // }
      
    } catch (error) {
      console.error('Verification failed:', error);
      
      // Handle different error scenarios
      // if (error.response?.status === 400) {
      //   formik.setFieldError("otp", "Invalid OTP. Please try again.");
      // } else if (error.response?.status === 404) {
      //   formik.setFieldError("otp", "OTP expired. Please request a new one.");
      // } else {
      //   formik.setFieldError("otp", "Verification failed. Please try again.");
      // }
      
      // Reset OTP field on error
      formik.setFieldValue("otp", "");
    } finally {
      setSubmitting(false);
    }
  },

  });

  // Resend OTP Logic


    const handleResend = async () => {
    setIsResending(true);
    
    try {
      // 1. Sahi variable name use karein
      const currentVerificationId = sessionStorage.getItem("otp_verificationId");
      
      if (!currentVerificationId) {
        alert("Session expired. Please login again.");
        window.location.href = "/";
        return;
      }
      
      // 2. Backend ko 'verificationId' key ke sath bhejein, 'email' ke sath nahi
      const response = await api.post('/auth/resend-otp', {
        verificationId: currentVerificationId 
      });
      
      console.log('OTP resent successfully:', response);
      
      // 3. Backend se mila hua NAYA verificationId update karein (Ye zaroori hai)
      // if (response.data?.verificationId) {
      //   sessionStorage.setItem("otp_verificationId", response.data.verificationId);
      // }
      
      setCountdown(30);
      formik.setFieldValue("otp", "");
      formik.setFieldError("otp", undefined);
      
    } catch (error: any) {
      console.error('Failed to resend OTP:', error);
      
      // Backend se aaya hua exact error message dikhayein (e.g., "Please wait 15 seconds")
      const errorMsg = error.response?.data?.message || "Failed to resend OTP. Please try again.";
      alert(errorMsg); 
      
      // Agar session expire ho gaya hai (401), to login page par bhej dein
      if (error.response?.status === 401) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    } finally {
      setIsResending(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 transition-colors duration-300">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
            {isSuccess ? (
              <CheckCircle2 className="h-7 w-7 text-green-500" />
            ) : (
              <Mail className="h-7 w-7 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isSuccess ? "Verification Successful!" : "Verify your email"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSuccess ? (
              "You can now proceed to your dashboard."
            ) : (
              <>
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-foreground">{email}</span>.
                <br />
                Please enter it below to continue.
              </>
            )}
          </CardDescription>
        </CardHeader>

        {!isSuccess && (
          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-6 py-8">
              <div className="space-y-3">
                <Label htmlFor="otp" className="text-center block text-sm font-medium">
                  Enter 6-digit OTP
                </Label>
                <OtpInput
                  length={6}
                  value={formik.values.otp}
                  onChange={(val) => {
                    formik.setFieldValue("otp", val);
                    // Clear error immediately when user starts typing correctly
                    if (formik.errors.otp) formik.setFieldError("otp", undefined);
                  }}
                  aria-invalid={!!formik.errors.otp}
                  aria-describedby="otp-error"
                />
                {formik.errors.otp && formik.touched.otp && (
                  <p id="otp-error" className="text-center text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                    {formik.errors.otp}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 border-t-0">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={formik.values.otp.length !== 6 || formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>

              <div className="flex w-full items-center justify-between text-sm">
                <Link
                  href="/login"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back to login
                </Link>
                
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0 || isResending}
                  className={cn(
                    "font-medium transition-all duration-200",
                    countdown > 0 || isResending
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-primary hover:text-primary/80 hover:underline underline-offset-4"
                  )}
                >
                  {isResending ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Sending...
                    </span>
                  ) : countdown > 0 ? (
                    `Resend in ${countdown}s`
                  ) : (
                    "Resend Code"
                  )}
                </button>
              </div>
            </CardFooter>
          </form>
        )}

        {isSuccess && (
          <CardFooter className="pt-2">
            <Button className="w-full" size="lg" >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}