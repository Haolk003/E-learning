import React, { FC, useCallback } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  courseId: string;
  lectureId: string;
};
const CourseAccessToolbar: FC<Props> = ({ courseId, lectureId }) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleSelectOption = (option: string) => {
    router.push(
      `/course-access/${courseId}/lecture/${lectureId}` +
        "?" +
        createQueryString("option", option)
    );
  };
  return (
    <div className="w-full px-6 overflow-auto">
      <div className="flex items-center px-4 h-[40px] mt-5 overflow-auto w-full">
        <p
          onClick={() => handleSelectOption("course-content")}
          className={` cursor-pointer md:min-w-[150px] md:hidden block min-w-[120px] flex-1  h-full  text-center border-b-[2px] ${
            searchParams.get("option") === "course-content" ||
            !searchParams.get("option")
              ? "border-black"
              : "border-gray6"
          }`}
        >
          Course Content
        </p>
        <p
          onClick={() => handleSelectOption("overview")}
          className={` cursor-pointer min-w-[120px] text-center  h-full  border-b-[2px] ${
            searchParams.get("option") === "overview" ||
            !searchParams.get("option")
              ? "border-black"
              : "border-gray6"
          }`}
        >
          Overview
        </p>
        <p
          onClick={() => handleSelectOption("note")}
          className={`  cursor-pointer min-w-[120px] text-center px-6 h-full border-b-[2px] ${
            searchParams.get("option") === "note"
              ? "border-black  "
              : "border-gray6"
          }`}
        >
          Notes
        </p>
        <p
          onClick={() => handleSelectOption("review")}
          className={` h-full text-center min-w-[120px] cursor-pointer border-b-[2px] ${
            searchParams.get("option") === "review"
              ? "border-black border-b-[2px]"
              : "border-gray6"
          }`}
        >
          Previews
        </p>
        <div className="w-full border-b-[2px] h-full border-gray6"></div>
      </div>
    </div>
  );
};

export default CourseAccessToolbar;
