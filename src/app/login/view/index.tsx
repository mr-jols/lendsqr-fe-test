"use client";
import Images from "@/utils/images";
import Image from "next/image";
import LeftSection from "./left_section";
import RightSection from "./right_section";

export default function LoginView() {
  return (
    <main>
      <div className="login-wrapper">
        <div className="positioned-wrapper">
          <div className="logo-icon-wrapper">
            <Image
              src={Images.logo}
              alt="logo icon"
              className="logo-icon"
            />
          </div>
        </div>
        <LeftSection />
        <RightSection />
      </div>
    </main>
  );
}


