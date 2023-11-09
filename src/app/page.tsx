"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function AppPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    const storedData = localStorage.getItem("users");
    if (!storedData) {
      router.push("/login");
    } else {
      router.push("/dashboard/users");
    }
  }, []);

  return <></>;
}
