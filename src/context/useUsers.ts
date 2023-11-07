"use client";
import { UserResponse } from "@/models/response/user";
import { createContext, useState } from "react";

export enum UserStatus {
  active,
  inactive,
  blacklisted,
  pending,
}

export interface UserState extends UserResponse {
  status: UserStatus;
}

export interface UsersContextType {
  users: UserState[];
  blacklistUser(id: number): void;
  activateUser(id: number): void;
  saveUsers(users: UserState[]): void;
}

export const UsersContext = createContext<UsersContextType | null>(null);

export default function useUsers():UsersContextType {
  const [users, setUsers] = useState<UserState[] | []>([]);

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

  return {users,saveUsers,blacklistUser,activateUser};
}
