import "@/styles/main.scss";
import Head from "next/head";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lendsqr Fe Test",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.icon"></link>
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
