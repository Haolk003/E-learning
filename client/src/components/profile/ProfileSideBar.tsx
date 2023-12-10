"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  FC,
} from "react";
import { useAppSelector } from "@/store/hook";
import Image from "next/image";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { SiCoursera } from "react-icons/si";
import { useLogoutUserMutation } from "@/features/auth/authApi";
import { FaImage } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
};
const ProfileSideBar: FC<Props> = ({ active, setActive }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isLogout, setIsLogout] = useState(false);
  const [logout, { isSuccess, error }] = useLogoutUserMutation();

  const handleLoggout = async () => {
    await logout("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logouted successfully");
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess]);
  return (
    <div className="dark:bg-iris3 bg-mauve6 overflow-hidden pageContent w-[210px] lg:w-[300px] min-h-[500px]  dark:text-white text-black border dark:border-iris2 border-mauve10">
      <div className="flex flex-col w-full">
        <div
          className={`${
            active === 1 && "dark:bg-iris5 bg-iris11"
          } w-full px-4 py-5 flex items-center gap-3 cursor-pointer`}
          onClick={() => setActive(1)}
        >
          <Image
            src={user?.avatar ? user.avatar.url : "/assets/avatar.jpg"}
            alt=""
            width={40}
            height={40}
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div>My Account</div>
        </div>
        <div
          className={`w-full px-4 py-5 flex items-center gap-3 cursor-pointer ${
            active === 2 && "dark:bg-iris5 bg-iris11"
          }`}
          onClick={() => setActive(2)}
        >
          <FaImage className="text-2xl" />
          <p>Photo</p>
        </div>
        {user?.loginType === "password" && (
          <div
            className={`w-full px-4 py-5 flex items-center gap-3 cursor-pointer ${
              active === 3 && "dark:bg-iris5 bg-iris11"
            }`}
            onClick={() => setActive(3)}
          >
            <RiLockPasswordFill className="text-2xl" />
            <p>Change Password</p>
          </div>
        )}
        <div
          className={`w-full px-4 py-5 flex items-center gap-3 cursor-pointer ${
            active === 4 && "dark:bg-iris5 bg-iris11"
          }`}
          onClick={() => setActive(4)}
        >
          <SiCoursera className="text-2xl" />
          <p>Enrolled Courses</p>
        </div>
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className={`w-full px-4 py-5 flex items-center gap-3 cursor-pointer`}
          >
            <MdAdminPanelSettings className="text-2xl" />
            <p>Admin Dashboard</p>
          </Link>
        )}

        <div
          className={`w-full px-4 py-5 flex items-center gap-3 cursor-pointer `}
          onClick={handleLoggout}
        >
          <AiOutlineLogout className="text-2xl" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
