"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-lg">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer">
          21Questions
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <MoonIcon className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          )}
        </button>
        <div className="flex items-center space-x-4">
          {session ? (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/api/auth/signin">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                  Sign In
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
