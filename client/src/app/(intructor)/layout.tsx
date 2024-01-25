"use client";

import React, { useEffect } from "react";

import SideBarIntructor from "@/components/instructor/SidebarIntructor";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBarIntructor />
      <div className="pl-[18%] py-20"> {children}</div>
    </>
  );
}
