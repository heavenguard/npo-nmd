"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      // no user → redirect to login
      if (!user) {
        if (pathname !== "/login" && pathname !== "/reset-password") {
          router.push("/login");
        }
        return;
      }

      // userInfo might not be loaded yet
      if (!userInfo) return;

      // user exists but role not allowed → redirect
      if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
        router.push("/");
        return;
      }

      setReady(true); // auth passed, render children
    }
  }, [user, userInfo, loading, router, pathname, allowedRoles]);

  if (loading || !ready) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
