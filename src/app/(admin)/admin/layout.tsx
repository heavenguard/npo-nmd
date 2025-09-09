import type React from "react";
import ProtectedRoute from "@/components/protected-route";
import { AdminProvider } from "@/context/admin-context";
import AdminLayoutContent from "@/components/admin-layout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminProvider>
    </ProtectedRoute>
  );
}
