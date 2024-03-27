import React from "react";
import CourseAccessLayout from "@/components/course-access/CourseAccessLayout";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";
const page = ({ params }: { params: { id: string; lectureId: string } }) => {
  return (
    <div>
      <LoggedInOnly>
        <CourseAccessLayout id={params.id} lectureId={params.lectureId} />
      </LoggedInOnly>
    </div>
  );
};

export default page;
