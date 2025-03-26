"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

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
          return; // nu continua
        }
      } catch (e) {
        console.error("Token invalid:", e);
      }
    }

    // dacă NU există token sau e invalid
    setLoading(false);
  }, [router]);

  if (loading) return <div>Se încarcă...</div>


  return <>{children}</>;
}
