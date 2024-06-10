"use client";
import { useEffect } from "react";
import HeaderView from "../../presentation/views/header";
import NavView from "../../presentation/views/nav";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [toggle, handleToggle] = useToggle();

  /* A  blank screen is initially shown, 
  if the user is authenticated the blank screen is toggled to the dashboard screen, 
  if they are unauthenticated they are redirected to login*/

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
      <HeaderView />
      <div className="dashboard-content-wrapper">
        <div className="nav-wrapper">
          <NavView />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
