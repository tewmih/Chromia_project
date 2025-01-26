"use client"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navBar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/sidebar";
import { ContextProvider } from "@/components/contextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ContextProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen p-6 pt-20">{children}</main>
          </div>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
