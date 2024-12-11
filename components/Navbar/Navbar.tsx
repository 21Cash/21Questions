"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

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
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-primary shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        21Questions
      </h1>
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
    </nav>
  );
};

export default Navbar;
