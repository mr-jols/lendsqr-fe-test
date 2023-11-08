"use client";
import "@/styles/main.scss";
import { MantineProvider } from "@mantine/core";
import useUsers, { UsersContext } from "@/context/useUsers";
import "@mantine/core/styles.css";
import useForm, { FormElementType } from "@/hooks/useForm";
import { FilterFormContext } from "@/context/useFormFilter";
import useGlobalFilter, {
  GlobalFilterContext,
} from "@/context/useGlobalFilter";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const { users, blacklistUser, activateUser, saveUsers } = useUsers();
  const { state, dispatch } = useForm([
    {
      index: 0,
      shouldValidate: false,
      errorMessages: "",
      type: FormElementType.text,
      initialValue: "lendsqr",
    },
    ...new Array(5).fill("").map((_, index) => ({
      index: index + 1,
      shouldValidate: false,
      errorMessages: "",
      type: FormElementType.text,
    })),
  ]);
  const globalFilterState = useGlobalFilter();

  return (
    <UsersContext.Provider
      value={{ users, blacklistUser, activateUser, saveUsers }}
    >
      <FilterFormContext.Provider value={{ state, dispatch }}>
        <GlobalFilterContext.Provider value={globalFilterState}>
          <MantineProvider>{children}</MantineProvider>
        </GlobalFilterContext.Provider>
      </FilterFormContext.Provider>
    </UsersContext.Provider>
  );
}
