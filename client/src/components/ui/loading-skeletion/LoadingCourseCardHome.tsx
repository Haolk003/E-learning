import React from "react";
import Skeleton from "@mui/material/Skeleton";
const LoadingCourseCardHome = () => {
  return (
    <div className="w-full px-2 text-white rounded-lg border border-gray4 dark:bg-blackA9 bg-white ">
      <Skeleton
        animation="wave"
        height={250}
        width="100%"
        style={{ marginBottom: 10, background: "#333" }}
      />
      <Skeleton
        animation="wave"
        height={20}
        width="100%"
        style={{ marginBottom: 5, background: "#333" }}
        color="#ccc"
      />
      <Skeleton
        animation="wave"
        height={20}
        width="100%"
        style={{ marginBottom: 5, background: "#333" }}
      />

      <Skeleton
        animation="wave"
        height={20}
        width="100%"
        style={{ marginBottom: 5, background: "#333" }}
      />
    </div>
  );
};

export default LoadingCourseCardHome;
