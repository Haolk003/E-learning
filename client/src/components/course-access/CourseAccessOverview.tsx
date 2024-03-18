import { CourseType } from "@/types/couresContentType";
import dompurify from "dompurify";
import React from "react";
import Image from "next/image";

type Props = {
  courseData: CourseType;
};
const CourseAccessOverview: React.FC<Props> = ({ courseData }) => {
  const lecturesLength = courseData.courseData.reduce((total, item) => {
    return total + item.lectures.length;
  }, 0);

  const totalLenghtWatched = courseData.courseData.reduce((total, item) => {
    return total + item.videoLength;
  }, 0);
  return (
    <div className="px-8">
      <h2 className="text-3xl mt-5 ml-2">About this course</h2>
      <div className="flex gap-3 px-5 py-4 mt-2 border-b-[2px] border-gray8">
        <p className="md:w-[300px]">By the number</p>
        <div>
          <p>Skill level: {courseData.level}</p>
          <p>Students: {courseData.sold}</p>
          <p>Lectures: {lecturesLength}</p>
          <p>Video: {totalLenghtWatched}</p>
        </div>
      </div>
      <div className="flex gap-3 px-5 py-4 border-b-[2px] border-gray8 w-full">
        <div className="md:w-[300px]">Despcripion</div>
        <div
          className="w-[calc(100%-300px)]"
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(courseData.description),
          }}
        ></div>
      </div>
      <div className="flex px-5 py-4 border-b-[2px] border-gray8 w-full">
        <p className="w-[300px]">Instructor</p>
        <div className="">
          <div className="flex"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseAccessOverview;
