"use client";

import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { useTheme } from "next-themes";

const ThemeSwicher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between">
      {theme === "dark" ? (
        <button
          className="dark:text-white text-mave12 text-[25px]"
          onClick={() => setTheme("light")}
        >
          {" "}
          <BiSun />
        </button>
      ) : (
        <button
          className="dark:text-white text-mave12   text-[25px]"
          onClick={() => setTheme("dark")}
        >
          <BiMoon />
        </button>
      )}
    </div>
  );
};

export default ThemeSwicher;
