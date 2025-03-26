// src/hooks/useRoleGuard.js
"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store/page";
import { clearUser } from "@/store/features/user/userSlice";

export function useRoleGuard(requiredRole) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      localStorage.setItem("lastAttemptedPath", pathname);
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);

      if (decoded.role !== requiredRole) {
        console.warn(`Nu ai acces la această pagină. Rolul tău este: ${decoded.role}`);
        router.push(`/${decoded.role}`);
        return;
      }

    } catch (error) {
      console.error("Token invalid:", error);
      localStorage.removeItem("accessToken");
      store.dispatch(clearUser());
      router.push("/auth/login");
      return;
    }

    setLoading(false);
  }, [router, pathname, requiredRole]);

  return loading;
}
