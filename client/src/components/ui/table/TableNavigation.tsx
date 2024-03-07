import React, { FC } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
type Props = {
  totalCount: number;
  page: number;
  onChangePage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  pageSize: number;
};
const TableNavigation: FC<Props> = ({
  totalCount,
  nextPage,
  onChangePage,
  page,
  prevPage,
  pageSize,
}) => {
  const maxPage = Math.ceil(totalCount / pageSize);
  return (
    <div className="flex items-center justify-between px-4 py-5 border-t dark:border-white border-black">
      <div className="flex items-center gap-4">
        <p className="text-sm">Showing {totalCount} Entries</p>{" "}
        <HiOutlineArrowNarrowRight />
      </div>
      <div className="flex items-center gap-3">
        <button
          className="bg-black text-violet11 rounded-md px-3 h-[35px]"
          onClick={prevPage}
        >
          Prev
        </button>
        <div className="flex items-center gap-2">
          <button
            className={`${
              page === 1 && "rounded bg-violet9 w-[30px] h-[30px] text-white"
            } w-[30px] h-[30px]`}
            onClick={() => onChangePage(1)}
          >
            1
          </button>
          {maxPage > 1 && (
            <button
              className={`${
                page === 2 && "rounded bg-violet9 w-[30px] h-[30px] text-white"
              } w-[30px] h-[30px]`}
              onClick={() => onChangePage(2)}
            >
              2
            </button>
          )}
          {maxPage > 5 && (page < 3 || page >= maxPage - 1) && <span>...</span>}
          {maxPage > 5 && page > 2 && page < maxPage - 1 && (
            <div className="flex items-center gap-2">
              <span>...</span>
              <button
                className={`rounded bg-violet9 w-[30px] h-[30px] text-white`}
              >
                {page}
              </button>
              <span>...</span>
            </div>
          )}

          {maxPage === 3 && (
            <button
              className={`${
                page === 3 && "rounded bg-violet9 w-[30px] h-[30px] text-white"
              } w-[30px] h-[30px]`}
              onClick={() => onChangePage(3)}
            >
              3
            </button>
          )}

          {maxPage > 3 && (
            <div
              className={`${
                page === maxPage - 1 &&
                "rounded bg-violet9 w-[30px] h-[30px] text-white"
              }  w-[30px] h-[30px] flex items-center justify-center`}
              onClick={() => onChangePage(maxPage - 1)}
            >
              {maxPage - 1}
            </div>
          )}
          {maxPage > 4 && (
            <div
              className={`${
                page === maxPage &&
                "rounded bg-violet9 w-[30px] h-[30px] text-white"
              } w-[30px] h-[30px] flex items-center justify-center`}
              onClick={() => onChangePage(maxPage)}
            >
              {maxPage}
            </div>
          )}
        </div>
        <button
          className="bg-black text-violet11 rounded-md px-3 h-[35px]"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableNavigation;
