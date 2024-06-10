import { User, UserStatus } from "@/models/domain/user";
import { createContext, useEffect, useState } from "react";

export interface UsersContextType {
  users: User[];
  blacklistUser(id: number): void;
  activateUser(id: number): void;
  saveUsers(users: User[]): void;
}

export const UsersContext = createContext<UsersContextType | null>(null);

export default function useUsers(): UsersContextType {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    //stores users in local storage once updated
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  function saveUsers(users: User[]) {
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
