import React from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import CoursesSearchLayout from "@/components/courses-search/CoursesSearchLayout";
const page = () => {
  return (
    <>
      <div className="relative ">
        <Heading description="" title="Profile" keyword="" />
        <Header />
        <div className="py-[100px] w-[90%] mx-auto">
          <CoursesSearchLayout />
        </div>
      </div>
    </>
  );
};

export default page;
