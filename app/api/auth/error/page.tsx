"use client"; // Ensure this is a client-side component

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation"; // For checking the current route

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const pathname = usePathname(); // Get current route

  return (
    <div className="flex items-center justify-center h-screen dark:bg-secondary">
      <div className="text-center border border-red-500 p-16 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Failed to login
        </h1>
        {error && (
          <p className="mt-4 text-red-500 text-lg">
            {decodeURIComponent(error)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
