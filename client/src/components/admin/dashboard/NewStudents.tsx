import React, { useEffect, useState } from "react";
import { useGetAllNewStudentQuery } from "@/features/user/userApi";
import TableNewStudents from "@/components/ui/table/TableNewStudent";
type dataTableStudentType = {
  id: number;
  avatar: string;
  name: string;
  email: string;
  courses: number;
  joinedAt: Date;
};

type dataGetApi = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  myLearning: string[];
  avatar: { public: string; url: string } | null;
};
const NewStudents = () => {
  const { data } = useGetAllNewStudentQuery("");
  const [dataNewStudents, setDataNewStudents] = useState<
    dataTableStudentType[]
  >([]);
  useEffect(() => {
    if (data) {
      const newData: dataTableStudentType[] = data.data.map(
        (item: dataGetApi, index: number) => {
          return {
            id: item._id,
            avatar: item.avatar ? item.avatar.url : "/assets/avatar.jpg",
            name: item.lastName + " " + item.firstName,
            email: item.email,
            courses: item.myLearning.length,
            joinedAt: item.createdAt,
          };
        }
      );

      setDataNewStudents(newData);
    }

    console.log(data);
  }, [data]);
  return (
    <div>
      <div className="bg-gray2 rounded-lg mt-4 overflow-hidden ">
        <div className="py-5 px-4 ">
          <h2 className="headingAdmin !text-[14px]">Top Instructor</h2>
        </div>
        <div className="px-4 py-3 border-t border-gray8">
          <TableNewStudents data={dataNewStudents} />
        </div>
      </div>
    </div>
  );
};

export default NewStudents;
