"use client";
import React, { useState } from "react";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ChangePassword from "@/components/profile/ChangePassword";
export default function page() {
  const [active, setActive] = useState(1);

  return (
    <>
      <LoggedInOnly>
        <div className="relative pt-[100px]">
          <div className="flex  w-[90%] mx-auto border ">
            <ProfileSideBar active={active} setActive={setActive} />
            {active === 1 && <ProfileInfo />}
            {active === 2 && <ProfilePhoto />}
            {active === 3 && <ChangePassword />}
          </div>
        </div>
      </LoggedInOnly>
    </>
  );
}
