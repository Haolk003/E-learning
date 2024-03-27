import Heading from "@/utils/Heading";
import React from "react";

import Hero from "../../components/Hero";
import CoursesHome from "@/components/home/CoursesHome";
import ProgressCourse from "@/components/home/ProgressCourse";
import Header from "@/components/Header";
import Fotter from "@/components/Fotter";
import Footer2 from "@/components/Footer2";
const page = () => {
  return (
    <div className=" w-full  text-3xl text-black">
      <Header />
      <Heading
        title="Elearning"
        description="Eleaning is a platform for student to learn and get help form teachers"
        keyword="Programing, MERN, Redux, Machine Learing"
      />
      <Hero />
      <ProgressCourse />
      <CoursesHome />
      <Fotter />
      <Footer2 />
    </div>
  );
};

export default page;
