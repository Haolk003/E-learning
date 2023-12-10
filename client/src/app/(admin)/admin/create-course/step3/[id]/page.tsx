"use client";

import React, { useState } from "react";
import CourseOption from "@/components/admin/create-course/CourseOption";

import CourseContentData from "@/components/admin/create-course/CourseContentData";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="relative flex justify-between w-[90%] ">
      <div className="w-[60%] mx-auto">
        <CourseContentData id={params.id} />
      </div>
      <CourseOption step={3} />
    </div>
  );
};

export default page;
