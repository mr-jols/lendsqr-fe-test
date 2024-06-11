import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import { UserStatus } from "@/models/domain/user";
import FeedbackButtonBuilder from "@/presentation/components/button";
import { useContext } from "react";

export default function UserDetailHeaderWithActions({
  props,
}: {
  props: { id: number };
}) {
  const { blacklistUser, activateUser,users } = useContext(
    UsersContext
  ) as UsersContextType;
  return (
    <div className="user-details-header">
      <h5 className="dashboard-title">User Details</h5>

      <div className="user-details-actions">
        <FeedbackButtonBuilder
          props={{
            isDisabled:users[props.id].status==UserStatus.blacklisted,
            className:
              "user-details-actions-button user-details-actions-button--blacklist",
            feedback: "Blacklisted !",
            onClick() {
              blacklistUser(props.id);
            },
            title: "Blacklist User",
          }}
        />

        <FeedbackButtonBuilder
          props={{
            isDisabled:users[props.id].status==UserStatus.active,
            className:
              "user-details-actions-button user-details-actions-button--activate",
            feedback: "Activated !",
            onClick() {
              activateUser(props.id);
            },
            title: "Activate User",
          }}
        />
      </div>
    </div>
  );
}
