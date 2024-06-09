"use client";
import { useLayoutEffect } from "react";
import Header from "./view/header";
import Nav from "./view/nav";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [toggle, handleToggle] = useToggle();

  //Auth Context
  useLayoutEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      handleToggle();
    }
  }, []);

  return !toggle ? (
    <> </>
  ) : (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content-wrapper">
        <div className="nav-wrapper">
          <Nav />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
