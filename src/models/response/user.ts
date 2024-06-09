import { UserState, UserStatus } from "@/context/useUsers";
import { formatDate } from "@/utils/functions";

export interface UserResponse {
  createdAt: string;
  organization: string;
  username: string;
  phone_number: string;
  date_joined: string;
  status: number;
  email: string;
  fullname: string;
  bvn: string;
  gender: string;
  maritalstatus: boolean;
  children: number;
  residence_type: boolean;
  education_level: boolean;
  employment_status: boolean;
  employment_sector: string;
  employment_duration: string;
  office_email: string;
  monthly_income: string;
  loan_repayment: string;
  twitter: string;
  avatar: string;
  faceboook: string;
  instagram: string;
  guarantor_name: string;
  guarantor_phone_number: string;
  guarantor_email: string;
  guarantor_relationship: number;
  id: string;
  tier: number;
  amount: string;
}

export type UsersResponse = UserResponse[];

//transforms api response to app state model
export function toDomain(users: UserResponse[]): UserState[] {
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
