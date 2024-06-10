import { formatDate } from "@/utils/functions";
import { UserResponse } from "../response/user";

export interface User extends Omit<UserResponse, "maritalstatus"> {
  status: UserStatus;
  maritalstatus: string;
}

export enum UserStatus {
  active,
  inactive,
  blacklisted,
  pending,
}

export function userResponseToDomain(users: UserResponse[]): User[] {
    //arbitrary mapper of UserResponse to User Domain Object
  return users.map((item) => ({
    ...item,
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
