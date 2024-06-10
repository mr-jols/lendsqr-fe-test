import { Skeleton } from "@mantine/core";

export default function UsersSkeleton() {
  return (
    <div>
      {new Array(5).fill("").map((item, index) => (
        <div key={index}>
          <Skeleton height={40} mb={20} radius="xl" />
        </div>
      ))}
    </div>
  );
}
