"use client";
import { UserResponse } from "@/models/response/user";
import { createContext, useEffect, useState } from "react";

export enum UserStatus {
  active,
  inactive,
  blacklisted,
  pending,
}

export interface UserState extends Omit<UserResponse, "maritalstatus"> {
  status: UserStatus;
  maritalstatus: string;
}

export interface UsersContextType {
  users: UserState[];
  blacklistUser(id: number): void;
  activateUser(id: number): void;
  saveUsers(users: UserState[]): void;
}

export const UsersContext = createContext<UsersContextType | null>(null);

export default function useUsers(): UsersContextType {
  const [users, setUsers] = useState<UserState[] | []>([]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  function saveUsers(users: UserState[]) {
    setUsers(users);
  }

  function blacklistUser(id: number) {
    if (users[id].status != UserStatus.blacklisted) {
      setUsers(
        users.map((item, index) =>
          index == id ? { ...item, status: UserStatus.blacklisted } : item
        )
      );
    }
  }

  function activateUser(id: number) {
    if (users[id].status != UserStatus.active) {
      setUsers(
        users.map((item, index) =>
          index == id ? { ...item, status: UserStatus.active } : item
        )
      );
    }
  }

  return { users, saveUsers, blacklistUser, activateUser };
}
