import Images from "@/utils/images";
import { NavProps } from ".";

export default <NavProps>{
  customers: [
    {
      title: "Users",
      icon: Images.sidenav.users,
      isActive: true,
      href: "/dashboard/users",
    },
    {
      title: "Guarantors",
      icon: Images.sidenav.guarantors,
      href: "/dashboard/guarantors",
    },
    {
      title: "Loans",
      icon: Images.sidenav.loans,
      href: "/dashboard/loans",
    },
    {
      title: "Decision Models",
      icon: Images.sidenav.decision_models,
      href: "/dashboard/decison-models",
    },
    {
      title: "Savings",
      icon: Images.sidenav.savings,
      href: "/dashboard/savings",
    },
    {
      title: "Loan Requests",
      icon: Images.sidenav.loan_requests,
      href: "/dashboard/loan-requests",
    },
    {
      title: "Whitelist",
      icon: Images.sidenav.whitelist,
      href: "/dashboard/whitelist",
    },
    {
      title: "Karma",
      icon: Images.sidenav.karma,
      href: "/dashbaord/karma",
    },
  ],
  business: [
    {
      title: "Organization",
      icon: Images.sidenav.organization,
      href: "/dashboard/organization",
    },
    {
      title: "Loan Products",
      icon: Images.sidenav.loan_products,
      href: "/dashboard/loan-products",
    },
    {
      title: "Savings Products",
      icon: Images.sidenav.saving_products,
      href: "/dashboard/savings-products",
    },
    {
      title: "Fees and Charges",
      icon: Images.sidenav.fees_and_charges,
      href: "/dashboard/fees-and-charges",
    },
    {
      title: "Transactions",
      icon: Images.sidenav.transactions,
      href: "/dashboard/transactions",
    },
    {
      title: "Services",
      icon: Images.sidenav.services,
      href: "/dashbaord/services",
    },
    {
      title: "Service Account",
      icon: Images.sidenav.service_account,
      href: "/dashboard/service-account",
    },
    {
      title: "Settlements",
      icon: Images.sidenav.settlements,
      href: "/dashboard/settlements",
    },
    {
      title: "Reports",
      icon: Images.sidenav.reports,
      href: "/dashboard/reports",
    },
  ],
  settings: [
    {
      title: "Preferences",
      icon: Images.sidenav.preferences,
      href: "/dashboard/preferences",
    },
    {
      title: "Fees and Pricing",
      icon: Images.sidenav.fees_and_pricing,
      href: "/dashboard/fees-and-pricing",
    },
    {
      title: "Audit logs",
      icon: Images.sidenav.audit_logs,
      href: "/dashboard/audit-logs",
    },
    {
      title: "System Messages",
      icon: Images.sidenav.system_messages,
      href: "/dashboard/system-messages",
    },
  ],
};
