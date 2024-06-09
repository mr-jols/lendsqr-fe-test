import Images from "@/utils/images";
import Image from "next/image";

export default function LeftSection() {
    return (
      <section className="login-section login-section--left">
        <div>
          <Image
            src={Images.login_illustration}
            alt="logo illustration"
            className="login-illustration"
          />
        </div>
      </section>
    );
  }
  