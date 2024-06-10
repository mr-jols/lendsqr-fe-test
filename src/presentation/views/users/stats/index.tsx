import { UserStatus, UsersContext, UsersContextType } from "@/context/useUsers";
import Images from "@/utils/images";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useContext, useMemo } from "react";
import UsersStatsCardItem from "./item";

export interface UsersStatsCardProps {
  icon: StaticImport;
  color?: string;
  title: string;
  content: string;
}

export default function UsersStats() {
  const { users } = useContext(UsersContext) as UsersContextType;
  //uses arbitrary logic to group users saved in state into the 4 user categories
  const userStatsCardsData: UsersStatsCardProps[] = useMemo(
    () => [
      {
        icon: Images.dashboard.dashboard_users,
        title: "Users",
        content: users.length.toLocaleString(),
      },
      {
        icon: Images.dashboard.active_users,
        title: "Active Users",
        content: users
          .filter((item) => item.status == UserStatus.active)
          .length.toLocaleString(),
        color: "user-stats-card-icon--variant-one",
      },
      {
        icon: Images.dashboard.users_with_loan,
        title: "Users with loans",
        content: users
          .filter((item) => item.status != UserStatus.inactive)
          .length.toLocaleString(),
        color: "user-stats-card-icon--variant-two",
      },
      {
        icon: Images.dashboard.users_with_savings,
        title: "Users with Savings",
        content: users
          .filter((item) => item.status != UserStatus.blacklisted)
          .length.toLocaleString(),
        color: "user-stats-card-icon--variant-three",
      },
    ],
    [users]
  );

  return (
    <div className="user-stats">
      <h5 className="dashboard-title">Users</h5>
      <div className="user-stats-cards">
        {userStatsCardsData.map((item, index) => (
          <div key={index}>
            <UsersStatsCardItem props={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
