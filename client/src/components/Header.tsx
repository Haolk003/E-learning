"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Image from "next/image";
import * as HoverCard from "@radix-ui/react-hover-card";

import CustomModal from "./ui/CustomModal";
import Register from "./auth/Register";
import Login from "./auth/Login";

import VerifyAccount from "./auth/VerifyAccount";
import ThemeSwicher from "./ui/ThemeSwicher";

import { openLogin, closeLogin } from "@/features/layout/layoutSlice";

import { useGetAllCategoryQuery } from "@/features/category/categoryApi";

import { CategoryType } from "@/types/categoryType";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useGetAllCategoryQuery("");

  const user = useAppSelector((state) => state.auth.user);
  const open = useAppSelector((state) => state.layout.open);
  const [search, setSearch] = useState(searchParams.get("q") || "");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== "") {
      router.push(`/courses/search?q=${search}`);
    }
  };

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
          <div className="flex items-center gap-3">
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <p className="cursor-pointer text-[18px]">Categories</p>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content className="z-[200]  data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade min-w-[300px] h-[90vh]  bg-white dark:bg-gray5 p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all py-5">
                  <div className="h-[90vh] flex flex-col flex-wrap gap-4">
                    {categories &&
                      categories.data.map(
                        (item: CategoryType, index: number) => {
                          return (
                            <HoverCard.Root key={item._id}>
                              <HoverCard.Trigger asChild>
                                <div className="flex items-center justify-between">
                                  <p className="cursor-pointer text-[17px]">
                                    {item.name}
                                  </p>
                                  <FaAngleRight />
                                </div>
                              </HoverCard.Trigger>
                              <HoverCard.Portal>
                                <HoverCard.Content
                                  side="right"
                                  sideOffset={20}
                                  align="start"
                                  className="z-[200] border-l dark:border-gray8  data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade  min-w-[300px] h-[500px] bg-white dark:bg-gray5 p-5  data-[state=open]:transition-all "
                                >
                                  <div className=" flex flex-col flex-wrap gap-4">
                                    {item.subcategories &&
                                      item.subcategories.map(
                                        (
                                          item2: CategoryType,
                                          index: number
                                        ) => {
                                          return (
                                            <HoverCard.Root key={item2._id}>
                                              <div className="cursor-pointer">
                                                {item2.name}
                                              </div>
                                            </HoverCard.Root>
                                          );
                                        }
                                      )}
                                  </div>
                                </HoverCard.Content>
                              </HoverCard.Portal>
                            </HoverCard.Root>
                          );
                        }
                      )}
                  </div>
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <form
              className="flex items-center gap-2 w-[300px]  md:w-[400px] lg:w-[500px] h-[50px] border-[1px] dark:border-gray11 border-gray5 rounded-[25px] bg-gray12/30 px-3"
              onSubmit={handleSubmit}
            >
              <button type="submit">
                <IoIosSearch size={16} />
              </button>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for anything"
                className="bg-transparent placeholder:text-[15px] text-[15px] w-[80%] outline-none"
              />
            </form>
          </div>

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
