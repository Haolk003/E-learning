"use client";
import React, { useState } from "react";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ChangePassword from "@/components/profile/ChangePassword";
import ProfileNavbarMobile from "./ProfileNavbarMobile";
const ProfileLayout = () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <LoggedInOnly>
        <div className="relative pt-[100px]">
          <div className="md:flex  md:w-[90%] w-full mx-auto md:border ">
            <ProfileNavbarMobile active={active} setActive={setActive} />
            <ProfileSideBar active={active} setActive={setActive} />

            {active === 1 && <ProfileInfo />}
            {active === 2 && <ProfilePhoto />}
            {active === 3 && <ChangePassword />}
          </div>
        </div>
      </LoggedInOnly>
    </>
  );
};

export default ProfileLayout;
