"use client";
import { useLoadUserQuery } from "@/features/api/apiSlice";
import React, { FC } from "react";
import Loader from "@/components/loader/Loader";
const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery(undefined);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen ">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Custom;
