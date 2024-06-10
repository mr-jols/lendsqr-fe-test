import RatingBuilder from "@/presentation/components/rating";
import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import Image from "next/image";
import { useContext } from "react";

export default function UserDetailIntroSection({
  props,
}: {
  props: { id: number };
}) {
  const { users } = useContext(UsersContext) as UsersContextType;

  return (
    <section className="user-details-section">
      <div className="user-details-section-intro">
        <div className="avatar-wrapper">
          {users[props.id]?.avatar && (
            <Image
              src={users[props.id].avatar}
              alt="avatar"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="name">
          <h4>{users[props.id]?.fullname ?? ""}</h4>
          <span>{users[props.id]?.username ?? ""}</span>
        </div>
        <div className="tier">
          <span>User’s Tier</span>
          <RatingBuilder props={{ rating: users[props.id]?.tier as any  ?? 1}} />
        </div>
        <div className="account">
          <h4>${users[props.id]?.amount ?? 0}</h4>
          <span>9912345678/Providus Bank</span>
        </div>
      </div>
      <IntroSectionMenu />
    </section>
  );
}

function IntroSectionMenu() {
  return (
    <ul className="user-details-section-intro-menu">
      {[
        "General Details",
        "Documents",
        "Bank Details",
        "Loans",
        "Savings",
        "App and System",
      ].map((item, index) => (
        <li
          className={`user-details-section-intro-menu-item
             ${
               index === 0 ? "user-details-section-intro-menu-item--active" : ""
             }`}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
