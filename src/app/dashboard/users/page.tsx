"use client";
import { UsersContext, UsersContextType } from "@/context/useUsers";
import { useQuery } from "@/hooks/useQuery";
import { UsersResponse, toDomain } from "@/models/response/user";
import { BASE_URL } from "@/utils/constansts";
import UserTable from "./views/table";
import { useContext, useEffect, useLayoutEffect } from "react";
import UserStats from "./views/stats";
import useToggle from "@/hooks/useToggle";
import { Skeleton } from "@mantine/core";

export default function UsersPage() {
  const { users, saveUsers } = useContext(UsersContext) as UsersContextType;
  const [toggle, handleToggle] = useToggle();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
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
      <UserStats />
      {users.length == 0 ? <UserSkeleton /> : <UserTable />}
    </div>
  );
}

function UserFetch() {
  const [data] = useQuery<UsersResponse>(`${BASE_URL}/users`);
  const { saveUsers } = useContext(UsersContext) as UsersContextType;
  useEffect(() => {
    if (data?.length != 0 && data != null) {
      saveUsers(toDomain(data));
    }
  }, [data]);

  return <></>;
}

function UserSkeleton() {
  return (
    <div>
      {new Array(5).fill("").map((item, index) => (
        <div key={index}>
          <Skeleton height={40} mb={20} radius="xl" />{" "}
        </div>
      ))}
    </div>
  );
}
