"use client";

import { SessionProvider, useSession } from "next-auth/react";

export default function TestComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen dark:bg-secondary">
      {session ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        <p>No session available</p>
      )}
    </div>
  );
}