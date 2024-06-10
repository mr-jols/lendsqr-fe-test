import Image from "next/image";
import { UsersStatsCardProps } from ".";

export default function UsersStatsCardItem({
  props,
}: {
  props: UsersStatsCardProps;
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
