"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useGetAllSubCategoryQuery } from "@/features/category/categoryApi";
import { CategoryTypePopulate } from "@/types/categoryType";
import { SlArrowRight } from "react-icons/sl";
import VisibilitySensor from "react-visibility-sensor";

import { IoMdMore } from "react-icons/io";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  categoryId: string;
};
const CourseCategoryNavbar: React.FC<Props> = ({ categoryId }) => {
  const router = useRouter();
  const { data } = useGetAllSubCategoryQuery(categoryId);
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);

  const [dataElementHidden, setDataElementHidden] = useState<
    CategoryTypePopulate[]
  >([]);

  const containmentRef = useRef<HTMLDivElement>(null);

  const handleChangeOpen = (open: boolean) => {
    setOpenMenuDropdown(open);
  };

  const handelClickLinkMore = (categoryId: string, subCategoryId: string) => {
    router.push(`/courses/${categoryId}/${subCategoryId}`);
    setOpenMenuDropdown(false);
  };
  const handleVisibilityChange = useCallback(
    (item: CategoryTypePopulate, isVisible: boolean) => {
      if (isVisible) {
        setDataElementHidden((elements) =>
          elements.filter((element) => element._id !== item._id)
        );
      } else {
        setDataElementHidden((data) => _.uniqBy([...data, item], "_id"));
      }
    },
    [containmentRef]
  );

  return (
    <div className="md:mt-[80px] mt-[60px]  z-[90] overflow-hidden  left-0 w-full h-[50px] shadow-sm bg-white shadow-black dark:bg-blackA9 px-10 flex items-center justify-between ">
      <div
        className="w-[90%]  flex  flex-wrap  items-center gap-6 h-full"
        ref={containmentRef}
      >
        {data && data.data.length > 0 && (
          <div className="flex items-center justify-between gap-5 text-black dark:text-white ">
            <Link
              href={`/courses/${data.data[0].parent_id._id}`}
              className="font-semibold text-[17px]"
            >
              {data.data[0].parent_id.name}
            </Link>
            <div className="">
              <SlArrowRight className="text-gray6 text-[50px]" />
            </div>
          </div>
        )}

        {data &&
          data.data.map((category: CategoryTypePopulate, index: number) => {
            return (
              <VisibilitySensor
                key={category._id}
                onChange={(isVisible: any) =>
                  handleVisibilityChange(category, isVisible)
                }
                containment={containmentRef.current}
              >
                <Link
                  href={`/courses/${category.parent_id._id}/${category._id}`}
                  className="dark:text-gray10 text-gray7 text-[16px] cursor-pointer hover:text-violet9"
                >
                  {category.name}
                </Link>
              </VisibilitySensor>
            );
          })}
      </div>
      {dataElementHidden.length > 0 && (
        <div className="  ">
          <DropdownMenu.Root
            open={openMenuDropdown}
            onOpenChange={handleChangeOpen}
          >
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center justify-center text-xl ">
                <IoMdMore />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="bottom"
                align="center"
                className="min-w-[200px] bg-white dark:bg-gray4 rounded-md z-[100] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              >
                {dataElementHidden.map((item, index) => {
                  return (
                    <DropdownMenu.Item
                      className="group text-[13px] leading-none dark:text-violet3 text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                      key={item._id}
                    >
                      <button
                        onClick={() =>
                          handelClickLinkMore(item.parent_id._id, item._id)
                        }
                      >
                        {item.name}
                      </button>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      )}
    </div>
  );
};

export default CourseCategoryNavbar;
