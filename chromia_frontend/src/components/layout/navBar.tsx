"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AddTask from "@/components/tasks/AddTask";
import CustomizedModal from "@/components/ConnectWalletModal";
import { useTAppStore } from "@/store/stateStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, setSession, logout } = useTAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const handleLogin = () => {
    setIsModalOpen(false);
  };

  // const handleLogout = async () => {
  //   setSession(undefined);
  //   await logout();
  // };
  const handleLogout = async () => {
    setSession(undefined);
    await logout();
    setIsModalOpen(false); // Close modal if it's open
    router.push("/"); // Redirect to the landing page after logout
  };

  // Prevents hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Ensures correct rendering on the client

  const links = [{ name: "Home", href: "/" }];

  return (
    <>
      <div className="bg-fuchsia-950 text-gray-300 shadow-lg fixed top-0 left-0 w-full z-30 border-b border-gray-600">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Left Aligned */}
            <div className="text-xl font-bold text-white flex-grow">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                To-Do DApp
              </Link>
            </div>
            {/* Right-Side Buttons (Only visible on larger screens) */}
            {session && (
              <div className="hidden md:flex items-center space-x-4">
                <AddTask />
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                      pathname === link.href
                        ? "text-blue-400 border-b-2 border-blue-400 mr-4 "
                        : "hover:text-blue-400 hover:border-b-2 hover:border-blue-400 mr-2"
                    } transition-all pb-1`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="relative">
                  <img
                    src={session.user?.profilePicture || "/default-profile.png"}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-lg cursor-pointer"
                    onClick={() => router.push("/profile")}
                  />
                </div>
              </div>
            )}
            {/* Connect Wallet Button - Always Visible */}
            {!session ? (
              <button
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white px-2 py-1 rounded-xl shadow-lg hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105 mr-2"
                onClick={() => setIsModalOpen(true)}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={() => handleLogout()}
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white px-2 py-1 rounded-xl shadow-lg hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105 mr-2"
              >
                Disconnect Wallet
              </button>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open Menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && <style>{`body { overflow: hidden; }`}</style>}
      </div>
      <div className="">
        {isMobileMenuOpen && session && (
          <div className="md:hidden mx-4 !bg-gray-700 fixed mt-2 rounded-lg right-0 top-16 shadow-lg z-50">
            <ul className="flex flex-col space-y-4 p-4">
              {links.map((link) => (
                <li key={link.name} className="font-semibold">
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 text-lg ${
                      pathname === link.href
                        ? "text-blue-400 border-blue-400"
                        : "hover:text-blue-400 hover:border-blue-400"
                    } transition-all`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="flex justify-center">
                <AddTask />
              </li>
            </ul>
          </div>
        )}
        <CustomizedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </>
  );
}
