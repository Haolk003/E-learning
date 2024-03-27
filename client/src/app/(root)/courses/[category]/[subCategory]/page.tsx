import React from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import CoursesSearchLayout from "@/components/courses-search/CoursesSearchLayout";
import CourseCategoryLayout from "@/components/courses-category/CourseCategoryLayout";
import Footer2 from "@/components/Footer2";

const page = ({
  params,
}: {
  params: { subCategory: string; category: string };
}) => {
  return (
    <>
      <div className="relative ">
        <Heading description="" title="Profile" keyword="" />
        <Header />
        <div className=" w-[90%] mx-auto">
          <CourseCategoryLayout
            categoryId={params.category}
            subCategoryId={params.subCategory}
          />
        </div>
        <Footer2 />
      </div>
    </>
  );
};

export default page;
