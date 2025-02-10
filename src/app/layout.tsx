import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "notion-clone",
  description:
    "A Notion clone built with Next.js and Tailwind CSS by aaditya jain",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />

          <div className="flex min-h-screen p-4">
            <Sidebar />
            <div className="flex-1 bg-gray-100 overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
