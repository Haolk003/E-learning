"use client";

import React, { ReactElement } from "react";
import { useGenerateBrowserQuery } from "@/features/analytic/analyticApi";
import { FcGoogle } from "react-icons/fc";
import { FaChrome, FaSafari, FaOpera, FaEdge, FaFirefox } from "react-icons/fa";
import { SiUbuntu } from "react-icons/si";
type BrowserSession = {
  name: string;
  sessions: number;
  isGrowing: boolean;
  icon: ReactElement<any, any>;
};

const TrafficSources: React.FC = () => {
  const { data } = useGenerateBrowserQuery("");

  const browserSessions: BrowserSession[] = [
    {
      name: "Google",
      sessions: 23379,
      isGrowing: true,
      icon: (
        <div className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-violet12 text-[18px]">
          <FaChrome />
        </div>
      ),
    },
    {
      name: "Safari",
      sessions: 78973,
      isGrowing: true,
      icon: (
        <div className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-blue10 text-[18px]">
          <FaSafari />
        </div>
      ),
    },
    {
      name: "Opera",
      sessions: 12457,
      isGrowing: false,
      icon: (
        <div className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-green-green10 text-[18px]">
          <FaOpera />
        </div>
      ),
    },
    {
      name: "Edge",
      sessions: 8570,
      isGrowing: true,
      icon: (
        <div className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-cyan10 text-[18px]">
          <FaEdge />
        </div>
      ),
    },
    {
      name: "Firefox",
      sessions: 6135,
      isGrowing: true,
      icon: (
        <div className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-orange-600 text-[18px]">
          <FaFirefox />
        </div>
      ),
    },
    {
      name: "Ubuntu",
      sessions: 4789,
      isGrowing: true,
      icon: (
        <div className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-red9 text-[18px]">
          <SiUbuntu />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-blackA5 shadow-md rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4 border-b border-gray7 px-4 py-3">
        <h2 className="headingAdmin text-[16px]">Traffic Sources</h2>
        <button className="text-indigo-600 hover:text-indigo-800">
          View All
        </button>
      </div>
      <div className="">
        <div className="flex items-center justify-between border-b border-gray8 pb-3 px-4 font-semibold text-[16px]">
          <div className="w-[30%]">Browser</div>
          <div className="w-[35%]">Sessions</div>
          <div className="w-[35%]">Traffic</div>
        </div>
        {browserSessions.map((browser, index) => (
          <div
            key={index}
            className="flex justify-between items-center my-2 border-b border-gray8 px-4 py-3 last:border-b-0 text-[14px]"
          >
            <div className="flex items-center w-[30%] gap-1">
              <div>{browser.icon}</div>
              <span className="font-medium">{browser.name}</span>
            </div>
            <div className="flex items-center justify-between w-[70%]">
              <div className="flex items-center gap-0 w-[50%]">
                <span
                  className={`text-[13px] mr-2 ${
                    browser.isGrowing ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {browser.isGrowing ? "▲" : "▼"}
                </span>
                <span className="font-medium mr-2">
                  {browser.sessions.toLocaleString()}
                </span>
              </div>
              <div className="w-[50%] h-2 bg-gray-200 rounded-full overflow-hidden ">
                <div
                  className="bg-purple-600 h-2"
                  style={{ width: `${(browser.sessions / 100000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSources;
