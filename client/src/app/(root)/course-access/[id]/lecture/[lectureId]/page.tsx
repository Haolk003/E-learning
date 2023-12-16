import React from "react";
import CourseAccessLayout from "@/components/course-access/CourseAccessLayout";
const page = ({ params }: { params: { id: string; lectureId: string } }) => {
  return (
    <div>
      <CourseAccessLayout id={params.id} lectureId={params.lectureId} />
    </div>
  );
};

export default page;
