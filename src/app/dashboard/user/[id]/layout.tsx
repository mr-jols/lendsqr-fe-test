"use client";
import { UsersContext, UsersContextType } from "@/context/useUsers";
import { useRouter } from "next/navigation";
import { useContext, useEffect} from "react";

export default function UserDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { saveUsers} = useContext(UsersContext) as UsersContextType;
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      saveUsers(JSON.parse(storedData));
    } 
    else{
      router.push("/dashboard/users");
    }
  }, []);


  return <>{children}</>;
}
