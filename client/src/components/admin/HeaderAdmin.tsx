"use client";

import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import ThemeSwicher from "../ui/ThemeSwicher";

const HeaderAdmin = () => {
  return (
    <div className="fixed right-3 top-3 flex items-center gap-4 text-2xl dark:text-white text-black">
      <ThemeSwicher />
      <IoMdNotificationsOutline />
    </div>
  );
};

export default HeaderAdmin;
