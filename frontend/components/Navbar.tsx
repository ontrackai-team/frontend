"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between p-4 border-b">
      <h1 className="font-bold">OnTrackAI</h1>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/chat">Chat</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}