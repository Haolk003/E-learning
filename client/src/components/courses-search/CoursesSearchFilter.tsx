import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ColllapseFilter from "../ui/ColllapseFilter";

import RadioGroupFilterRating from "../ui/radio-group/RadioGroupFilterRating";

import CheckboxFilterCourses from "../ui/checkbox/CheckboxFilterCourses";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { PropsOf } from "@emotion/react";

type Props = {
  ratingsValue: string;
  setRatingsValue: Dispatch<SetStateAction<string>>;
  priceValue: string;
  setPriceValue: Dispatch<SetStateAction<string>>;
  filtersLevel: any;
  setFilterLevel: Dispatch<SetStateAction<any>>;
};
const CourseSearchFilter: React.FC<Props> = ({
  filtersLevel,
  priceValue,
  ratingsValue,
  setFilterLevel,
  setPriceValue,
  setRatingsValue,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const levelQuery = searchParams.getAll("level");
  const [isCollappedRating, setIsCollappedRating] = useState(true);
  const [isCollappedLevel, setIsCollappedLevel] = useState(true);
  const [isCollapedPrice, setIsCollapedPrice] = useState(false);

  const updateQueryStringValue = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        if (!params.has(name, value)) {
          params.append(name, value.toString());
        } else {
          params.set(name, value.toString());
        }
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );
  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        if (!params.has(name)) {
          params.append(name, value.toString());
        } else {
          params.set(name, value.toString());
        }
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );
  const deleteQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleChangeRating = (value: string) => {
    setRatingsValue(value);
    router.push(pathname + "?" + updateQueryString("ratings", value));
  };
  const handleChangePrice = (value: string) => {
    setPriceValue(value);
    router.push(pathname + "?" + updateQueryString("price", value));
  };

  const handleCheckboxLevelfilter = (filterName: string) => {
    if (!filtersLevel[filterName]) {
      const updatedQueryString = updateQueryStringValue("level", filterName);
      router.push(pathname + "?" + updatedQueryString);
    } else {
      const updatedQueryString = deleteQueryString("level", filterName);
      router.push(pathname + "?" + updatedQueryString);
    }
    setFilterLevel((prevFilters: any) => {
      const newFilters = {
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      };

      // Sử dụng updatedQueryString để cập nhật địa chỉ hoặc thực hiện các hành động khác dựa trên query string mới.

      return newFilters;
    });
  };

  return (
    <div className="">
      <ColllapseFilter
        isOpenCollapse={isCollappedRating}
        setIsOpenCollapse={setIsCollappedRating}
        title="Ratings"
      >
        <RadioGroupFilterRating
          value={ratingsValue}
          handleChangeRating={handleChangeRating}
        />
      </ColllapseFilter>

      <br />

      <ColllapseFilter
        isOpenCollapse={isCollappedLevel}
        setIsOpenCollapse={setIsCollappedLevel}
        title="Level"
      >
        <div className="flex flex-col gap-4">
          {Object.keys(filtersLevel).map((filter) => (
            <CheckboxFilterCourses
              key={filter}
              label={filter}
              isChecked={filtersLevel[filter]}
              handleCheckbox={() => handleCheckboxLevelfilter(filter)}
            />
          ))}
        </div>
      </ColllapseFilter>
      <br />
      <ColllapseFilter
        isOpenCollapse={isCollapedPrice}
        setIsOpenCollapse={setIsCollapedPrice}
        title="Price"
      >
        <div className="flex flex-col gap-4">
          <RadioGroup.Root
            className="mt-2 flex flex-col gap-4"
            value={priceValue}
            onValueChange={(value: string) => handleChangePrice(value)}
          >
            <div className="flex items-center gap-2">
              <RadioGroup.Item
                value="paid"
                className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
              </RadioGroup.Item>
              <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
                <p>Paid</p>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroup.Item
                value="free"
                className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
              </RadioGroup.Item>
              <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
                <p>Free</p>
              </label>
            </div>
          </RadioGroup.Root>
        </div>
      </ColllapseFilter>
    </div>
  );
};

export default CourseSearchFilter;
