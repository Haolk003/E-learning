import React from "react";
import SideBarAdmin from "@/components/admin/SideBarAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import AdminProtect from "@/components/hoc/AdminProtect";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtect>
      <SideBarAdmin />
      <HeaderAdmin />
      <div className="pl-[18%] py-20"> {children}</div>
    </AdminProtect>
  );
}
