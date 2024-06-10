"use client";
import UserDetailBackButton from "../../../../presentation/views/user/back_button";
import UserDetailIntroSection from "../../../../presentation/views/user/intro_section";
import UserDetailBodySection from "../../../../presentation/views/user/body_section";
import UserDetailHeaderWithActions from "../../../../presentation/views/user/header";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import { UsersContext, UsersContextType } from "@/context/useUsers";

export default function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [toggle, handleToggle] = useToggle();
  const { users } = useContext(UsersContext) as UsersContextType;

  useEffect(() => {
    window.scrollTo(0, 0);
    //navigate to dashboard if params is invalid
    if (
      isNaN(Number(params.id)) ||
      Number(params.id) < 1 ||
      Number(params.id) > users.length
    ) {
      router.push("/dashboard/users");
    } else {
      handleToggle();
    }
  }, []);

  return !toggle ? (
    <></>
  ) : (
    <div className="user-details">
      <UserDetailBackButton />
      <UserDetailHeaderWithActions props={{ id: Number(params.id) }} />
      <UserDetailIntroSection props={{ id: Number(params.id) }} />
      <UserDetailBodySection props={{ id: Number(params.id) }} />
    </div>
  );
}
