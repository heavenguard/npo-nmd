"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Loader from "@/components/loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route

  useEffect(() => {
    if (!loading && !user) {
      if (pathname !== "/login" && pathname !== "/reset-password") {
        router.push("/login");
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <Loader />;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
