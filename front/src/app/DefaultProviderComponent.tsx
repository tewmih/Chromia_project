"use client";

import { ContextProvider } from "@/components/contextProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/navBar";
import Sidebar from "@/components/sidebar";
import * as React from "react";

const DefaultProviderComponent = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === "undefined") {
    // Prevent rendering if window is not available
    return null;
  }
  return (
    <ContextProvider>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen p-6 pt-20">{children}</main>
      </div>
      <Footer />
    </ContextProvider>
  );
};
export default DefaultProviderComponent;
