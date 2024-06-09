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
} from "@/presentation/components/chip";
import { UserStatus, UsersContext, UsersContextType } from "@/context/useUsers";
import { ActionTooltip } from "./actions";
import HeadingFilters from "./filters";
import {
  GlobalFilterContext,
  GlobalFilterContextType,
} from "@/context/useGlobalFilter";

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
    header: (info) => <HeadingFilters props={{ title: "Organization" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("username", {
    header: (info) => <HeadingFilters props={{ title: "Username" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: (info) => <HeadingFilters props={{ title: "Email" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phoneNumber", {
    header: (info) => <HeadingFilters props={{ title: "Phone Number" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateJoined", {
    header: (info) => <HeadingFilters props={{ title: "Date joined" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: (info) => <HeadingFilters props={{ title: "Status" }} />,
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
          <ActionTooltip props={{ index: info.row.index }} />
        </div>
      );
    },
  }),
];

export default function UserTable() {
  const { users } = useContext(UsersContext) as UsersContextType;
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { globalFilter, setGlobalFilter } = useContext(
    GlobalFilterContext
  ) as GlobalFilterContextType;

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
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    state: {
      expanded,
      globalFilter,
    },
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
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
          <span>out of {users.length}</span>
        </div>

        <div className="paginate">
          <button
            className={`image-wrapper ${
              !table.getCanPreviousPage() ? "inactive" : ""
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Image src={Images.table.previous} alt="previous" />
          </button>
          {ellipses(
            table.getPageCount(),
            table.getState().pagination.pageIndex
          ).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item !== "...") table.setPageIndex(item - 1);
              }}
              className={`visible-cells ${
                table.getState().pagination.pageIndex + 1 == item
                  ? "active"
                  : "inactive"
              }`}
            >
              {item}
            </div>
          ))}

          <button
            className={`image-wrapper ${
              !table.getCanNextPage() ? "inactive" : ""
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Image src={Images.table.next} alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ellipses(input: number, state: number): any[] {
  const array =
    input - 2 <= state + 3
      ? ["...", input - 4, input - 3, input - 2, input - 1, input]
      : [1 + state, 2 + state, 3 + state, "...", input - 1, input];
  return array.filter((item, index) => {
    if (item === "...") return true;
    return (item as number) > 0;
  });
}
