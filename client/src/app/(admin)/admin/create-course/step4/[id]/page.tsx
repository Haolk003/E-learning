"use client";

import React, { useState } from "react";
import CourseOption from "@/components/admin/create-course/CourseOption";

import CourseContentData from "@/components/admin/create-course/CourseContentData";
import CoursePreview from "@/components/admin/create-course/CoursePreview";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="relative flex justify-between w-[90%] ">
      <div className="w-[70%] mx-auto">
        <CoursePreview id={params.id} />
      </div>
      <CourseOption step={4} />
    </div>
  );
};

export default page;
