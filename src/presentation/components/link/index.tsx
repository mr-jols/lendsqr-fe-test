import Link from "next/link";

export interface LinkProps {
  href?: string;
  child: JSX.Element;
  className?: string;
  disablePrefetch?: boolean;
}

export default function LinkBuilder({ props }: { props: LinkProps }) {
  return (
    <Link
      href={props?.href ?? "#"}
      className={props?.className ?? ""}
      prefetch={!Boolean(props.disablePrefetch)}
    >
      {props.child}
    </Link>
  );
}
