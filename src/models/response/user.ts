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
