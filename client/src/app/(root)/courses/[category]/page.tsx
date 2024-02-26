import React from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import CourseCategoryLayout from "@/components/courses-category/CourseCategoryLayout";
const page = ({ params }: { params: { category: string } }) => {
  return (
    <>
      <div className="relative ">
        <Heading description="" title="Profile" keyword="" />
        <Header />
        <div className="py-[100px] w-[90%] mx-auto">
          <CourseCategoryLayout categoryId={params.category} />
        </div>
      </div>
    </>
  );
};

export default page;
