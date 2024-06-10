import Images from "@/utils/images";
import Image from "next/image";

export default function HamburgerMenu({
  props,
}: {
  props: { isOpen: boolean; onClick: () => void };
}) {
  return (
    <button className="hamburger-menu" onClick={props.onClick}>
      <div className="hamburger-wrapper">
        <Image
          src={
            props.isOpen ? Images.header.menu_close : Images.header.menu_open
          }
          alt={props.isOpen ? "menu_close_icon" : "menu_open_icon"}
        />
      </div>
    </button>
  );
}
