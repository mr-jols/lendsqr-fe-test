import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import '@mantine/core/styles.css';
import "@/styles/main.scss";
import { MantineProvider } from "@mantine/core";


const workSans = Work_Sans({
  weight: ["400","500","600","700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lendsqr fe test",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <MantineProvider>
        <body className={workSans.className}>{children}</body>
      </MantineProvider>
    </html>
  );
}
