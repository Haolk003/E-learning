import React, { useEffect, useState } from "react";
import { useGetTopInstructorQuery } from "@/features/user/userApi";
import TableInstructor from "@/components/ui/table/TableInstructor";

type topInstructorDataType = {
  _id: string;
  totalSales: number;
  courses: string[];
  count: number;
  firstName: string;
  lastName: string;
  avatar: { public_id: string; url: string } | null;
  email: string;
  timeBeginInstructors: Date;
};

type DataFomattedTable = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  totalStudents: number;
  totalClasses: number;
  joinedAt: Date;
};
const TopInstructor = () => {
  const { data, isLoading, isSuccess } = useGetTopInstructorQuery("");
  const [dataInstructor, setDataInstructor] = useState<DataFomattedTable[]>([]);
  useEffect(() => {
    if (data) {
      const newData: DataFomattedTable[] = data.data.map(
        (item: topInstructorDataType, index: number) => {
          return {
            id: index + 1,
            avatar: item.avatar ? item.avatar.url : "/assets/avatar.jpg",
            name: item.lastName + " " + item.firstName,
            totalStudents: item.count,
            totalClasses: item.courses.length,
            joinedAt: item.timeBeginInstructors,
            email: item.email,
          };
        }
      );
      setDataInstructor(newData);
    }
  }, [data]);
  return (
    <div className="bg-gray2 rounded-lg mt-4 overflow-auto ">
      <div className="py-5 px-4 ">
        <h2 className="headingAdmin !text-[14px]">Top Instructor</h2>
      </div>{" "}
      <div className="px-4 py-3 border-t border-gray8">
        <TableInstructor data={dataInstructor} />
      </div>
    </div>
  );
};

export default TopInstructor;
