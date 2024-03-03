"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import "tailwindcss/tailwind.css";

interface Category {
  id: string;
  name: string;
  courseTotal: number;
  subCategories?: Category[];
}

const defaultData: Category[] = []; // Điền dữ liệu mẫu của bạn vào đây
const data: Category[] = [
  {
    id: "1",
    name: "Programming",
    courseTotal: 120,
    subCategories: [
      { id: "1-1", name: "Web Development", courseTotal: 40 },
      { id: "1-2", name: "Mobile Development", courseTotal: 30 },
      { id: "1-3", name: "Data Science", courseTotal: 50 },
    ],
  },
  {
    id: "2",
    name: "Design",
    courseTotal: 60,
    subCategories: [
      { id: "2-1", name: "Graphic Design", courseTotal: 30 },
      { id: "2-2", name: "UX/UI Design", courseTotal: 30 },
    ],
  },
  {
    id: "3",
    name: "Marketing",
    courseTotal: 80,
    subCategories: [
      { id: "3-1", name: "Digital Marketing", courseTotal: 40 },
      { id: "3-2", name: "Content Marketing", courseTotal: 40 },
    ],
  },
];

const CategoriesLayout = () => {
  const columns = React.useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "courseTotal",
        header: "Course Total",
      },
      {
        id: "expander",
        header: "Expander",
        cell: ({ row, getValue }) => (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? "👇" : "👉"}
          </button>
        ),
      },
    ],
    []
  );
  const transformedData = React.useMemo(() => {
    const flattenData = (categories: Category[]): any[] => {
      return categories.flatMap((category) => [
        {
          ...category,
          subRows: category.subCategories
            ? flattenData(category.subCategories)
            : undefined,
        },
      ]);
    };
    return flattenData(data);
  }, [data]);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) => row.subCategories,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
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
                className="px-6 py-4 whitespace-nowrap text-sm text-white"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesLayout;
