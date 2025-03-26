"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export default function AuthGuardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded?.role) {
          console.log("Ești deja logat, redirect...");
          router.push(`/${decoded.role}`);
        }

        setLoading(false);

      } catch (e) {
        console.error("Token invalid:", e);
      }
    }

  }, [router]);

  return <>{children}</>;
}
