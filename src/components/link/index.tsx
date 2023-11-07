import Link from "next/link";

export interface LinkProps {
  href?: string;
  child: JSX.Element;
  className?: string;
}

export default function LinkBuilder({ props }: { props: LinkProps }) {
  return (
    <Link href={props?.href ?? "#"} className={props?.className ?? ""}>
      {props.child}
    </Link>
  );
}
