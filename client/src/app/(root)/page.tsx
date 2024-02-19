import Heading from "@/utils/Heading";
import React from "react";

import Hero from "../../components/Hero";
import CoursesHome from "@/components/home/CoursesHome";
import ProgressCourse from "@/components/home/ProgressCourse";
import Header from "@/components/Header";
const page = () => {
  return (
    <div className="h-[200vh]  scroll-auto text-3xl text-black">
      <Header />
      <Heading
        title="Elearning"
        description="Eleaning is a platform for student to learn and get help form teachers"
        keyword="Programing, MERN, Redux, Machine Learing"
      />
      <Hero />
      <ProgressCourse />
      <CoursesHome />
    </div>
  );
};

export default page;
