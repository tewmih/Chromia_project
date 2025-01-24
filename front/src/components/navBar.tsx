"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddTask from "./AddTask";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Filters", href: "/filters" },
  ];

  return (
    <header className="bg-fuchsia-950 text-gray-300 shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-white">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              To-Do App
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "hover:text-blue-400 hover:border-b-2 hover:border-blue-400"
                } transition-all pb-1`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button and Wallet Button */}
          <div className="flex items-center space-x-4">
            <AddTask />
            <button className="flex items-center  bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105">
              Connect Wallet
            </button>
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-700 fixed right-0 top-16 w-16 h-screen shadow-lg">
          <ul className="flex flex-col items-end space-y-4 p-2">
            {links.map((link) => (
              <li key={link.name} className="w-full">
                <Link
                  href={link.href}
                  className={`block w-full text-right pr-4 py-2 ${
                    pathname === link.href
                      ? "text-blue-400 border-r-4 border-blue-400"
                      : "hover:text-blue-400 hover:border-r-4 hover:border-blue-400"
                  } transition-all`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
