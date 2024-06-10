import { createContext } from "react";
import { UserStatus } from "./useUsers";

export interface UseTableFilter {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: UserStatus;
}

export const TableFilterContext = createContext<UseTableFilter | null>(null);

export default function useTableFilter(){
  
}
