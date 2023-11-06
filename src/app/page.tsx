"use client";

import SearchInputFieldBuilder from "@/components/input/search";
import LinkBuilder from "@/components/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
import Images from "@/utils/images";
import { Divider, Drawer } from "@mantine/core";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="side-container">
        <div className="navx">
        <Nav />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-section">
        <div className="nav-link nav-link--prominent">
          <div>
            <div className="nav-link-icon-wrapper">
              <Image src={Images.sidenav.organization} alt="icon" />
            </div>
            <p>Select Organization</p>
            <div className="nav-link-icon-wrapper">
              <Image src={Images.sidenav.nav_dropdown} alt="dropdown icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="nav-section nav-section--smallest-margin">
        <NavLinkItem
          props={{
            icon: Images.sidenav.dashboard,
            title: "Dashboard",
            href: "/dashboard",
          }}
        />
      </div>

      <div className="nav-section nav-section--smaller-margin">
        <p className="nav-section-title">Customer</p>
        <ul>
          {dashboardLinksData.customers.map((item, index) => (
            <li key={index}>
              <NavLinkItem props={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-section">
        <p className="nav-section-title">Business</p>
        <ul>
          {dashboardLinksData.business.map((item, index) => (
            <li key={index}>
              <NavLinkItem props={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-section">
        <p className="nav-section-title">Settings</p>
        <ul>
          {dashboardLinksData.settings.map((item, index) => (
            <li key={index}>
              <NavLinkItem props={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-section nav-section--with-divider">
        <NavLinkItem
          props={{
            icon: Images.sidenav.logout,
            title: "Logout",
            href: "/login",
            isProminent: true,
          }}
        />
      </div>

      <div className="nav-footer">
        <span>v1.2.0</span>
      </div>
    </nav>
  );
}

function NavLinkItem({ props }: { props: LinkItem }) {
  return (
    <LinkBuilder
      props={{
        child: (
          <div>
            <div className="nav-link-icon-wrapper">
              <Image src={props.icon} alt="icon" />
            </div>
            <p>{props.title}</p>
          </div>
        ),
        className: `nav-link ${
          props.isActive
            ? "nav-link--active"
            : props.isProminent
            ? "nav-link--prominent"
            : ""
        }`,
        href: props.href,
      }}
    />
  );
}

interface DashboardLinksProps {
  customers: LinkItem[];
  business: LinkItem[];
  settings: LinkItem[];
}

interface LinkItem {
  icon: StaticImport;
  title: string;
  href?: string;
  isActive?: boolean;
  isProminent?: boolean;
}

const dashboardLinksData: DashboardLinksProps = {
  customers: [
    {
      title: "Users",
      icon: Images.sidenav.users,
      isActive: true,
      href: "dashboard/users",
    },
    {
      title: "Guarantors",
      icon: Images.sidenav.guarantors,
      href: "dashboard/guarantors",
    },
    {
      title: "Loans",
      icon: Images.sidenav.loans,
      href: "dashboard/loans",
    },
    {
      title: "Decision Models",
      icon: Images.sidenav.decision_models,
      href: "dashboard/decison-models",
    },
    {
      title: "Savings",
      icon: Images.sidenav.savings,
      href: "dashboard/savings",
    },
    {
      title: "Loan Requests",
      icon: Images.sidenav.loan_requests,
      href: "dashboard/loan-requests",
    },
    {
      title: "Whitelist",
      icon: Images.sidenav.whitelist,
      href: "dashboard/whitelist",
    },
    {
      title: "Karma",
      icon: Images.sidenav.karma,
      href: "dashbaord/karma",
    },
  ],
  business: [
    {
      title: "Organization",
      icon: Images.sidenav.organization,
      href: "dashboard/organization",
    },
    {
      title: "Loan Products",
      icon: Images.sidenav.loan_products,
      href: "dashboard/loan-products",
    },
    {
      title: "Savings Products",
      icon: Images.sidenav.saving_products,
      href: "dashboard/savings-products",
    },
    {
      title: "Fees and Charges",
      icon: Images.sidenav.fees_and_charges,
      href: "dashboard/fees-and-charges",
    },
    {
      title: "Transactions",
      icon: Images.sidenav.transactions,
      href: "dashboard/transactions",
    },
    {
      title: "Services",
      icon: Images.sidenav.services,
      href: "dashbaord/services",
    },
    {
      title: "Service Account",
      icon: Images.sidenav.service_account,
      href: "dashboard/service-account",
    },
    {
      title: "Settlements",
      icon: Images.sidenav.settlements,
      href: "dashboard/settlements",
    },
    {
      title: "Reports",
      icon: Images.sidenav.reports,
      href: "dashboard/reports",
    },
  ],
  settings: [
    {
      title: "Preferences",
      icon: Images.sidenav.preferences,
      href: "dashboard/preferences",
    },
    {
      title: "Fees and Pricing",
      icon: Images.sidenav.fees_and_pricing,
      href: "dashboard/fees-and-pricing",
    },
    {
      title: "Audit logs",
      icon: Images.sidenav.audit_logs,
      href: "dashboard/audit-logs",
    },
    {
      title: "System Messages",
      icon: Images.sidenav.system_messages,
      href: "dashboard/system-messages",
    },
  ],
};

function HamburgerMenu({
  props,
}: {
  props: { isOpen: boolean; onClick: () => void };
}) {
  return (
    <button className="hamburger-menu" onClick={props.onClick}>
      <div className="hamburger-wrapper">
        <Image
          src={
            props.isOpen
              ? Images.header.menu_close_icon : Images.header.menu_open_icon
          }
          alt={props.isOpen ?"menu_close_icon": "menu_open_icon"  }
        />
      </div>
    </button>
  );
}

function HeaderItems() {
  return (
    <div className="header-items">
      <span className="docs">Docs</span>
      <div className="notification-icon-wrapper">
        <Image src={Images.header.notification_icon} alt="notification icon" />
      </div>
      <div className="avatar-wrapper">
        <Image src={Images.header.avatar} alt="avatar" />
      </div>
      <span className="user-name">Adedeji</span>
      <div className="dropdown-icon-wrapper">
        <Image src={Images.header.dropdown_icon} alt="dropdown icon" />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-icon-wrapper logo-icon-wrapper--smaller">
      <Image src={Images.logo_icon} alt="logo icon" className="logo-icon" />
    </div>
  );
}

function Header() {
  const [toggle, handleToggle] = useToggle();
  const matches = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    if (matches && toggle) handleToggle();
  }, [toggle, matches]);

  return (
    <header className="header">
      <Logo />
      <SearchInputFieldBuilder />
      <HeaderItems />
      <HamburgerMenu
        props={{
          isOpen: toggle,
          onClick: handleToggle,
        }}
      />
      <Drawer
        opened={toggle}
        onClose={handleToggle}
        withCloseButton={false}
        position="left"
        size="290px"
        styles={{
          body: {  padding: 0 },
          header: { },
        }}
      >
        <Nav />
      </Drawer>
    </header>
  );
}
