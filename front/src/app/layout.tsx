"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import DefaultComponent from "./DefaultWrapper";
import { useTAppStore } from "@/store/stateStore";
import { useRouter } from "next/navigation";

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
  const [bodyClassName, setBodyClassName] = React.useState("");
  const { setSession } = useTAppStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setBodyClassName(`${geistSans.variable} ${geistMono.variable} antialiased`);
  }, []);

  useEffect(() => {
    // Check if window is refreshed
    const handleBeforeUnload = () => {
      setSession(undefined);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.push("/");
    // Use system or user preference for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);

    // Cleanup listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <DefaultComponent>{children}</DefaultComponent>
      </body>
    </html>
  );
}
