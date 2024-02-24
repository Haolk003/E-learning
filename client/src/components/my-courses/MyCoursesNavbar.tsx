"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const MyCouresNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="relative top-[80px] left-0 w-full h-[150px] bg-gray1 px-[200px] pt-10 flex flex-col justify-between">
      <h2 className="text-3xl font-bold">My learning</h2>
      <div className="flex items-center gap-3">
        <Link
          href="/my-courses/learning"
          className={`${
            pathname === "/my-courses/learning"
              ? "border-b-[4px] border-white"
              : "text-gray8"
          } cursor-pointer text-[16px] font-semibold px-2 `}
        >
          All courses
        </Link>
        <Link
          href="/my-courses/list"
          className={`${
            pathname === "/my-courses/list"
              ? "border-b-[4px] border-white"
              : "text-gray8"
          } cursor-pointer text-[16px] font-semibold px-2`}
        >
          My Lists
        </Link>
        <Link
          href="/my-courses/wishlist"
          className={`${
            pathname === "/my-courses/wishlist"
              ? "border-b-[4px] border-white"
              : "text-gray8"
          } cursor-pointer text-[16px] font-semibold px-2 `}
        >
          Wishlist
        </Link>
        <Link
          href="/my-courses/tools"
          className={`${
            pathname === "/my-courses/tools"
              ? "border-b-[4px] border-white"
              : "text-gray8"
          } cursor-pointer text-[16px] px-2 font-semibold `}
        >
          Tools
        </Link>
      </div>
    </div>
  );
};

export default MyCouresNavbar;
