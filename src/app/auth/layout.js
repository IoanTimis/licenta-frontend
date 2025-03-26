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
          return;
        }

        setLoading(false);

      } catch (e) {
        console.error("Token invalid:", e);
        return;
      }
    }

  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-700">{translate("Loading...")}</h1>
      </div>
    );
  }

  return <>{children}</>;
}
