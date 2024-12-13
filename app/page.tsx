"use client";
import Homepage from "@/components/Homepage/Homepage";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div className="">
      <Homepage />
    </div>
  );
}
