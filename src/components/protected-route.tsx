"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Loader from "@/components/loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "user">; // roles that can access
}

const ProtectedRoute = ({
  children,
  allowedRoles = ["admin", "user"],
}: ProtectedRouteProps) => {
  const { user, userInfo, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // no user → redirect to login
      if (!user) {
        if (pathname !== "/login" && pathname !== "/reset-password") {
          router.push("/login");
        }
        return;
      }

      // user exists but role not allowed → redirect (example: homepage)
      if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
        router.push("/");
      }
    }
  }, [user, loading, router, pathname, allowedRoles]);

  if (loading) {
    return <Loader />;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
