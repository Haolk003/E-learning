"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { useSearchParams, useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";

import throttle from "lodash/throttle";
import toast from "react-hot-toast";
import Image from "next/image";
import * as HoverCard from "@radix-ui/react-hover-card";

import { BiUserCircle } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

import { useLogoutUserMutation } from "@/features/auth/authApi";
import {
  useGetAllNotifyUserQuery,
  useDeleteNotifyMutation,
} from "@/features/notification/notifyApi";
import { useGetAllCategoryQuery } from "@/features/category/categoryApi";
import { addNotify } from "@/features/notification/notifySlice";
import { openLogin, closeLogin } from "@/features/layout/layoutSlice";

import CustomModal from "./ui/CustomModal";
import Register from "./auth/Register";
import Login from "./auth/Login";
import VerifyAccount from "./auth/VerifyAccount";
import ThemeSwicher from "./ui/ThemeSwicher";
import ToastNotify from "./ui/toast/ToastNotify";
import HeaderMobile from "./HeaderMobile";

import { CategoryType } from "@/types/categoryType";
import { useGetCartQuery } from "@/features/cart/cartApi";
import { cartItemType } from "@/types/cartType";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useGetAllCategoryQuery("");
  const {} = useGetCartQuery("");
  const { refetch } = useGetAllNotifyUserQuery("");
  const [deleteNotify, { isLoading, isSuccess }] = useDeleteNotifyMutation();

  const [logout, { isSuccess: isSuccessLogout }] = useLogoutUserMutation();

  const socketId = useSocket();
  const user = useAppSelector((state) => state.auth.user);

  const open = useAppSelector((state) => state.layout.open);
  const cart = useAppSelector((state) => state.cart.cart);
  const notifies = useAppSelector((state) => state.notify.notifies);

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [active, setActive] = useState(false);
  const [route, setRoute] = useState("sign-in");

  const handleCloseModalLogin = () => {
    dispatch(closeLogin(undefined));
  };
  const openModal = () => {
    dispatch(openLogin(""));
  };
  const handelScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== "") {
      router.push(`/courses/search?q=${search}`);
    }
  };

  const handleDeleteNotify = async (id: string) => {
    await deleteNotify(id);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (socketId) {
      socketId.on("newOrder", (data) => {
        dispatch(addNotify({ notify: data }));

        toast(<ToastNotify data={data} />, {
          position: "bottom-right",
          className: "dark:bg-gray2 bg-white w-[400px]",
        });
      });
    }
  }, [socketId]);

  useEffect(() => {
    if (socketId && user) {
      socketId.emit("new_connection", { userId: user._id });
    }
  }, [user, socketId]);

  const handleLogout = async () => {
    await logout("");
  };

  useEffect(() => {
    if (isSuccessLogout) {
      window.location.reload();
    }
  }, [isSuccessLogout]);

  return (
    <div className="w-screen relative text-black dark:text-white  z-[80]">
      <div
        className={`hidden md:block fixed top-0 left-0 ${
          active
            ? "text-black dark:text-white w-full bg-gradient-to-b from-gray12 to-white dark:from-gray-900 dark:to-black"
            : "w-full border-b dark:border-[#ffffff1c] dark:shadow-xl"
        }  md:w-[100vw] h-[80px]`}
      >
        <div className="w-[90%] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center   ">
              <Image src="/assets/logo2.png" alt="" width={80} height={80} />
              <h2 className=" text-2xl font-semibold ">Elearning</h2>
            </Link>
            <div className="flex items-center gap-3">
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <p className="cursor-pointer text-[15px]">Categories</p>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content className="z-[200]  data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade min-w-[300px] h-[90vh]  bg-white dark:bg-gray5 p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all py-5">
                    <div className="h-[90vh] flex flex-col flex-wrap gap-4 dark:text-white text-black">
                      {categories &&
                        categories.data.map(
                          (item: CategoryType, index: number) => {
                            return (
                              <HoverCard.Root key={item._id}>
                                <HoverCard.Trigger asChild>
                                  <Link
                                    href={`/courses/${item._id}`}
                                    className="flex items-center justify-between"
                                  >
                                    <p className="cursor-pointer text-[17px]">
                                      {item.name}
                                    </p>
                                    <FaAngleRight />
                                  </Link>
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                  <HoverCard.Content
                                    side="right"
                                    sideOffset={20}
                                    align="start"
                                    className="z-[200] border-l dark:border-gray8  data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade dark:text-white text-black  min-w-[300px] h-[500px] bg-white dark:bg-gray5 p-5  data-[state=open]:transition-all "
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
                                                <Link
                                                  href={`/courses/${item._id}/${item2._id}`}
                                                  className="cursor-pointer"
                                                >
                                                  {item2.name}
                                                </Link>
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
          </div>
          <div className="flex items-center gap-7 text-[16px]">
            {user && (
              <Link
                href={`${
                  user?.role === "user"
                    ? "/become-instructor"
                    : "/instructor/courses"
                }`}
              >
                {user.role === "user" || !user.role
                  ? "Become instructor"
                  : "Instructor"}
              </Link>
            )}

            {user && <Link href="/my-courses/learning">My Learning</Link>}
            {user && (
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <button className="relative">
                    <IoIosNotificationsOutline size={25} />
                    <span className="animate-ping absolute top-1 right-[7px] inline-flex h-[5px] w-[5px] rounded-full bg-blue8"></span>
                  </button>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content
                    side="bottom"
                    align="end"
                    sideOffset={25}
                    className="dark:bg-gray1 rounded-md bg-white shadow-sm dark:text-white text-black dark:shadow-gray10 shadow-gray4 w-[300px] min-h-[500px] z-[100]"
                  >
                    <div className="py-3 px-5 border-b border-gray8 flex items-center justify-between">
                      <h2 className="text-[16px]">Notifications</h2>
                      <p className="text-[12px] text-blue10 bg-blue2/10 rounded-sm py-[2px] px-3 font-semibold">
                        {notifies &&
                          notifies.filter((item) => item.status === "unread")
                            .length}{" "}
                        Unread
                      </p>
                    </div>
                    <div className="">
                      {notifies &&
                        notifies.map((item) => {
                          return (
                            <div
                              className="py-3 px-5 border-b border-gray8 flex items-center justify-between gap-2"
                              key={item._id}
                            >
                              <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
                                <Image
                                  src={
                                    item.sender.avatar
                                      ? item.sender.avatar.url
                                      : "/assets/avatar.jpg"
                                  }
                                  alt=""
                                  width={35}
                                  height={35}
                                  className="w-[35px] h-[35px] object-cover rounded-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 w-[200px]">
                                <h4 className="text-[13px] font-semibold">
                                  {item.sender.lastName} {item.sender.firstName}
                                </h4>
                                <p className="text-[13px] dark:text-gray11 text-gray2">
                                  {item.message}
                                </p>
                              </div>
                              <button
                                className="flex items-center justify-between"
                                onClick={() => handleDeleteNotify(item._id)}
                              >
                                <IoMdClose />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                    <div className="px-5 py-4">
                      <Link
                        href={"/notification"}
                        className=" rounded-md flex items-center justify-center font-semibold w-full h-[35px] bg-cyan12 text-white"
                      >
                        View All
                      </Link>
                    </div>
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            )}
            {user && (
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <div className="relative">
                    <FiShoppingCart size={25} className="cursor-pointer" />
                    {cart && (
                      <div className="absolute -top-2 -right-1 w-4 h-4 text-[14px]  rounded-full text-white bg-blue11 flex items-center justify-center">
                        {cart?.items.length}
                      </div>
                    )}
                  </div>
                </HoverCard.Trigger>

                <HoverCard.Portal>
                  <HoverCard.Content
                    side="bottom"
                    align="end"
                    sideOffset={30}
                    className="dark:bg-gray3 data-[side=bottom]:animate-slideUpAndFade data-[state=open]:transition-all bg-white shadow-sm shadow-black w-[300px] min-h-[300px] z-[100] px-3 py-2 dark:text-white text-black "
                  >
                    <div className="">
                      <ul className="flex flex-col gap-3">
                        {cart &&
                          cart.items.length > 0 &&
                          cart.items.map(
                            (item: cartItemType, index: number) => {
                              return (
                                <li
                                  key={item.courseId._id}
                                  className="flex gap-3"
                                >
                                  <Image
                                    src={item.courseId.thumbnail?.url || ""}
                                    alt=""
                                    width={100}
                                    height={70}
                                    className="w-[20%] h-[50px] object-cover"
                                  />
                                  <div className="">
                                    <h4 className="font-semibold text-[14px]">
                                      {item.courseId.title}
                                    </h4>
                                    <p className="text-gray8 text-[13px]">
                                      {item.courseId.author.lastName}{" "}
                                      {item.courseId.author.firstName}
                                    </p>
                                    <p className="font-semibold text-[14px]">
                                      ${item.price}
                                    </p>
                                  </div>
                                </li>
                              );
                            }
                          )}
                      </ul>
                      <div className="flex items-center gap-2 mt-3 font-semibold">
                        <h3 className="text-[18px]">Total:</h3>
                        <p className="text-[20px]">
                          ${cart && cart.totalPrice}
                        </p>
                      </div>
                      <Link
                        href="/cart"
                        className="w-full flex items-center justify-center h-[40px] bg-violet11 mt-2 text-white"
                      >
                        Go to cart
                      </Link>
                    </div>
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            )}

            <ThemeSwicher />

            <div>
              {user ? (
                <HoverCard.Root>
                  <HoverCard.Trigger asChild>
                    <Link href="/profile">
                      <Image
                        src={
                          user.avatar ? user.avatar.url : "/assets/avatar.jpg"
                        }
                        alt=""
                        width={40}
                        height={40}
                        className="object-cover w-[40px] h-[40px] rounded-full cursor-pointer"
                      />
                    </Link>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content
                      side="bottom"
                      align="end"
                      sideOffset={23}
                      className="dark:bg-gray4 bg-white dark:text-white text-black min-h-[500px] w-[300px] z-[100] shadow-sm shadow-black"
                    >
                      <div className="flex items-center justify-between w-full py-5 px-4 border-b border-gray10">
                        <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
                          <Image
                            src={
                              user.avatar
                                ? user.avatar.url
                                : "/assets/avatar.jpg"
                            }
                            alt=""
                            width={80}
                            height={80}
                            className="w-[80px] h-[80px] rounded-full"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-[180px]">
                          <p>
                            {user.lastName} {user.firstName}
                          </p>
                          <p className="text-[12px] text-gray8  whitespace-wrap  overflow-ellipsis overflow-hidden ">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col px-5 py-5 gap-4 border-b border-gray10 text-[14px]">
                        <Link href="/my-courses/learning">My learning</Link>
                        <Link href="/cart">My cart</Link>
                        {user.role === "instructor" && (
                          <Link href="/instructor">Instructor Dashboard</Link>
                        )}
                        {user.role === "user" && (
                          <Link href="/instructor">Become Instructor</Link>
                        )}
                      </div>

                      <div className="flex flex-col px-5 py-5 gap-4 border-b border-gray10 text-[14px]">
                        <Link href="/notification">Notification</Link>
                        <Link href="/cart">Message</Link>
                      </div>

                      <div className="flex flex-col px-5 py-5 gap-4 text-[14px]">
                        <Link href="/notification">Account Setting</Link>
                        <Link href="/profile">Public Profile</Link>
                        <Link href="/profile">Edit Profile</Link>
                        <button
                          onClick={() => handleLogout()}
                          className="flex items-center gap-2 font-semibold mt-3 text-[17px]"
                        >
                          <IoIosLogOut size={20} /> Logout
                        </button>
                      </div>
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              ) : (
                <div onClick={openModal} className="text-3xl">
                  <BiUserCircle />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        {categories && (
          <HeaderMobile
            handleLogout={handleLogout}
            active={active}
            categories={categories.data}
          />
        )}
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
