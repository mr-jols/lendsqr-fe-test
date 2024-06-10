import LinkBuilder from "@/presentation/components/link";
import Images from "@/utils/images";
import Image from "next/image";

export default function HeaderItems() {
  return (
    <div className="header-items">
      <LinkBuilder
        props={{
          child: <>Docs</>,
          className: "docs",
          href: "/docs",
        }}
      />
      <div className="notification-icon-wrapper">
        <Image src={Images.header.notification} alt="notification icon" />
      </div>
      <div className="avatar-wrapper">
        <Image src={Images.header.avatar} alt="avatar" />
      </div>
      <span className="user-name">{localStorage.getItem("loggedInUser")}</span>
      <div className="dropdown-icon-wrapper">
        <Image src={Images.header.dropdown} alt="dropdown icon" />
      </div>
    </div>
  );
}
