import React from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import CourseCategoryLayout from "@/components/courses-category/CourseCategoryLayout";
import Footer2 from "@/components/Footer2";
const page = ({ params }: { params: { category: string } }) => {
  return (
    <>
      <div className="min-h-screen relative">
        <Heading description="" title="Courses" keyword="course" />
        <Header />
        <div className=" w-[90%] mx-auto">
          <CourseCategoryLayout categoryId={params.category} />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <Footer2 />
        </div>
      </div>
    </>
  );
};

export default page;
