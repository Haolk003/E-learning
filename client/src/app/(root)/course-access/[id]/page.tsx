import React from "react";
import CourseAccessLayout from "@/components/course-access/CourseAccessLayout";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <CourseAccessLayout id={params.id} />
    </div>
  );
};

export default page;
