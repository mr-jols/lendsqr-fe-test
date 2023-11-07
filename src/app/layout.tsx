"use client";
import { Work_Sans } from "next/font/google";
import "@/styles/main.scss";
import { MantineProvider } from "@mantine/core";
import useUsers, { UsersContext } from "@/context/useUsers";
import "@mantine/core/styles.css";

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Lendsqr fe test",
//   description: "",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { users, blacklistUser, activateUser, saveUsers } = useUsers();
  
  return (
    <html lang="en">
      <UsersContext.Provider
        value={{ users, blacklistUser, activateUser, saveUsers }}
      >
        <MantineProvider>
          <body className={workSans.className}>{children}</body>
        </MantineProvider>
      </UsersContext.Provider>
    </html>
  );
}
