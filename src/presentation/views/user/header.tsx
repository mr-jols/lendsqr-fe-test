import { UsersContext, UsersContextType } from "@/hooks/useUsers";
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
        <button
          className="user-details-actions-button user-details-actions-button--blacklist"
          onClick={() => blacklistUser(props.id-1)}
        >
          Blacklist User
        </button>
        <button
          className="user-details-actions-button user-details-actions-button--activate"
          onClick={() => activateUser(props.id-1)}
        >
          Activate User
        </button>
      </div>
    </div>
  );
}
