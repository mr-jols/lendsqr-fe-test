"use client";
import { UsersContext, UsersContextType } from "@/context/useUsers";
import UsersTable from "../../../presentation/views/users/table";
import { useContext, useEffect } from "react";
import UsersStats from "../../../presentation/views/users/stats";
import useToggle from "@/hooks/useToggle";
import UserFetch from "./fetch";
import UsersSkeleton from "./sketelon";

export default function UsersView() {
  const { users, saveUsers } = useContext(UsersContext) as UsersContextType;
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
      <UsersStats />
      {users.length == 0 ? <UsersSkeleton /> : <UsersTable />}
    </div>
  );
}
