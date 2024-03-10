import React, { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import UseSetTimeAgo from "@/hooks/useSetTimeAgo";

type Props = {
  data: {
    id: string;
    avatar: string;
    name: string;
    email: string;
    totalStudents: number;
    totalClasses: number;
    joinedAt: Date;
  }[];
};
const TableInstructor: FC<Props> = ({ data }) => {
  return (
    <div className="">
      <table className="table flex-nowrap border-collapse table-response  border border-gray11">
        <thead>
          <tr className="h-[50px] text-left">
            <th className="border border-gray11 w-[50px] text-[13px] px-3">
              S.No
            </th>
            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Name
            </th>

            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Email
            </th>
            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Join At
            </th>
            <th className="border border-gray11 text-[11px] w-[130px] px-3">
              Total Classes
            </th>
            <th className="border border-gray11 text-[11px] w-[110px] px-3">
              Total Students
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id} className="h-[50px] text-[13px] text-left ">
                <td className="border border-gray11 px-3">{item.id}</td>
                <td className="border border-gray11 px-3 ">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.avatar}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full w-[30px] h-[30px] object-cover "
                    />
                    <p>{item.name}</p>
                  </div>
                </td>
                <td className="border border-gray11 px-3">{item.email}</td>

                <td className="border border-gray11 px-3">
                  {UseSetTimeAgo({ time: item.joinedAt })}
                </td>
                <td className="border border-gray11 px-3 text-blue9 font-semibold text-[17px]">
                  {item.totalClasses}
                </td>
                <td className="border border-gray11 px-3 text-[17px] font-semibold">
                  {item.totalStudents}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableInstructor;
