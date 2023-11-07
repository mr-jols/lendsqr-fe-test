import {
  ExpandedState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useMemo, useState } from "react";
import Images from "@/utils/images";
import Image from "next/image";
import {
  ActiveChipBuilder,
  BlacklistedChipBuilder,
  InactiveChipBuilder,
  PendingChipBuilder,
} from "@/components/chip";
import { UserStatus, UsersContext, UsersContextType } from "@/context/useUsers";
import UserStats from "../stats";
import { Menu } from "@mantine/core";
import LinkBuilder from "@/components/link";

interface UserTableProps {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  action: string;
}

const columnHelper = createColumnHelper<UserTableProps>();

const columns = [
  columnHelper.accessor("organization", {
    header: (_) => <RenderHeading props={{ title: "Organization" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("username", {
    header: (_) => <RenderHeading props={{ title: "Username" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: (_) => <RenderHeading props={{ title: "Email" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phoneNumber", {
    header: (_) => <RenderHeading props={{ title: "Phone Number" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateJoined", {
    header: (_) => <RenderHeading props={{ title: "Date joined" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: (_) => <RenderHeading props={{ title: "Status" }} />,
    cell(info) {
      switch (info.getValue()) {
        case UserStatus.active:
          return <ActiveChipBuilder />;
        case UserStatus.blacklisted:
          return <BlacklistedChipBuilder />;
        case UserStatus.inactive:
          return <InactiveChipBuilder />;
        default:
          return <PendingChipBuilder />;
      }
    },
  }),
  columnHelper.accessor("action", {
    header: "",
    cell(info) {
      return (
        <div>
          <RenderActionTooltip props={{ index: info.row.index }} />
        </div>
      );
    },
  }),
];

export default function UserTable() {
  const { users } = useContext(UsersContext) as UsersContextType;

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const data = useMemo(
    () => [
      ...users.map((item) => ({
        organization: item.organization,
        username: item.fullname,
        email: item.email,
        phoneNumber: item.phone_number,
        dateJoined: item.date_joined,
        status: item.status,
        action: "",
      })),
    ],
    [users]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  return (
    <div>
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    <div className="user-table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-table-functions">
        <div className="expand">
          <span>Showing</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>out of {UserStats.length}</span>
        </div>
      </div>
    </div>
  );
}

function RenderHeading({ props }: { props: { title: string } }) {
  return (
    <div className="heading-content">
      {props.title}
      <div className="image-wrapper">
        <Image src={Images.table.filter} alt="filter icon" />
      </div>
    </div>
  );
}

function RenderActionTooltip({ props }: { props: { index: number } }) {
  const [opened, setOpened] = useState(false);
  const { blacklistUser, activateUser } = useContext(
    UsersContext
  ) as UsersContextType;
  return (
    <Menu opened={opened} onChange={setOpened} width={180}>
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
