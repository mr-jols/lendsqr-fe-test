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
import {
  ActiveChipBuilder,
  BlacklistedChipBuilder,
  InactiveChipBuilder,
  PendingChipBuilder,
} from "@/presentation/components/chip";
import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import { ActionTooltip } from "./actions";
import HeadingFilters from "./filters";
import { User, UserStatus } from "@/models/domain/user";
import {
  TableFilterContext,
  TableFilterContextType,
} from "@/hooks/useTableFilter";
import Paginator from "./paginator";

interface UserTableProps {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  action: User[];
}

const columnHelper = createColumnHelper<UserTableProps>();

const columns = [
  columnHelper.accessor("organization", {
    header: (_) => <HeadingFilters props={{ title: "Organization" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("username", {
    header: (_) => <HeadingFilters props={{ title: "Username" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: (_) => <HeadingFilters props={{ title: "Email" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phoneNumber", {
    header: (_) => <HeadingFilters props={{ title: "Phone Number" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateJoined", {
    header: (_) => <HeadingFilters props={{ title: "Date joined" }} />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: (_) => <HeadingFilters props={{ title: "Status" }} />,
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
    cell(info) {
      return (
        <div>
          <ActionTooltip props={{ index: info.getValue()[info.row.index ].index }} />
        </div>
      );
    },
  }),
];


export default function UsersTable() {
  const { users } = useContext(UsersContext) as UsersContextType;
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { state: filterState, filterUsers } = useContext(
    TableFilterContext
  ) as TableFilterContextType;

  const filteredUsers=filterUsers(users);

  const data = useMemo(
    () => [
      ...filteredUsers.map((item) => ({
        organization: item.organization,
        username: item.fullname,
        email: item.email,
        phoneNumber: item.phone_number,
        dateJoined: item.date_joined,
        status: item.status,
        action: filteredUsers,
      })),
    ],
    [users, filterState]
  );

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
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
          <span>out of {users.length}</span>
        </div>

        <Paginator
          props={{
            currentIndex: table.getState().pagination.pageIndex + 1,
            lastIndex: table.getPageCount(),
            isLeftButtonEnabled: table.getCanPreviousPage(),
            isRightButtonEnabled: table.getCanNextPage(),
            onLeftButtonClick: () => table.previousPage(),
            onRightButtonClick: () => table.nextPage(),
            onPaginatorItemClick: (item) => table.setPageIndex(item - 1),
          }}
        />
      </div>
    </div>
  );
}
