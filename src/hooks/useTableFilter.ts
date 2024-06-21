import { User, UserStatus } from "@/models/domain/user";
import { isStringContained } from "@/utils/functions";
import { createContext, useState } from "react";

export interface TableFilter {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: UserStatus | null;
}

export interface TableFilterContextType {
  state: TableFilter;
  setState(state: TableFilter): void;
  resetState(): void;
  filterUsers(users: User[]): User[];
}

export const TableFilterContext = createContext<TableFilterContextType | null>(
  null
);

export const tableInitialState: TableFilter = {
  organization: "All",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: null,
};

export default function useTableFilter(): TableFilterContextType {
  const [state, setState] = useState<TableFilter>(tableInitialState);

  function filterUsers(users: User[]): User[] {
    return users.filter((item) => {
      if (
        (item.organization == state.organization ||
          state.organization == tableInitialState.organization) &&
        (isStringContained(item.fullname, state.username) ||
          state.username == tableInitialState.username) &&
        (isStringContained(item.email, state.email) ||
          state.email == tableInitialState.email) &&
        (isStringContained(item.phone_number, state.phoneNumber) ||
          state.phoneNumber == tableInitialState.phoneNumber) &&
        (item.date_joined == state.date ||
          state.date == tableInitialState.date) &&
        (item.status == state.status ||
          state.status == tableInitialState.status)
      )
        return true;

      return false;
    });
  }

  return {
    resetState() {
      setState(tableInitialState);
    },
    setState,
    state,
    filterUsers,
  };
}
