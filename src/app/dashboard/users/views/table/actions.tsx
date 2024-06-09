import LinkBuilder from "@/presentation/components/link";
import { UsersContext, UsersContextType } from "@/context/useUsers";
import Images from "@/utils/images";
import { Menu } from "@mantine/core";
import Image from "next/image";
import { useContext, useState } from "react";

export function ActionTooltip({ props }: { props: { index: number } }) {
    const [opened, setOpened] = useState(false);
    const { blacklistUser, activateUser } = useContext(
      UsersContext
    ) as UsersContextType;
    return (
      <Menu opened={opened} onChange={setOpened} width={190}>
        <Menu.Target>
          <button className="action-tooltip">
            <div className="image-wrapper">
              <Image src={Images.table.actions} alt="actions icon" />
            </div>
          </button>
        </Menu.Target>
  
        <Menu.Dropdown>
          <div className="action-tooltip-menu">
            <LinkBuilder
              props={{
                child: (
                  <>
                    <div className="menu-image-wrapper">
                      <Image src={Images.menu.view} alt="menu icon" />
                    </div>
                    <span>View Detail</span>
                  </>
                ),
                href: `/dashboard/user/${props.index + 1}`,
                className: "action-tooltip-menu-item",
              }}
            />
  
            <button
              className="action-tooltip-menu-item"
              onClick={() => blacklistUser(props.index)}
            >
              <div className="menu-image-wrapper">
                <Image src={Images.menu.deactivate} alt="menu icon" />
              </div>
              <span>Blacklist User</span>
            </button>
  
            <button
              className="action-tooltip-menu-item"
              onClick={() => activateUser(props.index)}
            >
              <div className="menu-image-wrapper">
                <Image src={Images.menu.activate} alt="menu icon" />
              </div>
              <span>Activate User</span>
            </button>
          </div>
        </Menu.Dropdown>
      </Menu>
    );
  }
  