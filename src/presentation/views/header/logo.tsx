import Images from "@/utils/images";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="logo-icon-wrapper logo-icon-wrapper--smaller">
      <Image src={Images.logo} alt="logo icon" className="logo-icon" />
    </div>
  );
}
