"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Filters", href: "/filters" },
    { name: "Labels", href: "/labels" },
    { name: "Upcoming", href: "/upcoming" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <header className="bg-gray-800 !bg-gray-800 text-gray-300 shadow-lg fixed top-0 left-0 w-full z-50 border-b-2 border-gray-600 shadow-md mb-5">
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-700">
          <ul className="space-y-4 p-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block ${
                    pathname === link.href
                      ? "text-blue-400 border-l-4 border-blue-400 pl-2"
                      : "hover:text-blue-400 hover:border-l-4 hover:border-blue-400 pl-2"
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
