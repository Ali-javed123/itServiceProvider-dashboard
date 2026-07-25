import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from '../lib/providers/QueryProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern Dashboard",
  description: "Professional Dashboard with Light/Dark Mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
               <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" 
          integrity="sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />

      </head>
      <body className="min-h-full flex flex-col">
         <QueryProvider>
<Providers>


                  <main>{children}</main>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'my-toast',
            duration: 4000,
          }}
          closeButton
          richColors
          expand
        />

          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}