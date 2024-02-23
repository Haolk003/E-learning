import React from "react";
import CourseIntructorLayout from "@/components/instructor/courses/CourseIntructorLayout";
import PerformanceLayout from "@/components/instructor/performance/PerformanceLayout";
import PerformanceOverview from "@/components/instructor/performance/PerformanceOverview";
const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="px-10">
      <PerformanceLayout />
      <div className="ml-[20%]">
        <PerformanceOverview slug={params.slug} />
      </div>
    </div>
  );
};

export default page;
