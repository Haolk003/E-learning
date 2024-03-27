import React from "react";

const Footer2 = () => {
  return (
    <div className="dark:bg-gray1 border dark:border-gray7 text-center py-3 text-[15px] dark:text-gray10  ">
      <p>
        Copyright © {new Date().getFullYear()} . Designed with by{" "}
        <span className="text-violet10">NQH</span> All rights reserved
      </p>
    </div>
  );
};

export default Footer2;
