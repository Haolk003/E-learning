import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/utils/next-themes";
import Header from "@/components/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="">{children}</div>
    </>
  );
}
