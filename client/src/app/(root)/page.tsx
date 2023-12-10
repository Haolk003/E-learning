import Heading from "@/utils/Heading";
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Hero from "../../components/Hero";
import CoursesHome from "@/components/home/CoursesHome";

const page = () => {
  return (
    <div className="h-[200vh]  scroll-auto text-3xl text-black">
      <Heading
        title="Elearning"
        description="Eleaning is a platform for student to learn and get help form teachers"
        keyword="Programing, MERN, Redux, Machine Learing"
      />
      <Hero />
      <CoursesHome />
    </div>
  );
};

export default page;
