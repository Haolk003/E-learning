import React, { FC } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import useSetTimeAgo from "@/hooks/useSetTimeAgo";
type Props = {
  data: {
    id: number;
    title: string;
    category: string;
    updatedAt: string;
    instructor: string;
    students: number;
    courseImg: string;
    classes: number;
    price: number;
  }[];
};
const TableBody: FC<Props> = ({ data }) => {
  return (
    <div className="">
      <table className="table flex-nowrap border-collapse table-response  border border-gray11">
        <thead>
          <tr className="h-[50px] text-left">
            <th className="border border-gray11 w-[100px] text-[13px] px-3">
              S.No
            </th>
            <th className="border border-gray11 w-[300px] text-[13px] px-3">
              Course
            </th>
            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Category
            </th>

            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Last Updated
            </th>
            <th className="border border-gray11 text-[13px] w-[150px] px-3">
              Instructor
            </th>
            <th className="border border-gray11 text-[13px] w-[100px] px-3">
              Students
            </th>
            <th className="border border-gray11 w-[100px] px-3 text-[13px]">
              Price
            </th>
            <th className="border border-gray11 w-[200px] px-3 text-[13px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id} className="h-[50px] text-[13px] text-left ">
                <th className="border border-gray11 px-3">{item.id}</th>
                <th className="border border-gray11 px-3 ">
                  <div className="flex items-center gap-3">
                    {" "}
                    <Image
                      src={item.courseImg}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-md"
                    />
                    <p>{item.title}</p>
                  </div>
                </th>
                <th className="border border-gray11 px-3">{item.category}</th>

                <th className="border border-gray11 px-3">
                  {useSetTimeAgo({ time: item.updatedAt })}
                </th>
                <th className="border border-gray11 px-3">{item.instructor}</th>
                <th className="border border-gray11 px-3">{item.students}</th>
                <th className="border border-gray11 px-3">${item.price}</th>
                <th className="h-[50px] flex items-center gap-1 justify-center ">
                  <button className="bg-blue8/30 text-blue9 rounded w-[30px] h-[30px] flex items-center justify-center ">
                    <CiEdit />
                  </button>
                  <button className="bg-red8/30 text-red9 rounded w-[30px] h-[30px] flex items-center justify-center">
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;
