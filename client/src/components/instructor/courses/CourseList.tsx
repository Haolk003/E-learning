import React from "react";
import { CourseType } from "@/types/couresContentType";
import CourseCardIntructor from "@/components/card/CourseCardIntructor";

type Props = {
  data: CourseType[];
};
const CourseList: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <CourseCardIntructor
            key={item._id}
            _id={item._id}
            image={item.thumbnail.url}
            progress={item.progress}
            status={item.status}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
