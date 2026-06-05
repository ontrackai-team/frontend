"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicRoutes = ["/", "/login", "/register"];

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [user, pathname]);

  return user ? children : null;
}