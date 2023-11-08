import Images from "@/utils/images";
import { Menu } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

export default function HeadingFilters({
  props,
}: {
  props: { title: string };
}) {
  const [opened, setOpened] = useState(false);
  return (
    <div className="heading-content">
      {props.title}
      <Menu opened={false} onChange={setOpened} width={270}>
        <Menu.Target>
          <div className="image-wrapper">
            <Image src={Images.table.filter} alt="filter icon" />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          {
            //Todo: add filter table
          }
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
