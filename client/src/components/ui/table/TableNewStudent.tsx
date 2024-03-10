import React, { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import UseSetTimeAgo from "@/hooks/useSetTimeAgo";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

type Props = {
  data: {
    id: number;
    avatar: string;
    name: string;
    email: string;
    courses: number;
    joinedAt: Date;
  }[];
};
const TableNewStudents: FC<Props> = ({ data }) => {
  return (
    <div className="">
      <table className="table flex-nowrap border-collapse table-response  border border-gray11 overflow-auto">
        <thead>
          <tr className="h-[50px] text-left">
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
              Courses
            </th>
            <th className="border border-gray11 text-[11px] w-[110px] px-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id} className="h-[50px] text-[13px] text-left ">
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
                  {item.courses}
                </td>

                <div className="h-[50px] flex items-center gap-1 justify-center">
                  <Link
                    className="bg-blue8/30 text-blue9 rounded w-[30px] h-[30px] flex items-center justify-center "
                    href={`/admin/create-course/step1/${item.id}`}
                  >
                    <CiEdit />
                  </Link>
                  <button className="bg-red8/30 text-red9 rounded w-[30px] h-[30px] flex items-center justify-center">
                    <FaTrashAlt />
                  </button>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableNewStudents;
