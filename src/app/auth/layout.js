"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AuthGuardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded?.role) {
          console.log("Ești deja logat, redirect...");
          router.push(`/${decoded.role}`);
          return;
        }
      } catch (e) {
        console.error("Token invalid:", e);
      }
    }

  }, [router]);



  return <>{children}</>;
}
