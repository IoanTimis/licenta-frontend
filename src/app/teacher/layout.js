"use client";

import { useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store/page";
import { clearUser } from "@/store/features/user/userSlice";
import { useState } from "react";

export default function TeacherLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);
  const [checking, setChecking] = useState(true);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      localStorage.setItem("lastAttemptedPath", pathname);
      router.push("/auth/login"); 
    }

    try {
      const decoded = jwtDecode(accessToken);

      if (decoded.role !== "teacher") {
        console.log("Nu ai acces la aceasta pagina, rolul tau este: ", decoded.role);
        setRedirecting(true);
        router.push(`/${decoded.role}`);
      }

      setChecking(false);

    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("accessToken");
      store.dispatch(clearUser());
      router.push("/auth/login");
    } 
    
  }, [router]);

  if (redirecting || checking) {
    return null;
  }

  return (
    <div>
      <div className="teacher-container">{children}</div>
    </div>
  );
}
