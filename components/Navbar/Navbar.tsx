"use client";

import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  EnvelopeIcon,
  UserIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const isDark = localStorage.getItem("theme") !== "light";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleProfileNavigation = () => {
    if (session?.user?.name) {
      router.push(`/profile/${session.user.name}`);
    }
  };

  const handleInboxNavigation = () => {
    router.push("/Inbox");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-transparent backdrop-blur-md shadow-md dark:shadow-lg z-50">
      <button onClick={() => router.push("/")}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer group">
          <span className="group-hover:tracking-widest transition-all duration-500">
            21
          </span>
          <span className="group-hover:tracking-widest transition-all duration-500">
            Questions
          </span>
        </h1>
      </button>
      <div className="flex items-center space-x-4">
        {session && (
          <button
            onClick={handleInboxNavigation}
            className="relative group hover:bg-gray-700 rounded-full p-2 active:scale-95 transition-transform duration-200"
            aria-label="Inbox"
          >
            <EnvelopeIcon className="w-9 h-9 dark:text-white" />
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 text-xs text-white bg-black rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Inbox
            </span>
          </button>
        )}
        <button
          onClick={toggleDarkMode}
          className="relative group p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-95 transition-transform duration-200"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <MoonIcon className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <SunIcon className="w-6 h-6 dark:text-yellow-400" />
          )}
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 text-xs text-white bg-black rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Theme
          </span>
        </button>

        {session && (
          <button
            onClick={handleProfileNavigation}
            className="relative group hover:bg-gray-700 rounded-full p-2 active:scale-95 transition-transform duration-200"
            aria-label="Profile"
          >
            <UserIcon className="w-9 h-9 dark:text-white" />
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 text-xs text-white bg-black rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Profile
            </span>
          </button>
        )}

        <div className="flex items-center space-x-4">
          {session ? (
            <button
              onClick={() => {
                signOut().then(() => {
                  router.push("/");
                });
              }}
              className="relative group hover:bg-gray-700 rounded-full p-2 active:scale-95 transition-transform duration-200"
              aria-label="Log Out"
            >
              <UserMinusIcon className="w-9 h-9 dark:text-white" />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 text-xs text-white bg-black rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Log Out
              </span>
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/api/auth/signin")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 active:scale-95 transition-transform duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 active:scale-95 transition-transform duration-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
