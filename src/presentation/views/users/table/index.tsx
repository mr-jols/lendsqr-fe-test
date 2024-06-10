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
import { UserStatus } from "@/models/domain/user";
import {
  TableFilterContext,
  TableFilterContextType,
  tableInitialState,
} from "@/hooks/useTableFilter";
import { isStringContained } from "@/utils/functions";
import Paginator from "./paginator";

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

export default function UsersTable() {
  const { users } = useContext(UsersContext) as UsersContextType;
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { state: filterState } = useContext(
    TableFilterContext
  ) as TableFilterContextType;

  const data = useMemo(
    () => [
      ...users
        .filter((item) => {
          if (
            (item.organization == filterState.organization ||
              filterState.organization == tableInitialState.organization) &&
            (isStringContained(item.fullname, filterState.username) ||
              filterState.username == tableInitialState.username) &&
            (isStringContained(item.email, filterState.email) ||
              filterState.email == tableInitialState.email) &&
            (isStringContained(item.phone_number, filterState.phoneNumber) ||
              filterState.phoneNumber == tableInitialState.phoneNumber) &&
            (item.date_joined == filterState.date ||
              filterState.date == tableInitialState.date) &&
            (item.status == filterState.status ||
              filterState.status == tableInitialState.status)
          )
            return true;

          return false;
        })
        .map((item) => ({
          organization: item.organization,
          username: item.fullname,
          email: item.email,
          phoneNumber: item.phone_number,
          dateJoined: item.date_joined,
          status: item.status,
          action: "",
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