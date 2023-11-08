import { FormHookOutputProps } from "@/hooks/useForm";
import { createContext } from "react";

export const FilterFormContext = createContext<FormHookOutputProps | null>(
  null
);
