"use client";

import React, { useEffect } from "react";

import SideBarIntructor from "@/components/instructor/SidebarIntructor";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SideBarIntructor />
      <div className="pl-[200px] py-20"> {children}</div>
    </div>
  );
}
