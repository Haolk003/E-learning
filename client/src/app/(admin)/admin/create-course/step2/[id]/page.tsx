"use client";

import React, { useState } from "react";

import CourseOption from "@/components/admin/create-course/CourseOption";
import CoureInfo from "@/components/admin/create-course/CoureInfo";
import CourseInfoStep2 from "@/components/admin/create-course/CourseInfoStep2";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="relative flex justify-between w-[90%] ">
      <div className="w-[60%] mx-auto">
        <CourseInfoStep2 id={params.id} />
      </div>

      <CourseOption step={2} />
    </div>
  );
};

export default page;
