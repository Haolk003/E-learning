"use client";

import React, { useState } from "react";
import Heading from "@/utils/Heading";
import CourseLayout from "@/components/course/CourseLayout";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="relative ">
        <Heading description="" title="Profile" keyword="" />
        <div className="py-[100px]">
          <CourseLayout id={params.id} />
        </div>
      </div>
    </>
  );
};

export default page;
