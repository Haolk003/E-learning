import React from "react";
import Heading from "@/utils/Heading";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Heading description="dda" keyword="das" title="profile" />
      <div className="">{children}</div>
    </>
  );
}
