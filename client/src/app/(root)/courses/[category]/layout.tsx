import React from "react";
import CourseCategoryNavbar from "@/components/courses-category/CourseCategoryNavbar";
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  return (
    <div>
      <CourseCategoryNavbar categoryId={params.category} />
      <div className="mt-[50px]">{children}</div>
    </div>
  );
}
