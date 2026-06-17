"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // Temporary mock state for user authentication testing
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-wider text-orange-500">
              ☀️ Sun<span className="text-amber-500">Cart</span>
            </Link>
          </div>

          {/* Links */}
          <div className="hidden space-x-8 md:flex">
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Home
            </Link>
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Products
            </Link>
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              My Profile
            </Link>
          </div>

          {/* Authentication Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* User Avatar */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full border-2 border-orange-400 object-cover"
                />
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/" 
                  onClick={() => setIsLoggedIn(true)} // Quick toggle test
                  className="text-sm font-medium text-gray-600 hover:text-orange-500 px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/" 
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}