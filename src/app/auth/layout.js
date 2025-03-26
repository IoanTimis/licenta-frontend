"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
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
          console.log("Esti deja logat");
          router.push(`/${decoded.role}`);
        } else {
          router.push("/");
        }
      } catch (e) {
        console.error("Invalid token:", e);
      } finally {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) {
    return <div></div>;
  }

  return <>{children}</>;
}
