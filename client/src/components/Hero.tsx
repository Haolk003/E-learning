import Image from "next/image";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="w-full relative bg-[url('../../public/assets/banner.jpg')] bg-cover h-[600px] bg-center before:bg-[rgba(132,90,223,0.6)] before:w-full before:h-full before:absolute before:content-['']  ">
      <div className="flex items-center justify-between absolute top-[50%] h-full w-full z-20 left-0 -translate-y-1/2 px-20">
        <div className="w-[50%]">
          <h2 className="text-[45px] w-[80%] font-[700] tracking-wide  leading-[60px] text-white mb-4  ">
            Unleash your inner{" "}
            <span className="text-blue10">programming genius</span> with our
            community.
          </h2>
          <p className="text-sm text-white w-[80%] leading-[30px] tracking-wide ">
            Empower your programming journey with Becodemy dedicated community
            and comprehensive resources.
          </p>
          <button className="bg-[rgba(255,255,255,0.3)] rounded px-4 py-1 text-[13px] text-white mt-4 flex items-center gap-2">
            <p>Explore Courses</p>

            <IoEyeOutline />
          </button>
        </div>
        <div className="w-[500px] h-[500px] overflow-hidden">
          <Image
            src="/assets/hero.png"
            alt=""
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
