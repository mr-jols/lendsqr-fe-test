"use client";
import { Loader } from "@mantine/core";

interface SubmitButtonProps {
  isLoading: boolean;
  title: string;
  className?: string;
}

function SubmitButtonBuilder({ props }: { props: SubmitButtonProps }) {
  return (
    <button className={`submit-button ${props?.className ?? ""}`}>
      {props.isLoading ? <Loader color="white" size={14} /> : props.title}
    </button>
  );
}

export default function Home() {
  return (
    <main className="center-container">
      <SubmitButtonBuilder
        props={{
          title: "LOG IN",
          isLoading: false,
          className: "submit-button--green",
        }}
      />
    </main>
  );
}
