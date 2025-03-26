"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

export default function AuthGuardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded?.role) {
          console.log("Decoded token:", decoded);
          router.push(`/${decoded.role}`);
        } else {
          router.push("/");
        }
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
  }, [router]);

  return <>{children}</>;
}
