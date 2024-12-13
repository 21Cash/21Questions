"use client";

import { SessionProvider, useSession } from "next-auth/react";

export default function SessionDisplay() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen dark:bg-gray-700">
      {session ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        <p>No session available</p>
      )}
    </div>
  );
}
