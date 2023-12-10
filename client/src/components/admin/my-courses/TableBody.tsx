import React, { FC } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import useSetTimeAgo from "@/hooks/useSetTimeAgo";
import * as Progress from "@radix-ui/react-progress";
import Link from "next/link";
type Props = {
  data: {
    id: number;
    title: string;
    category: string;
    updatedAt: string;
    instructor: string;
    status: string;
    courseImg: string;
    classes: number;
    price: number;
    process: number;
    sold: number;
    _id: string;
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
            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Status
            </th>
            <th className="border border-gray11 w-[150px] text-[13px] px-3">
              Process
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
                <th className="border border-gray11 px-3">{item.status}</th>

                <th className="border border-gray11 px-3">
                  <Progress.Root
                    className="relative overflow-hidden dark:bg-white bg-blackA6  rounded-full w-full h-[8px]"
                    style={{
                      // Fix overflow clipping in Safari
                      // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
                      transform: "translateZ(0)",
                    }}
                    value={item.process}
                  >
                    <Progress.Indicator
                      className={`${item.process === 33 && "bg-red9"} ${
                        item.process === 66 && "bg-blue10"
                      } ${
                        item.process === 100 && "bg-green-700"
                      }  progress-bar-striped w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]`}
                      style={{
                        transform: `translateX(-${100 - item.process}%)`,
                      }}
                    />
                  </Progress.Root>
                </th>
                <th className="border border-gray11 px-3">{item.sold}</th>
                <th className="border border-gray11 px-3">${item.price}</th>
                <th className=" border border-gray11 px-3 ">
                  <div className="h-[50px] flex items-center gap-1 justify-center">
                    <Link
                      className="bg-blue8/30 text-blue9 rounded w-[30px] h-[30px] flex items-center justify-center "
                      href={`/admin/create-course/step1/${item._id}`}
                    >
                      <CiEdit />
                    </Link>
                    <button className="bg-red8/30 text-red9 rounded w-[30px] h-[30px] flex items-center justify-center">
                      <FaTrashAlt />
                    </button>
                  </div>
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
