"use client";

import React, { useEffect } from "react";
import SideBarAdmin from "@/components/admin/SideBarAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import AdminProtect from "@/components/hoc/AdminProtect";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT);

export default function layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);
  return (
    <AdminProtect>
      <SideBarAdmin />
      <HeaderAdmin />
      <div className="pl-[20%] py-20"> {children}</div>
    </AdminProtect>
  );
}
