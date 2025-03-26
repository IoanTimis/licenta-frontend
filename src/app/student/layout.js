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
  const [loading, setLoading] = useState(true);

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
      }

    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("accessToken");
      store.dispatch(clearUser());
      router.push("/auth/login"); 
    } 
    
    setLoading(false);
  }, [router]);

  if (loading) return <div>Se încarcă...</div>

  return (
    <div>
      <div className="student-container">{children}</div>
    </div>
  );
}
