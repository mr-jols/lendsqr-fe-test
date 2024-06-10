"use client";
import { useEffect } from "react";
import Header from "../../presentation/views/header";
import Nav from "../../presentation/views/nav";
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
  useEffect(() => {
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
