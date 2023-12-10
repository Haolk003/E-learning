"use client";

import React, { FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ScrollArea from "./ScrollArea";

type Props = {
  component: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};
const CustomModal: FC<Props> = ({ component, open, handleClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0"
          onClick={handleClose}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed  max-h-[85vh]  max-w-[450px] e p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none min-h-[400px] w-[420px]   top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-bg-slidebar-profile rounded-lg z-[100]">
          <div className="min-h-[400px] w-[420px]  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-bg-slidebar-profile rounded-lg z-[100]">
            <ScrollArea>
              <div className="p-4">
                <div>
                  <button
                    className="absolute right-2 top-2 dark:text-white text-black text-2xl"
                    onClick={handleClose}
                  >
                    <AiOutlineCloseCircle />
                  </button>
                  {component}
                </div>
              </div>
            </ScrollArea>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CustomModal;
