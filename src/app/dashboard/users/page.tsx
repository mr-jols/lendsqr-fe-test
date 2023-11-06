"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import UserStats from "./views/stats";
import { useState } from "react";
import Images from "@/utils/images";
import Image from "next/image";
import {
  ActiveChipBuilder,
  BlacklistedChipBuilder,
  InactiveChipBuilder,
  PendingChipBuilder,
} from "@/components/chip";

export default function UsersPage() {
  return (
    <div>
      <UserStats />
      <UserTable />
    </div>
  );
}

enum UserStatus {
  active,
  inactive,
  blacklisted,
  pending,
}

interface UserTableProps {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  action: string;
}

const tableData: UserTableProps[] = new Array(20).fill({
  organization: "Lendsqr",
  username: "Adedeji",
  email: "adedeji@lendsqr.com",
  phoneNumber: "08078903721",
  dateJoined: "May 15, 2020 10:00 AM",
  status: UserStatus.active,
  action: "",
});

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
    cell: (info) => <RenderActionTooltip />,
  }),
];

function UserTable() {
  const [data, setData] = useState(() => [...tableData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

function RenderActionTooltip() {
  return (
    <div className="action-tooltip">
      <div className="image-wrapper">
        <Image src={Images.table.actions} alt="actions icon" />
      </div>
    </div>
  );
}
