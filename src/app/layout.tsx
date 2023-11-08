"use client";
import { Work_Sans } from "next/font/google";
import "@/styles/main.scss";
import { MantineProvider } from "@mantine/core";
import useUsers, { UsersContext } from "@/context/useUsers";
import "@mantine/core/styles.css";
import Head from "next/head";

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { users, blacklistUser, activateUser, saveUsers } = useUsers();

  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/favicon.icon"></link>
      <title>Lendsqr fe test</title>
      </Head>
      <UsersContext.Provider
        value={{ users, blacklistUser, activateUser, saveUsers }}
      >
        <MantineProvider>
          <body >{children}</body>
        </MantineProvider>
      </UsersContext.Provider>
    </html>
  );
}
