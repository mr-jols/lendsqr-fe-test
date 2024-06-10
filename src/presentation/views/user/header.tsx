import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import FeedbackButtonBuilder from "@/presentation/components/button";
import { useContext } from "react";

export default function UserDetailHeaderWithActions({
  props,
}: {
  props: { id: number };
}) {
  const { blacklistUser, activateUser } = useContext(
    UsersContext
  ) as UsersContextType;
  return (
    <div className="user-details-header">
      <h5 className="dashboard-title">User Details</h5>

      <div className="user-details-actions">
        <FeedbackButtonBuilder
          props={{
            className:
              "user-details-actions-button user-details-actions-button--blacklist",
            feedback: "Blacklisted !",
            onClick() {
              blacklistUser(props.id - 1);
            },
            title: "Blacklist User",
          }}
        />

        <FeedbackButtonBuilder
          props={{
            className:
              "user-details-actions-button user-details-actions-button--activate",
            feedback: "Activated !",
            onClick() {
              activateUser(props.id - 1);
            },
            title: "Activate User",
          }}
        />
      </div>
    </div>
  );
}
