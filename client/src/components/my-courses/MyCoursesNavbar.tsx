"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
const MyCouresNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="relative md:top-[80px] top-[60px] left-0 w-full md:h-[150px] h-[100px] bg-gray1 md:px-[200px] px-4  md:pt-10 pt-3 flex flex-col justify-between overflow-auto">
      <h2 className="md:text-3xl text-2xl font-bold">My learning</h2>
      <div className="flex items-center md:gap-3 gap-1">
        <Link
          href="/my-courses/learning"
          className={`${
            pathname === "/my-courses/learning"
              ? "md:border-b-[4px] border-b-[2px] border-white"
              : "text-gray8"
          } cursor-pointer md:text-[16px] text-[14px] font-semibold px-2 whitespace-nowrap`}
        >
          All courses
        </Link>
        <Link
          href="/my-courses/list"
          className={`${
            pathname === "/my-courses/list"
              ? "md:border-b-[4px] border-b-[2px] border-white"
              : "text-gray8"
          } cursor-pointer md:text-[16px] text-[14px] font-semibold px-2 whitespace-nowrap`}
        >
          My Lists
        </Link>
        <Link
          href="/my-courses/wishlist"
          className={`${
            pathname === "/my-courses/wishlist"
              ? "md:border-b-[4px] border-b-[2px] border-white"
              : "text-gray8"
          } cursor-pointer md:text-[16px] text-[14px] font-semibold px-2 `}
        >
          Wishlist
        </Link>
        <Link
          href="/my-courses/tools"
          className={`${
            pathname === "/my-courses/tools"
              ? "md:border-b-[4px] border-b-[2px] border-white"
              : "text-gray8"
          } cursor-pointer md:text-[16px] text-[14px] px-2 font-semibold `}
        >
          Tools
        </Link>
      </div>
    </div>
  );
};

export default MyCouresNavbar;
