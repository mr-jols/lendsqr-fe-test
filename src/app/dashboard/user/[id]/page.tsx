"use client";
import UserDetailBackButton from "./view/back_button";
import UserDetailIntroSection from "./view/intro_section";
import UserDetailBodySection from "./view/body_section";
import UserDetailHeaderWithActions from "./view/header";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (isNaN(Number(params.id)) || Number(params.id) < 1) {
      router.push("/dashboard/users");
    }
  }, []);

  return (
    <div className="user-details">
      <UserDetailBackButton />
      <UserDetailHeaderWithActions props={{ id: Number(params.id) }} />
      <UserDetailIntroSection props={{ id: Number(params.id) }} />
      <UserDetailBodySection props={{ id: Number(params.id) }} />
    </div>
  );
}
