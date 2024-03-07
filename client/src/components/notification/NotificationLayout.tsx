"use client";

import React from "react";
import { useAppSelector } from "@/store/hook";
import Image from "next/image";
import UseSetTimeAgo from "@/hooks/useSetTimeAgo";
import { IoMdTrash } from "react-icons/io";

import { useDeleteNotifyMutation } from "@/features/notification/notifyApi";
const NotificationLayout = () => {
  const notifies = useAppSelector((state) => state.notify.notifies);
  const [deleteNotify] = useDeleteNotifyMutation();

  const handleDeleteNotify = async (id: string) => {
    await deleteNotify(id);
  };

  return (
    <div className="text-black dark:text-white">
      <h2 className="text-xl ">Notifications</h2>
      <div className="flex flex-col gap-3 mt-5">
        {notifies &&
          notifies.map((item, index) => {
            return (
              <div
                key={item._id}
                className="px-4 py-3 border-s-indigo-500 border-s-2 w-full min-h-[50px] rounded-md dark:bg-gray1 bg-gray12 flex items-center justify-between"
              >
                <div className="flex gap-5">
                  <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
                    <Image
                      src={
                        item.sender.avatar
                          ? item.sender.avatar.url
                          : `/assets/avatar.jpg`
                      }
                      alt=""
                      width={35}
                      height={35}
                      className="rounded-full w-[35px] h-[35px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2>
                      {item.sender.lastName} {item.sender.firstName}
                    </h2>
                    <p className="text-[13px] text-gray9">{item.message}</p>
                    <span className="text-[12px] text-gray8">
                      {UseSetTimeAgo({ time: item.createdAt })}
                    </span>
                  </div>
                </div>
                <button
                  className="flex items-center justify-center text-xl"
                  onClick={() => handleDeleteNotify(item._id)}
                >
                  <IoMdTrash />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NotificationLayout;
