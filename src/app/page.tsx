"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function AppPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard/users");
    }
  }, []);

  return <></>;
}
