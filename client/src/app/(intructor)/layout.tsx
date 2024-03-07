import React from "react";

import SideBarIntructor from "@/components/instructor/SidebarIntructor";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <LoggedInOnly>
        {" "}
        <SideBarIntructor />
        <div className="pl-[20%] py-20"> {children}</div>
      </LoggedInOnly>
    </div>
  );
}
