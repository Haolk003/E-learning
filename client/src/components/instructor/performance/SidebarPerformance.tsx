"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SidebarPerformance = () => {
  const pathName = usePathname();
  return (
    <div className="h-screen fixed w-[250px] left-[18%] top-0 bg-gray3 px-5 py-10 dark:text-white text-black">
      <ul className="flex flex-col gap-5">
        <li>
          <Link
            href={`/instructor/performance/overview/revenue`}
            className={`${
              pathName.includes("/instructor/performance/overview")
                ? "text-white font-semibold text-[18px]"
                : "text-gray9 text-[17px]"
            }`}
          >
            Overview
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              pathName === "/instructor/performance/reviews"
                ? "text-white font-semibold text-[18px]"
                : "text-gray9 text-[17px]"
            }`}
            href={`/instructor/performance/reviews`}
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName === "/instructor/performance/students"
                ? "text-white font-semibold text-[18px]"
                : "text-gray9 text-[17px]"
            }`}
            href={`/instructor/performance/students`}
          >
            Students
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName === "/instructor/performance/course-engagement"
                ? "text-white font-semibold text-[18px]"
                : "text-gray9 text-[17px]"
            }`}
            href={`/instructor/performance/course-engagement`}
          >
            Course engagement
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName === "/instructor/performance/traffic"
                ? "text-white font-semibold text-[18px]"
                : "text-gray9 text-[17px]"
            }`}
            href={`/instructor/performance/traffic`}
          >
            Traffic & conversion
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarPerformance;
