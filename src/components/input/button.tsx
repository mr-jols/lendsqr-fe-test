import { Loader } from "@mantine/core";

interface SubmitButtonProps {
    isLoading: boolean;
    title: string;
    className?: string;
  }
  
  export default function SubmitButtonBuilder({ props }: { props: SubmitButtonProps }) {
    return (
      <button className={`submit-button ${props?.className ?? ""}`}>
        {props.isLoading ? <Loader color="white" size={14} /> : props.title}
      </button>
    );
  }
  
