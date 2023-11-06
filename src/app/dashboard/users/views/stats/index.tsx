import Images from "@/utils/images";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface UserStatsCardBuilderProps {
  icon: StaticImport;
  color?: string;
  title: string;
  content: string;
}

const userStatsCardsData: UserStatsCardBuilderProps[] = [
  {
    icon: Images.dashboard.dashboard_users,
    title: "Users",
    content: "2,453",
  },
  {
    icon: Images.dashboard.active_users,
    title: "Active Users",
    content: "2,453",
    color: "user-stats-card-icon--variant-one",
  },
  {
    icon: Images.dashboard.users_with_loan,
    title: "Users with loans",
    content: "12,453",
    color: "user-stats-card-icon--variant-two",
  },
  {
    icon: Images.dashboard.users_with_savings,
    title: "Users with Savings",
    content: "102,453",
    color: "user-stats-card-icon--variant-three",
  },
];

export default function UserStats() {
  return (
    <div className="user-stats">
      <h5 className="title">Users</h5>
      <div className="user-stats-cards">
        {userStatsCardsData.map((item, index) => (
          <div key={index}>
            <UserStatsCardItemBuilder props={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function UserStatsCardItemBuilder({
  props,
}: {
  props: UserStatsCardBuilderProps;
}) {
  return (
    <div className="user-stats-card">
      <div className={`user-stats-card-icon ${props?.color ?? ""}`}>
        <div className="image-wrapper">
          <Image src={props.icon} alt="users icon" />
        </div>
      </div>
      <div>
        <p className="user-stats-card-title">{props.title}</p>
        <p className="user-stats-card-content">{props.content}</p>
      </div>
    </div>
  );
}
