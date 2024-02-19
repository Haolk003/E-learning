import React from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Heading description="dda" keyword="das" title="profile" />
      <Header />
      <div className="">{children}</div>
    </>
  );
}
