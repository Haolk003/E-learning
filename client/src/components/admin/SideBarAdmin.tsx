"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useLogoutUserMutation } from "@/features/auth/authApi";

import { useAppSelector } from "@/store/hook";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineHome, AiOutlineTeam, AiOutlineSetting } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { SiCoursera } from "react-icons/si";
import { MdLiveTv } from "react-icons/md";
import { BiCustomize, BiAnalyse } from "react-icons/bi";
import { BsLayoutTextWindow } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { CgController } from "react-icons/cg";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUsersRays } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

const SideBarAdmin = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { theme } = useTheme();
  const [logout, { isLoading, isSuccess, error }] = useLogoutUserMutation();
  const pathName = usePathname();

  const [isCollapse, setIsCollapse] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      toast.success("User Logout Successfully");
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error]);
  const handleLogout = async () => {
    await logout({});
  };
  return (
    <div className="">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: theme === "dark" ? "#182449" : "#2F62FF3C",
            color: theme === "dark" ? "white" : "black",
          },
        }}
        transitionDuration={500}
        collapsed={isCollapse}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapse ? "0%" : "18%",
        }}
      >
        <div className="flex items-center gap-4 justify-center mb-4 py-3">
          {!isCollapse && (
            <Link href="/" className="text-2xl tracking-wider cursor-pointer ">
              ELEARNING
            </Link>
          )}
          <button onClick={() => setIsCollapse(!isCollapse)}>
            <IoIosArrowBack className="text-3xl" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Image
            src={user?.avatar ? user?.avatar.url : "/assets/avatar.jpg"}
            alt=""
            width={80}
            height={80}
            className="w-[80px] h-[80px] object-cover rounded-full border-[3px] border-indigo-500"
          />
          <h4 className="text-xl">
            {user?.lastName} {user?.firstName}
          </h4>
          <p className="capitalize">{user?.role}</p>
        </div>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#fff",
                color: "#fff",
              },
            },
          }}
        >
          <MenuItem
            active={pathName === "/admin" ? true : false}
            component={<Link href="/admin" />}
            rootStyles={{
              ["." + menuClasses.button]: {
                "&:hover": {
                  color: "#000",
                },
              },
            }}
            className={`${theme === "dark" && "menu-dark"}`}
          >
            <div
              className={`flex items-center ${
                isCollapse ? "justify-center" : "ml-[7px]"
              } gap-4  `}
            >
              <div className="">
                <AiOutlineHome className="text-xl" />
              </div>
              {!isCollapse && <div>Dashboard</div>}
            </div>
          </MenuItem>

          <SubMenu
            icon={<BsClipboardData className="" />}
            defaultOpen={false}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "transparent",
                color: "#000",
                "&:hover": {
                  color: "#000000",
                  background: "#333",
                },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "transparent",
              },
            }}
            label="Data"
            className="!bg-transparent hover:!bg-transparent"
          >
            <MenuItem
              active={pathName === "/admin/data/users"}
              component={<Link href="/admin/data/users" />}
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <FaRegUserCircle />
                </div>
                <div>Users</div>
              </div>
            </MenuItem>
            <MenuItem
              active={pathName === "/admin/data/invoices"}
              component={<Link href="/admin/data/invoices" />}
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <LiaFileInvoiceSolid />
                </div>
                <div>Invoices</div>
              </div>
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<SiCoursera className="" />}
            defaultOpen={false}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "transparent",
                color: "#000",
                "&:hover": {
                  color: "#000000",
                  background: "#333",
                },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "transparent",
              },
            }}
            label="Content"
            className="!bg-transparent hover:!bg-transparent"
          >
            <MenuItem
              active={pathName === "/admin/create-course/step1"}
              component={<Link href="/admin/create-course/step1" />}
              className={`${theme === "dark" && "menu-dark"}hover:text-black`}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <FaRegUserCircle />
                </div>
                <div>Create Course</div>
              </div>
            </MenuItem>
            <MenuItem
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
              active={pathName === "/admin/live-course"}
              component={<Link href="/admin/live-course" />}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <MdLiveTv />
                </div>
                <div>Live Course</div>
              </div>
            </MenuItem>
            <MenuItem
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
              active={pathName === "/admin/my-courses"}
              component={<Link href="/admin/my-courses" />}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <MdLiveTv />
                </div>
                <div>My Courses</div>
              </div>
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<BiCustomize className="" />}
            defaultOpen={false}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "transparent",
                color: "#000",
                "&:hover": {
                  color: "#000000",
                  background: "#333",
                },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "transparent",
              },
            }}
            label="Customization"
            className="!bg-transparent hover:!bg-transparent"
          >
            <MenuItem
              active={pathName === "/admin/hero"}
              component={<Link href="/admin/hero" />}
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <BsLayoutTextWindow />
                </div>
                <div>Hero</div>
              </div>
            </MenuItem>
            <MenuItem
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
              active={pathName === "/admin/faq"}
              component={<Link href="/admin/faq" />}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <FaQuestion />
                </div>
                <div>FAQ</div>
              </div>
            </MenuItem>
            <MenuItem
              active={pathName === "/admin/categories"}
              component={<Link href="/admin/categories" />}
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <BiCategoryAlt />
                </div>
                <div>Categories</div>
              </div>
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<CgController className="" />}
            defaultOpen={false}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "transparent",
                color: "#000",
                "&:hover": {
                  color: "#000000",
                  background: "#333",
                },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "transparent",
              },
            }}
            label="Controllers"
            className="!bg-transparent hover:!bg-transparent"
          >
            <MenuItem
              active={pathName === "/admin/manage-team"}
              component={<Link href="/admin/manage-team" />}
              className={`${theme === "dark" && "menu-dark"} hover:text-black`}
            >
              <div className="flex items-center">
                <div className="w-[50px]">
                  <AiOutlineTeam />
                </div>
                <div>Manage Team</div>
              </div>
            </MenuItem>
          </SubMenu>

          <MenuItem
            active={pathName === "/admin/analytics"}
            component={<Link href="/admin/analytics" />}
            className={`${theme === "dark" && "menu-dark"} hover:text-black`}
          >
            <div className="flex items-center">
              <div className="w-[50px]">
                <IoAnalyticsSharp />
              </div>
              <div>Analytics</div>
            </div>
          </MenuItem>
          <MenuItem
            active={pathName === "/admin/setting"}
            component={<Link href="/admin/setting" />}
            className={`${theme === "dark" && "menu-dark"} hover:text-black`}
          >
            <div
              className={`flex items-center ${
                isCollapse ? "justify-center" : "ml-[7px]"
              } gap-4 `}
            >
              <div className="">
                <AiOutlineSetting />
              </div>
              {!isCollapse && <div>Setting</div>}
            </div>
          </MenuItem>
          <MenuItem
            className={`${theme === "dark" && "menu-dark"} hover:text-black`}
            onClick={handleLogout}
          >
            <div
              className={`flex items-center ${
                isCollapse ? "justify-center" : "ml-[7px]"
              } gap-4 `}
            >
              <div className="">
                <FiLogOut />
              </div>
              {!isCollapse && <div>Logout</div>}
            </div>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBarAdmin;
