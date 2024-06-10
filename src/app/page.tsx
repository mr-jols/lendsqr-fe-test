"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppPage() {
  const router = useRouter();

  /* if the user is logged in they are directed to their dashboard
  if the user is not logged in thery are diredcted to the login page */
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard/users");
    }
  }, []);

  return <></>;
}
