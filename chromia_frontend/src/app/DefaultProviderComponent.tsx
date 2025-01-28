"use client";

import { ContextProvider } from "@/components/contextProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/navBar";
import Sidebar from "@/components/sidebar";
import { useTAppStore } from "@/store/stateStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();
const DefaultProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setSession, session } = useTAppStore();
  const router = useRouter();

  useEffect(() => {
    // Check if window is refreshed
    const handleBeforeUnload = () => {
      setSession(undefined);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.push("/");
    // Use system or user preference for dark mode
    // const prefersDark = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;
    // setIsDarkMode(prefersDark);

    // Cleanup listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router, setSession]);
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <header>
          <Navbar />
        </header>
        <div className="flex">
          {session && <Sidebar />}
          <main
            className={`flex-1 min-h-screen pt-16 bg-white w-full ${
              session ? "pl-6" : ""
            }`}
          >
            {children}
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
        <ToastContainer />
      </ContextProvider>
    </QueryClientProvider>
  );
};
export default DefaultProviderComponent;
