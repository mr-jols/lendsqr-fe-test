import useToggle from "@/hooks/useToggle";
import { Box, Popover } from "@mantine/core";
import { useEffect } from "react";

interface FeedbackButtonProps {
  feedback: string;
  className: string;
  onClick(): void;
  title: string;
  isDisabled: boolean;
}

export default function FeedbackButtonBuilder({
  props,
}: {
  props: FeedbackButtonProps;
}) {
  const [toggle, handleToggle] = useToggle();
  let timeoutId: any;

  useEffect(() => {
    if (toggle) {
      timeoutId = setTimeout(() => {
        handleToggle();
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [toggle]);

  return (
    <Popover position="top" withArrow shadow="md" opened={toggle}>
      <Popover.Target>
        <Box>
          <button
            className={props.className}
            style={props.isDisabled ? { opacity: "0.3" } : {}}
            onClick={() => {
              if (!props.isDisabled) {
                handleToggle();
                props.onClick();
              }
            }}
          >
            {props.title}
          </button>
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: "none" }}>
        <p>{props.feedback}</p>
      </Popover.Dropdown>
    </Popover>
  );
}
