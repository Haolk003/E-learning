import React from "react";
import Image from "next/image";
import { IoIosHome, IoIosMail, IoMdPhonePortrait } from "react-icons/io";
import { IoPrint } from "react-icons/io5";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaGithubAlt,
  FaInstagram,
} from "react-icons/fa";
const Fotter = () => {
  return (
    <div className="dark:bg-gray1 dark:text-white text-black ">
      <div className="px-10 flex justify-between py-8">
        <div className="w-[25%]">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo2.png" alt="" width={100} height={50} />
            <h2 className="text-2xl font-semibold">Elearning </h2>
          </div>
          <p className="text-[13px] leading-6 font-thin">
            Lorem ipsum is a placeholder text commonly used in publishing and
            graphic design to demonstrate the visual form of a document or a
            typeface without relying on meaningful content1234. It is
            essentially nonsense text that still gives an idea of what real
            words will look like in the final product3. The phrase lorem ipsum
            derives from the Latin phrase dolorem ipsum, which translates to
            pain itself
          </p>
        </div>
        <div className="w-[10%]">
          <h2 className="font-semibold uppercase text-xl mb-4">Pages</h2>
          <ul className="flex flex-col gap-3 text-[15px] dark:text-gray11">
            <li>Email</li>
            <li>Profile</li>
            <li>Instructor</li>
            <li>Courses</li>
            <li>Contacts</li>
            <li>Courses</li>
          </ul>
        </div>

        <div className="w-[10%]">
          <h2 className="font-semibold uppercase text-xl mb-4">INFO</h2>
          <ul className="flex flex-col gap-3 text-[15px] dark:text-gray11">
            <li>Our Team</li>
            <li>Contact US</li>
            <li>About</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="w-[20%]">
          <h2 className="font-semibold uppercase text-xl mb-4">Contract</h2>
          <ul className="flex flex-col gap-3 text-[14px] dark:text-gray11">
            <li className="flex items-center gap-2">
              <IoIosHome size={20} /> <p>Cộng Hoà ,Tân Bình, VN</p>
            </li>

            <li className="flex items-center gap-2">
              <IoIosMail size={20} /> <p>info@gmail.com</p>
            </li>

            <li className="flex items-center gap-2">
              <IoMdPhonePortrait size={20} /> <p>+(84) 582 847 760</p>
            </li>
            <li className="flex items-center gap-2">
              <IoPrint size={20} /> <p>+(12) 345 6789</p>
            </li>
          </ul>
          <h3 className="font-semibold text-xl uppercase mt-3">
            FOLLOW US ON:
          </h3>
          <div className="flex items-center gap-2 text-[14px] mt-3 ">
            <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md bg-blue12/50 text-blue12">
              <FaFacebookF />
            </div>

            <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md bg-sky-400/50 text-sky-500">
              <FaTwitter />
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md bg-yellow-400/50 text-yellow-400">
              <FaInstagram />
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md bg-green-400/50 text-green-400">
              <FaGithubAlt />
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md bg-red-400/50 text-red-400">
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
