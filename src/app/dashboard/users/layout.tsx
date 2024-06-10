"use client"
import useToggle from "@/hooks/useToggle";
import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import UserFetch from "@/presentation/views/users/fetch";
import { useContext, useEffect } from "react";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { saveUsers } = useContext(UsersContext) as UsersContextType;
  const [toggle, handleToggle] = useToggle();

  useEffect(() => {
    window.scrollTo(0, 0);
    // if users data is present in local storage it is saved in state else users are fetched
    const storedData = localStorage.getItem("users");
    if (storedData) {
      saveUsers(JSON.parse(storedData));
    } else {
      handleToggle();
    }
  }, []);

  return (
    <div>
      {toggle && <UserFetch />}
      {children}
    </div>
  );
}
