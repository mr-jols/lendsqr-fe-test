import SearchInputFieldBuilder from "@/presentation/components/input/search";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
import { Drawer } from "@mantine/core";
import { useEffect } from "react";
import Nav from "../nav";
import HamburgerMenu from "./hamburger";
import Logo from "./logo";
import HeaderItems from "./items";

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
