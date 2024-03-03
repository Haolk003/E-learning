"use client";

import React, { useEffect, useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useGetAllCourseQuery } from "@/features/course/courseApi";
import { CourseType } from "@/types/couresContentType";
import { IoIosSearch } from "react-icons/io";
import Loader from "@/components/loader/Loader";
import CourseListHeader from "./course-list/CourseListHeader";
import TableBody from "./course-list/TableBody";
import TableNavigation from "@/components/ui/table/TableNavigation";

const CourseList = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [countTotal, setCountTotal] = useState(0);
  const [sort, setSort] = useState("-createdAt");

  const { refetch, data, error, isSuccess, isLoading } = useGetAllCourseQuery(
    { page: page, limit: pageSize, sort: sort, keyword: keyword },
    { refetchOnMountOrArgChange: true }
  );
  const handleChangeInput = (value: string) => {
    setKeyword(value);
    setLoadingData(true);
    setPage(1);
  };
  const nextPage = () => {
    if (Math.round(countTotal / 1) > page) {
      setPage(page + 1);
      setLoadingData(true);
    }
  };
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      setLoadingData(true);
    }
  };
  const handelChangePage = (page: number) => {
    setPage(page);
    setLoadingData(true);
  };
  const handleChangeSort = (value: string) => {
    setSort(value);
    setLoadingData(true);
  };

  useEffect(() => {
    if (data) {
      const courseData = data.data.courses;
      setRowData(
        courseData.map((item: any, index: number) => {
          return {
            category: item.category.name,
            instructor: item.author.lastName + " " + item.author.firstName,
            price: item.price,
            students: item.sold,
            updatedAt: item.updatedAt,
            title: item.title,
            id: (page - 1) * index + 1,
            classes: 3,
            courseImg: item.thumbnail.url,
          };
        }, [])
      );

      setLoadingData(false);
      setCountTotal(data.data.countQuery);
    }
  }, [data]);

  return (
    <div className="dark:text-white text-black ">
      <div className="bg-blackA4 rounded-lg">
        <CourseListHeader
          sort={sort}
          onChangeSort={handleChangeSort}
          keyword={keyword}
          onChangeInput={handleChangeInput}
        />
        <div className="px-3 py-5">
          <TableBody data={rowData} />
        </div>
        <TableNavigation
          page={page}
          totalCount={countTotal}
          nextPage={nextPage}
          prevPage={prevPage}
          onChangePage={handelChangePage}
        />
      </div>
      {(loadingData || isLoading) && (
        <div className="fixed top-0 left-0 bg-blackA5 w-screen h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CourseList;
