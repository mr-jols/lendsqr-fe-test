import Images from "@/utils/images";
import Image from "next/image";
import { Fragment } from "react";

interface PaginatorProps {
  currentIndex: number;
  lastIndex: number;
  isLeftButtonEnabled: boolean;
  isRightButtonEnabled: boolean;
  onPaginatorItemClick(val: number): void;
  onLeftButtonClick(): void;
  onRightButtonClick(): void;
}

export default function Paginator({ props }: { props: PaginatorProps }) {
  return (
    <div className="paginate">
      <PaginatorArrow
        props={{
          direction: "left",
          isDisabled: !props.isLeftButtonEnabled,
          onPress: props.onLeftButtonClick,
        }}
      />

      {paginator(props.currentIndex, props.lastIndex).map((item, index) => (
        <Fragment key={index}>
          {item == -1 ? (
            <PaginatorEllipse />
          ) : (
            <PaginatorItem
              props={{
                value: item,
                isActive: item == props.currentIndex,
                onPress: props.onPaginatorItemClick,
              }}
            />
          )}
        </Fragment>
      ))}

      <PaginatorArrow
        props={{
          direction: "right",
          isDisabled: !props.isRightButtonEnabled,
          onPress: props.onRightButtonClick,
        }}
      />
    </div>
  );
}

function PaginatorItem({
  props,
}: {
  props: { isActive: boolean; value: number; onPress: (val: number) => void };
}) {
  return (
    <button
      onClick={() => props.onPress(props.value)}
      className={`visible-cells  ${props.isActive ? "active" : "inactive"}`}
    >
      {props.value}
    </button>
  );
}

function PaginatorArrow({
  props,
}: {
  props: {
    direction: "left" | "right";
    isDisabled: boolean;
    onPress(): void;
  };
}) {
  return (
    <button
      onClick={props.onPress}
      disabled={props.isDisabled}
      className={`image-wrapper ${props.isDisabled ? "inactive" : ""}`}
    >
      <Image
        src={
          props.direction == "right" ? Images.table.next : Images.table.previous
        }
        alt="arrow"
      />
    </button>
  );
}

function PaginatorEllipse() {
  return <div>...</div>;
}

function paginator(currentIndex: number, length: number): number[] {
  if (currentIndex < 1 || currentIndex > length) return [];
  const pick = 5;
  if (length - 1 < pick + 2)
    return new Array(length).fill("").map((_, index) => index + 1);
  if (currentIndex < pick)
    return [
      ...Array(pick)
        .fill("")
        .map((_, index) => index + 1),
      -1,
      length,
    ];
  if (currentIndex + pick > length + 1)
    return [
      1,
      -1,
      ...Array(pick)
        .fill("")
        .map((_, index) => length + 1 - (pick - index)),
    ];
  return [
    1,
    -1,
    ...new Array(pick - 2).fill("").map((_, index) => currentIndex - 1 + index),
    -1,
    length,
  ];
}
