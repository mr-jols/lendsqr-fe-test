"use client";
import { MantineProvider } from "@mantine/core";
import useUsers, { UsersContext } from "@/hooks/useUsers";
import "@mantine/core/styles.css";
import useForm, { FormElementType } from "@/hooks/useForm";
import { FilterFormContext } from "@/context/useFormFilter";
import useTableFilter, { TableFilterContext } from "@/hooks/useTableFilter";

export default function Providers({ children }: { children: React.ReactNode }) {
  //used to manage state of users on the dashboard
  const { users, blacklistUser, activateUser, saveUsers } = useUsers();
  //used to manage state the filter form on the dashboard
  const formState = useForm([
    {
      index: 0,
      shouldValidate: false,
      errorMessages: "",
      type: FormElementType.text,
      initialValue: "All",
    },
    ...new Array(5).fill("").map((_, index) => ({
      index: index + 1,
      shouldValidate: false,
      errorMessages: "",
      type: FormElementType.text,
    })),
  ]);
  //used to manage table filter state
  const tableFilterState = useTableFilter();

  return (
    <UsersContext.Provider
      value={{ users, blacklistUser, activateUser, saveUsers }}
    >
      <FilterFormContext.Provider value={formState}>
        <TableFilterContext.Provider value={tableFilterState}>
          <MantineProvider>{children}</MantineProvider>
        </TableFilterContext.Provider>
      </FilterFormContext.Provider>
    </UsersContext.Provider>
  );
}
