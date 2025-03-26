"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AuthGuardLayout({ children }) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded?.role) {
          console.log("Ești deja logat, redirect...");
          setRedirecting(true); // oprește randarea
          router.push(`/${decoded.role}`);
        }
      } catch (e) {
        console.error("Token invalid:", e);
      }
    }

    setChecking(false);
  }, [router]);

  if (redirecting || checking) {
    return null; // sau un loader temporar
  }

  return <>{children}</>;
}
