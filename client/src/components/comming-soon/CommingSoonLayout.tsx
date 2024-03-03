import React from "react";
import Image from "next/image";
const CommingSoonLayout = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] ">
      <Image
        src="/assets/media-87.svg"
        alt=""
        width={500}
        height={300}
        className="w-[500px] h-auto object-contain"
      />
    </div>
  );
};

export default CommingSoonLayout;
