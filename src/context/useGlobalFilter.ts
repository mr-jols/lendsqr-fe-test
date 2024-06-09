import { createContext, useState } from "react";

export const GlobalFilterContext =
  createContext<GlobalFilterContextType | null>(null);

export interface GlobalFilterContextType {
  globalFilter: string;
  setGlobalFilter: (val: string) => void;
}

export default function useGlobalFilter() {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  return { globalFilter, setGlobalFilter };
}
