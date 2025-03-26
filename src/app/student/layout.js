"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store/page";
import { clearUser } from "@/store/features/user/userSlice";

export default function StudentLayout({ children }) {
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

      console.log("Decoded token:", decoded);

      if (decoded.role !== "student") {
        console.log("Nu ai acces la această pagină, rolul tău este:", decoded.role);
        router.push(`/${decoded.role}`);
        return; // oprește execuția aici
      }

    } catch (error) {
      console.error("Token invalid:", error);
      localStorage.removeItem("accessToken");
      store.dispatch(clearUser());
      router.push("/auth/login");
      return;
    }

    // Dacă totul e OK, se ajunge aici
    setLoading(false);

  }, [router, pathname]);

  if (loading) return null; // sau spinner

  return (
    <div>
      <div className="student-container">{children}</div>
    </div>
  );
}
