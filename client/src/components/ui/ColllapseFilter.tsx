import React, { Dispatch, SetStateAction } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";

import { IoChevronDownOutline } from "react-icons/io5";

type Props = {
  isOpenCollapse: boolean;
  setIsOpenCollapse: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
};
const ColllapseFilter: React.FC<Props> = ({
  isOpenCollapse,
  setIsOpenCollapse,
  title,
  children,
}) => {
  return (
    <div>
      <Collapsible.Root open={isOpenCollapse} onOpenChange={setIsOpenCollapse}>
        <Collapsible.Trigger
          className="border-t dark:border-gray8 border-gray4 md:py-2 md:px-1 py-4 px-4"
          asChild
        >
          <div className="flex items-center justify-between ">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <button
              className="text-2xl duration-300"
              style={{ rotate: isOpenCollapse ? "180deg" : "0deg" }}
            >
              <IoChevronDownOutline />
            </button>
          </div>
        </Collapsible.Trigger>
        <Collapsible.Content className="md:p-0 px-4 py-4">
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default ColllapseFilter;
