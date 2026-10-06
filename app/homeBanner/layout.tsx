"use client";

import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SidebarProvider, useSidebar } from "../dashboard/hooks/useSidebar";
import { cn } from "@/lib/utils";

function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <>
      <Sidebar />

      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all duration-300",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Navbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/10">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}