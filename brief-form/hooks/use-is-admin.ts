"use client";

import { useAuth } from "@/components/auth-provider";

export function useIsAdmin() {
  const { isAdmin } = useAuth();
  return isAdmin;
}
