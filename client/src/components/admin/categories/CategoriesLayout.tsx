"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useNewCategoryMutation,
  useUpdateCategoryByIdMutation,
} from "@/features/category/categoryApi";
import AlertDialogDeleteCategory from "./AlertDialogDeleteCategory";
import { FaAnglesDown } from "react-icons/fa6";
import { CategoryType } from "@/types/categoryType";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

import * as ToolTip from "@radix-ui/react-tooltip";
import CreateEditCategoriesModal from "./CreateEditCategoriesModal";

interface Category {
  id: string;
  name: string;
  courseTotal: number;
  subCategories?: { id: string; name: string; courseTotal: number }[];
}

const CategoriesLayout = () => {
  const { data: categories, refetch } = useGetAllCategoryQuery("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [typeModal, setTypeModal] = useState("create");
  const [idUpdate, setIdUpdate] = useState("");
  const [parentIdCreate, setParentIdCreate] = useState("");
  const [value, setValue] = useState("");
  const handleClickNewCategory = () => {
    setTypeModal("create");
    setOpen(true);
  };

  const handleChangeOpen = (open: boolean) => {
    setOpen(open);
  };
  const handleChangeValue = (value: string) => {
    setValue(value);
  };

  const handleClickNewSubcategory = (id: string) => {
    setTypeModal("create-subcategory");
    setParentIdCreate(id);
    setOpen(true);
  };

  const handleClickUdpateCategory = (id: string, nameValue: string) => {
    setTypeModal("update");
    setIdUpdate(id);
    setValue(nameValue);
    setOpen(true);
  };

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setOpenDelete(true);
  };
  const handleChangeOpenDelete = (open: boolean) => {
    setOpenDelete(open);
  };

  const columns = React.useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row, getValue }) => (
          <button
            type="button"
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", paddingLeft: `${row.depth * 2}rem` },
            }}
          >
            {getValue() ? (
              <div className="flex items-center gap-3">
                {getValue()?.toString()}{" "}
                {row.getCanExpand() && (
                  <FaAnglesDown
                    className={`${
                      row.getIsExpanded() ? "rotate-[180deg]" : "rotate-0"
                    }`}
                  />
                )}
              </div>
            ) : (
              ""
            )}
          </button>
        ),
      },
      {
        accessorKey: "courseTotal",
        header: "Course Total",
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row, getValue }) => (
          <div className="flex items-center gap-2">
            {!row.getParentRow() && (
              <button
                className="flex items-center  text-white text-xl w-[30px] h-[30px] justify-center bg-green-green10/90 rounded-sm"
                onClick={() => handleClickNewSubcategory(row.getValue("id"))}
              >
                <IoAddCircleOutline />
              </button>
            )}

            <button
              className="flex items-center justify-center  text-white text-xl w-[30px] h-[30px]  bg-blue10/90 rounded-sm"
              onClick={() =>
                handleClickUdpateCategory(
                  row.getValue("id"),
                  row.getValue("name")
                )
              }
            >
              <MdEdit />
            </button>
            <button
              className="flex items-center  text-white text-xl w-[30px] h-[30px] justify-center bg-red10/90 rounded-sm"
              onClick={() => handleClickDelete(row.getValue("id"))}
            >
              <IoMdTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const transformedData = React.useMemo(() => {
    if (categories) {
      const fomatcategory = categories.data as CategoryType[];

      const columns = fomatcategory.flatMap((category) => [
        {
          id: category._id,
          name: category.name,
          courseTotal: category.courseCount,
          subCategories: category.subcategories.map((item) => {
            return {
              id: item._id,
              name: item.name,
              courseTotal: item.courseCount,
            };
          }, []),
        },
      ]);

      return columns;
    }
  }, [categories]);

  const table = useReactTable({
    data: transformedData || [],
    columns: columns,
    getSubRows: (row) => row.subCategories,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="w-[80%] mx-auto">
      <h2 className="font-bold text-2xl mb-5">Categories Managament</h2>

      <div className="bg-blackA4 rounded-lg">
        <div className=" w-full mx-auto px-5 py-6 border-b border-white flex items-center justify-between">
          <h2 className='relative before:content-[" "] before:absolute before:-left-2 before:top-[50%] before:-translate-y-1/2 before:h-[1rem] before:w-[0.2rem] before:bg-gradient-to-b before:from-[rgba(132,90,223,0.5)] before:to-[rgba(35,183,229,0.5)] before:rounded-[0.5rem] ml-3 text-[17px] font-semibold'>
            Categories List
          </h2>
          <button
            className="flex items-center gap-2 bg-green-green10 px-5 py-2 rounded-md text-white"
            onClick={handleClickNewCategory}
          >
            <IoAddCircleOutline /> Add New Catgory
          </button>
        </div>
        <div className="px-3 py-5">
          <table className="min-w-full divide-y divide-gray-200 table flex-nowrap border-collapse table-response  border border-gray11">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="h-[50px] text-left ">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-semibold text-[17px]  uppercase tracking-wider border border-gray11 w-[100px]  "
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`${
                        !row.getParentRow()
                          ? "text-white border border-gray11"
                          : "border-y border-gray11 text-gray11"
                      } px-6 py-4 whitespace-nowrap text-sm `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateEditCategoriesModal
        handleChangeOpen={handleChangeOpen}
        open={open}
        type={typeModal}
        handleChangeValue={handleChangeValue}
        value={value}
        id={idUpdate}
        parent_id={parentIdCreate}
        refetch={refetch}
      />
      <AlertDialogDeleteCategory
        handleChangeOpen={handleChangeOpenDelete}
        open={openDelete}
        id={idDelete}
        refetch={refetch}
      />
    </div>
  );
};

export default CategoriesLayout;
