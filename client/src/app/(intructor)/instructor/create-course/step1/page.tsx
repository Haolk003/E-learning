import React from "react";
import CourseOption from "@/components/admin/create-course/CourseOption";
import CoureInfo from "@/components/admin/create-course/CoureInfo";

const page = () => {
  return (
    <div className="relative flex justify-between w-[90%] ">
      <div className="w-[60%] mx-auto">
        <CoureInfo />
      </div>
      <CourseOption step={1} />
    </div>
  );
};

export default page;
