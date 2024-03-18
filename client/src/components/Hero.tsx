import Image from "next/image";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="w-full relative bg-[url('../../public/assets/banner.jpg')] bg-cover h-[600px] bg-center dark:efore:bg-[rgba(132,90,223,0.6)] before:bg-[rgba(132,90,223,0.9)]  before:w-full before:h-full before:absolute before:content-['']   ">
      <div className="flex md:flex-row flex-col-reverse items-center justify-between absolute top-[50%] h-full w-full z-20 left-0 -translate-y-1/2 px-20">
        <div className="md:w-[50%] w-full md:text-left text-center flex flex-col md:items-start items-center md:justify-start justify-center md:pb-0 pb-3">
          <h2 className="md:text-[45px] text-[20px] md:w-[80%] w-full font-[700] tracking-wide  md:leading-[60px]  text-white mb-4 md:mt-0 mt-10 md:text-left text-center ">
            Unleash your inner{" "}
            <span className="text-blue10">programming genius</span> with our
            community.
          </h2>
          <p className="text-sm text-white w-full md:w-[80%] leading-[30px] tracking-wide md:text-left text-center ">
            Empower your programming journey with Becodemy dedicated community
            and comprehensive resources.
          </p>
          <button className="bg-[rgba(255,255,255,0.3)] rounded px-4 py-1 text-[13px] text-white mt-4 flex items-center  gap-2">
            <p>Explore Courses</p>
            <IoEyeOutline />
          </button>
        </div>
        <div className="md:w-[500px] md:h-[500px] object-cover overflow-hidden w-[90%] h-auto md:mt-0 mt-28">
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
