"use client";
import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import UsersTable from "../../../presentation/views/users/table";
import { useContext } from "react";
import UsersStats from "../../../presentation/views/users/stats";
import UsersSkeleton from "./sketelon";

export default function UsersView() {
  const { users } = useContext(UsersContext) as UsersContextType;

  return (
    <div>
      <h5 className="dashboard-title">Users</h5>
      <UsersStats />
      {users.length == 0 ? <UsersSkeleton /> : <UsersTable />}
    </div>
  );
}
