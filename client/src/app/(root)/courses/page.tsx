"use client";

import React, { useState } from "react";
import Heading from "@/utils/Heading";
import CourseLayout from "@/components/course/CourseLayout";
import Header from "@/components/Header";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="relative ">
        <Heading description="" title="Profile" keyword="" />
        <Header />
        <div className="py-[100px]"></div>
      </div>
    </>
  );
};

export default page;
