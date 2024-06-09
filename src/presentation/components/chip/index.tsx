function ChipBuilder({
  props,
}: {
  props: { title: string; className: string };
}) {
  return <span className={`chip ${props.className}`}>{props.title}</span>;
}

export function BlacklistedChipBuilder() {
  return (
    <ChipBuilder
      props={{
        className: "chip--blacklisted",
        title: "Blacklisted",
      }}
    />
  );
}

export function ActiveChipBuilder() {
  return (
    <ChipBuilder
      props={{
        className: "chip--active",
        title: "Active",
      }}
    />
  );
}

export function PendingChipBuilder() {
  return (
    <ChipBuilder
      props={{
        className: "chip--pending",
        title: "Pending",
      }}
    />
  );
}

export function InactiveChipBuilder() {
  return (
    <ChipBuilder
      props={{
        className: "chip--inactive",
        title: "Inactive",
      }}
    />
  );
}
