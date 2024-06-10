import { UserStatus } from "@/models/domain/user";
import { createContext, useEffect, useState } from "react";

interface TableFilter {
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
  
  return {
    resetState() {
      setState(tableInitialState);
    },
    setState,
    state,
  };
}
