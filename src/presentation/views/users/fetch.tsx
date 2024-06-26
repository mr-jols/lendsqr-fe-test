import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { UsersResponse } from "@/models/response/user";
import { BASE_URL } from "@/utils/constansts";
import { useContext, useEffect } from "react";
import { usersResponseToDomain } from "@/models/domain/user";

export default function UserFetch() {
  const [data] = useFetchQuery<UsersResponse>(`${BASE_URL}/users`);
  const { saveUsers } = useContext(UsersContext) as UsersContextType;
  useEffect(() => {
    // if data returns a value set users in state and save to local storage
    if (data?.length != 0 && data != null) {
      // Converts UsersResponse to Users domain object
      saveUsers(usersResponseToDomain(data));
    }
  }, [data]);

  return <></>;
}
