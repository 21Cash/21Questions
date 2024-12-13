import Link from "next/link";
import GetRandomHandleButton from "./GetRandomHandleButton/GetRandomHandleButton";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen dark:bg-gradient-to-r dark:from-gray-800 dark:via-black dark:to-gray-900 bg-gradient-to-r from-indigo-400 via-pink-300 to-yellow-300 text-black dark:text-white transition-all duration-1000 ease-in-out overflow-hidden">
      <div className="text-center space-y-8 my-auto px-4">
        <h1 className="text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse group">
          <span className="group-hover:tracking-widest transition-all duration-500">
            21
          </span>
          <span className="group-hover:tracking-widest transition-all duration-500">
            Questions
          </span>
        </h1>
        <p className="text-2xl font-light max-w-xl mx-auto mt-6">
          Welcome to 21Questions! A place where you can ask anything, stay
          anonymous, and get real answers without revealing your identity.
        </p>

        <div className="flex justify-center gap-8 space-x-5 mt-10">
          <Link
            href="/auth/signup"
            className="px-10 py-4 bg-green-600 hover:bg-green-700 text-xl rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 active:scale-95"
          >
            Sign Up
          </Link>
          <Link
            href="https://github.com/21Cash/21Questions"
            target="_blank"
            className="px-10 py-4 bg-gray-800 hover:bg-gray-700 text-xl rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 active:scale-95"
          >
            Star it on GitHub
          </Link>
        </div>

        <div className="mx-auto">
          <GetRandomHandleButton />
        </div>

        <p className="text-lg text-gray-400 mt-12">
          No login required to post questions.
        </p>
      </div>
    </div>
  );
}
