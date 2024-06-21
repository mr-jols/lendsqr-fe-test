import { formatDate } from "@/utils/functions";
import { UserResponse } from "../response/user";

export interface User extends Omit<UserResponse, "maritalstatus" | "status"> {
  status: UserStatus;
  maritalstatus: string;
  index:number
}

export enum UserStatus {
  active = "Active",
  inactive = "Inactive",
  blacklisted = "Blacklisted",
  pending = "Pending",
}

export function stringToUserStatus(val: string): UserStatus | null {
  switch (val) {
    case "Active":
      return UserStatus.active;
    case "Inactive":
      return UserStatus.inactive;
    case "Blacklisted":
      return UserStatus.blacklisted;
    case "Pending":
      return UserStatus.pending;
    default:
      return null;
  }
}

export function usersResponseToDomain(users: UserResponse[]): User[] {
  //arbitrary mapper of UserResponse to User Domain Object
  return users.map((item,index) => ({
    ...item,
    index,
    phone_number: item.phone_number.substring(0, 12),
    date_joined: formatDate(item.date_joined),
    maritalstatus: item.maritalstatus ? "Single" : "Married",
    children: item.children % 4,
    tier: item.tier % 3,
    organization:
      item.children % 5 == 0
        ? "Lendsqr"
        : item.children % 5 == 1
        ? "Irorun"
        : item.organization,
    status:
      item.status % 4 == 0
        ? UserStatus.pending
        : item.status % 4 == 1
        ? UserStatus.active
        : item.status % 4 == 2
        ? UserStatus.blacklisted
        : UserStatus.inactive,
  }));
}
