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
import { GrDocumentPerformance } from "react-icons/gr";
import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";
import { MdLiveTv, MdOutlineChat } from "react-icons/md";
import Link from "next/link";

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
          backgroundColor: theme === "dark" ? "rgb(25 25 25)" : "#2d2f31",
          color: theme === "dark" ? "white" : "black",
        },
      }}
      transitionDuration={500}
      className="bg-gray2  text-white "
    >
      <div className="flex justify-center align-center p-4 mb-5">
        {/* You can add a logo or text here */}
        <div className="text-2xl">{!collapsed && <span>Elearning</span>}</div>
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
          component={<Link href="/instructor/performance" />}
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
      <div className="text-center">
        <button className="text-xl" onClick={handleCollapsedChange}>
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </Sidebar>
  );
};

export default SideBarAdmin;
