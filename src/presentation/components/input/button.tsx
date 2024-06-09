import { Loader } from "@mantine/core";

interface SubmitButtonProps {
  isLoading: boolean;
  title: string;
  className?: string;
  onClick: () => void;
}

export default function SubmitButtonBuilder({
  props,
}: {
  props: SubmitButtonProps;
}) {
  return (
    <button
      className={`submit-button ${props?.className ?? ""}`}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.isLoading ? <Loader color="white" size={14} /> : props.title}
    </button>
  );
}
