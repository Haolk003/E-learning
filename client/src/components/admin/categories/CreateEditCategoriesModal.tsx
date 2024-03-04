import React, { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoIosClose } from "react-icons/io";
import {
  useNewCategoryMutation,
  useUpdateCategoryByIdMutation,
} from "@/features/category/categoryApi";
import toast from "react-hot-toast";
import { Erica_One } from "next/font/google";
type Props = {
  type: string;
  value: string;
  handleChangeValue: (value: string) => void;
  parent_id?: string;
  id?: string;
  open: boolean;
  handleChangeOpen: (open: boolean) => void;
  refetch: () => void;
};
const CreateEditCategoriesModal: React.FC<Props> = ({
  handleChangeValue,
  type,
  value,
  id,
  parent_id,
  handleChangeOpen,
  open,
  refetch,
}) => {
  const [
    createCategory,
    {
      isLoading: isLoadingCreateCategory,
      isSuccess: isSuccesCreateCategory,
      error: errorCreate,
    },
  ] = useNewCategoryMutation();

  const [
    updateCategory,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdae,
      error: errorUpdate,
    },
  ] = useUpdateCategoryByIdMutation();
  const handleSubmit = async () => {
    if (value !== "") {
      if (type === "create") {
        createCategory({ name: value });
      } else if (
        type === "create-subcategory" &&
        parent_id &&
        parent_id !== ""
      ) {
        createCategory({ name: value, parent_id: parent_id });
      } else if (type === "update" && id && id !== "") {
        updateCategory({ id: id, data: { name: value } });
      }
    }
  };

  useEffect(() => {
    if (isSuccesCreateCategory) {
      refetch();
      handleChangeOpen(false);
      toast.success("Create Category Successfully");
    } else if (isSuccessUpdae) {
      refetch();
      handleChangeOpen(false);
      toast.success("Update Category Successfully");
    } else if (errorUpdate && "data" in errorUpdate) {
      const errorMessage = errorUpdate.data as { message: string };
      toast.error(errorMessage.message);
    } else if (errorCreate && "data" in errorCreate) {
      const errorMessage = errorCreate.data as { message: string };
      toast.error(errorMessage.message);
    }
  }, [isSuccesCreateCategory, isSuccessUpdae, errorUpdate, errorCreate]);

  return (
    <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] dark:bg-gray2 bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className=" m-0 text-[17px] font-medium">
            {type === "create" && "Create Category"}
            {type === "create-subcategory" && "Create Subcategory"}
            {type === "update" && "Update Category"}
          </Dialog.Title>
          <Dialog.Description className="text-mauve5 dark:text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to your category here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <input
              className="dark:text-white text-black shadow-violet7 focus:shadow-violet8 inline-flex  h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              value={value}
              onChange={(e) => handleChangeValue(e.target.value)}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <button
              className="text-green-green4 bg-green-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11  hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <IoIosClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEditCategoriesModal;
