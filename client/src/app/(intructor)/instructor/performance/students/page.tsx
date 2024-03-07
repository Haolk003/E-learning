import React from "react";

import PerformanceLayout from "@/components/instructor/performance/PerformanceLayout";
import CommingSoonLayout from "@/components/comming-soon/CommingSoonLayout";
const page = () => {
  return (
    <div className="px-10">
      <PerformanceLayout />
      <CommingSoonLayout />
    </div>
  );
};

export default page;
