"use client";

import SessionDisplay from "@/components/SessionDisplay/SessionDisplay";
import TestComponent from "@/components/testcomponent/TestComponent";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <TestComponent />

      <SessionDisplay />
    </div>
  );
}
