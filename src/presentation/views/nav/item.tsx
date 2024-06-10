import LinkBuilder from "@/presentation/components/link";
import Image from "next/image";
import { NavItemProps } from ".";

export default function NavItem({ props }: { props: NavItemProps }) {
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
