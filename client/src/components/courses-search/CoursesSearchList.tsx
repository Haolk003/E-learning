import { CourseType } from "@/types/couresContentType";
import React from "react";
import CourseSearchCard from "../card/CourseSearchCard";
type Props = {
  courses: CourseType[];
};
const CoursesSearchList: React.FC<Props> = ({ courses }) => {
  return (
    <div className="flex flex-col gap-6">
      {courses &&
        courses.map((course, index) => {
          return (
            <CourseSearchCard
              key={course._id}
              _id={course._id}
              author={"haolk"}
              description={course.description}
              estimatePrice={course.price - 1}
              price={course.price}
              level={course.level}
              ratings={course.ratings}
              thumnail={course.thumbnail.url}
              title={course.title}
              totalHours={39}
              totalLecture={20}
            />
          );
        })}
    </div>
  );
};

export default CoursesSearchList;
