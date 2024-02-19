"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";

import toast from "react-hot-toast";
import Image from "next/image";

import CustomModal from "./ui/CustomModal";
import Register from "./auth/Register";
import Login from "./auth/Login";

import VerifyAccount from "./auth/VerifyAccount";
import ThemeSwicher from "./ui/ThemeSwicher";

import { openLogin, closeLogin } from "@/features/layout/layoutSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const open = useAppSelector((state) => state.layout.open);
  const [active, setActive] = useState(false);
  const [route, setRoute] = useState("sign-in");

  const handleCloseModalLogin = () => {
    dispatch(closeLogin(undefined));
  };
  const openModal = () => {
    dispatch(openLogin(""));
  };
  useEffect(() => {
    const handelScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 80) {
          setActive(true);
        } else {
          setActive(false);
        }
      }
    };
    window.addEventListener("scroll", handelScroll);

    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);

  return (
    <div className="w-screen relative dark:text-white text-black z-50">
      <div
        className={`fixed top-0 left-0  ${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
            : "w-full border-b dark:border-[#ffffff1c]  z-[80] dark:shadow-xl"
        }  w-[100vw] h-[80px]`}
      >
        <div className="w-[90%] mx-auto h-full flex items-center justify-between">
          <Link href="/" className="flex items-center   ">
            <Image src="/assets/logo2.png" alt="" width={80} height={80} />
            <h2 className=" text-2xl font-semibold ">Elearning</h2>
          </Link>

          <div className="flex items-center gap-7 text-xl">
            <Link href="/courses">Courses</Link>
            <Link href="/About">About</Link>
            <Link href="/sponsorships">Sponsorships</Link>
            <Link href="/faq">FAQ</Link>
            <ThemeSwicher />

            <div>
              {user ? (
                <Link href="/profile">
                  <Image
                    src={user.avatar ? user.avatar.url : "/assets/avatar.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className="object-cover w-[40px] h-[40px] rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <div onClick={openModal} className="text-3xl">
                  <BiUserCircle />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {route === "sign-in" && (
        <CustomModal
          component={
            <Login
              setRoute={setRoute}
              handleCloseModal={handleCloseModalLogin}
            />
          }
          open={open}
          handleClose={handleCloseModalLogin}
        />
      )}

      {route === "sign-up" && (
        <CustomModal
          component={<Register setRoute={setRoute} />}
          open={open}
          handleClose={handleCloseModalLogin}
        />
      )}
      {open && route === "verify" && (
        <CustomModal
          component={<VerifyAccount setRoute={setRoute} />}
          open={open}
          handleClose={handleCloseModalLogin}
        />
      )}
    </div>
  );
};

export default Header;
