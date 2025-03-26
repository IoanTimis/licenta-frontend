"use client";

import { useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store/page";
import { clearUser } from "@/store/features/user/userSlice";
import { useState } from "react";

export default function StudentLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  cosnt [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/auth/login"); 
      localStorage.setItem("lastAttemptedPath", pathname);
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);

      console.log("Decoded token:", decoded);

      if (decoded.role !== "student") { 
        console.log("Nu ai acces la aceasta pagina, rolul tau este: ", decoded.role);
        router.push(`/${decoded.role}`); 
        return;
      }

      setLoading(false);

    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("accessToken");
      store.dispatch(clearUser());
      router.push("/auth/login");
      return; 
    } 
    
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-700">{translate("Loading...")}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="student-container">{children}</div>
    </div>
  );
}
