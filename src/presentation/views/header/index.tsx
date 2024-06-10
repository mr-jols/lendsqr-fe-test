import SearchInputFieldBuilder from "@/presentation/components/input/search";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
import Images from "@/utils/images";
import { Drawer } from "@mantine/core";
import Image from "next/image";
import { useEffect } from "react";
import Nav from "../nav";

export default function Header() {
  const [toggle, handleToggle] = useToggle();
  const matches = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    if (matches && toggle) handleToggle();
  }, [toggle, matches]);

  return (
    <header className="header">
      <div className="left-section">
        <Logo />
        <SearchInputFieldBuilder />
      </div>
      <div>
        <HeaderItems />
        <HamburgerMenu
          props={{
            isOpen: toggle,
            onClick: handleToggle,
          }}
        />
        <Drawer
          opened={toggle}
          onClose={handleToggle}
          withCloseButton={false}
          position="left"
          size="290px"
          styles={{
            body: { padding: 0 },
          }}
        >
          <Nav />
        </Drawer>
      </div>
    </header>
  );
}

function HamburgerMenu({
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

function HeaderItems() {
  return (
    <div className="header-items">
      <span className="docs">Docs</span>
      <div className="notification-icon-wrapper">
        <Image src={Images.header.notification} alt="notification icon" />
      </div>
      <div className="avatar-wrapper">
        <Image src={Images.header.avatar} alt="avatar" />
      </div>
      <span className="user-name">Adedeji</span>
      <div className="dropdown-icon-wrapper">
        <Image src={Images.header.dropdown} alt="dropdown icon" />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-icon-wrapper logo-icon-wrapper--smaller">
      <Image src={Images.logo} alt="logo icon" className="logo-icon" />
    </div>
  );
}
