import LinkBuilder from "@/presentation/components/link";
import Images from "@/utils/images";
import Image from "next/image";

export default function UserDetailBackButton() {
  return (
    <LinkBuilder
      props={{
        child: (
          <div className="user-details-back">
            <div className="back-arrow-image-wrapper">
              <Image src={Images.details.back_arrow} alt="back arrow" />
            </div>
            <span>Back to Users</span>
          </div>
        ),
        href: "/dashboard/users",
      }}
    />
  );
}
