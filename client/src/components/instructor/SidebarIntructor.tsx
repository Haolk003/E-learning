"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { AiOutlineTool } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";
import { MdLiveTv, MdOutlineChat } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
const SideBarAdmin = () => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: collapsed ? "0%" : "18%",
      }}
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor:
            theme === "dark" ? "rgb(25 25 25)" : " rgb(25 25 25)",
          color: theme === "dark" ? "white" : "white",
        },
      }}
      transitionDuration={500}
      className="dark:bg-gray2  text-white bg-gray5"
    >
      <div className="flex justify-center align-center p-4 mb-5">
        {/* You can add a logo or text here */}
        <div className="text-2xl">
          {!collapsed && (
            <Link href="/" className="flex items-center flex-col ">
              <Image
                src="/assets/logo2.png"
                alt=""
                width={100}
                height={80}
                className="w-[100px] h-[80px] object-contain"
              />
              <h4 className="font-bold">Elearning</h4>
            </Link>
          )}
        </div>
      </div>

      <Menu className="">
        <MenuItem
          component={<Link href="/instructor/courses" />}
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
          className="mb-2 "
          icon={<MdLiveTv size={27} />}
        >
          Courses
        </MenuItem>
        <MenuItem
          component={<Link href="/instructor/communication" />}
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
          className="mb-2 "
          icon={<MdOutlineChat size={27} />}
        >
          Communication
        </MenuItem>
        <MenuItem
          component={<Link href="/instructor/performance/overview/revenue" />}
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
          className="mb-2 "
          icon={<SiSimpleanalytics color="" size={20} />}
        >
          Performance
        </MenuItem>
        <MenuItem
          component={<Link href="/instructor/tools" />}
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
          className="mb-2 "
          icon={<AiOutlineTool size={27} />}
        >
          Tools
        </MenuItem>
        <MenuItem
          component={<Link href="/instructor/resources" />}
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
          className="mb-2 "
          icon={<FaHeart size={22} />}
        >
          Resources
        </MenuItem>
      </Menu>
      {/* <div className="text-center">
        <button className="text-xl" onClick={handleCollapsedChange}>
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div> */}
    </Sidebar>
  );
};

export default SideBarAdmin;
