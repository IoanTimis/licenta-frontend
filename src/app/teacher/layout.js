"use client";

import { useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store/page";
import { clearUser } from "@/store/features/user/userSlice";
import { useLanguage } from "@/context/Languagecontext";
import { useState } from "react";

export default function TeacherLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { translate } = useLanguage();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      localStorage.setItem("lastAttemptedPath", pathname);
      router.push("/auth/login"); 
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);

      if (decoded.role !== "teacher") {
        return (
          <div>
            <h1>{translate("Access Denied")}</h1>
          </div>
        );
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("accessToken");
      store.dispatch(clearUser());
      router.push("/auth/login"); 
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <div className="teacher-container">{children}</div>
    </div>
  );
}
