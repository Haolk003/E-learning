"use client";

import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { usePathname } from "next/navigation";
const steps = [
  "Course Infomation",
  "Course Option",
  "Course Content",
  "Course Preview",
];
const CourseOption = ({ step }: { step: number }) => {
  const pathName = usePathname();
  return (
    <div className="">
      {steps.map((item, index) => {
        return (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full   flex items-center justify-center text-xl ${
                  step > index ? "bg-blue9" : "bg-slate-500"
                }`}
              >
                {" "}
                <AiOutlineCheck />
              </div>

              <span className="text-[14px]">{item}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-[4px] h-[50px]  ml-4 my-1 ${
                  step > index + 1 ? "bg-blue9" : "bg-slate-500"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseOption;
