"use client";

import React from "react";
import { useCalculateMonthNewUserSessionQuery } from "@/features/analytic/analyticApi";

const SessionNewUser = () => {
  const { data } = useCalculateMonthNewUserSessionQuery("");
  console.log(data);
  return (
    <div className="my-4">
      <div className="bg-blackA4 rounded-md w-full">
        <div className=" py-5 px-4 border-b border-gray8">
          <h2 className="headingAdmin">Sessions Duration By New User</h2>
        </div>
      </div>
    </div>
  );
};

export default SessionNewUser;
