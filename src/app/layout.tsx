import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import '../../public/css/app.css';

import Layout from "@/components/Layout/page";
import { anjomanMaxFN } from "./lib/font";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" className={anjomanMaxFN.className}>
      <body 
        className={''}
      >
        <Layout>
          {children}

        </Layout>
      </body>
    </html>
  );
}
