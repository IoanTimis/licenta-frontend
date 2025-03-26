"use client";

import FixedSidebar from "@/app/components/admin/fixed-side-bar";
import { useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/page";
import { clearUser } from "@/store/features/user/userSlice";
import { ErrorProvider } from "@/context/errorContext";
import ErrorDiv from "@/app/components/general/error-div";
import { useState } from "react";


export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname() || "";
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

      if (decoded.role !== "admin") {
        console.log("Nu ai acces la această pagină, rolul tău este: ", decoded.role);
        setRedirecting(true);
        router.push(`/${decoded.role}`);
      }

      setChecking(false);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, [router]);

  if (redirecting || checking) {
    return null;
  }

  return (
    <Provider store={store}>
      <ErrorProvider>
        <div className="flex min-h-screen">
          <FixedSidebar />
          <main className="w-full min-h-screen p-6 bg-gray-100 ml-64">
            <ErrorDiv />
            {children}
          </main>
        </div>
      </ErrorProvider>
    </Provider>
  ); 
}
