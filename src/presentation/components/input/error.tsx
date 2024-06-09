export default function ErrorBuilder({ props }: { props: string }) {
  if (props.length == 0) return <></>;
  return <p className="input-error">{props}</p>;
}
