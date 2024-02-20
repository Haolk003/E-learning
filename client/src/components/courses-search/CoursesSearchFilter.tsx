import React, { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaCircle } from "react-icons/fa6";
import ColllapseFilter from "../ui/ColllapseFilter";
import Rating from "../ui/Rating";
import RadioGroupFilterRating from "../ui/radio-group/RadioGroupFilterRating";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import CheckboxFilterCourses from "../ui/checkbox/CheckboxFilterCourses";
const CourseSearchFilter = () => {
  const [isCollappedRating, setIsCollappedRating] = useState(false);
  const [isCollappedCategory, setIsCollappedCategory] = useState(false);
  const [isCollapedPrice, setIsCollapedPrice] = useState(false);
  const [isCollapedLevel, setIsCollapedLevel] = useState(false);
  const [filterPrice, setFilerPrice] = useState<any>({
    paid: false,
    free: false,
  });
  const [filtersLevel, setFiltersLevel] = useState<any>({
    all: false,
    beginner: false,
    intermediate: false,
    expert: false,
  });

  const handleCheckboxLevelfilter = (filterName: string) => {
    setFiltersLevel({
      ...filtersLevel,
      [filterName]: !filtersLevel[filterName],
    });
  };

  const handelCheckboxPriceFilter = (filterName: string) => {
    setFilerPrice({
      ...filterPrice,
      [filterName]: !filterPrice[filterName],
    });
  };
  useEffect(() => {
    console.log(filtersLevel);
  }, [filtersLevel]);
  return (
    <div>
      <ColllapseFilter
        isOpenCollapse={isCollappedRating}
        setIsOpenCollapse={setIsCollappedRating}
        title="Ratings"
      >
        <RadioGroupFilterRating />
      </ColllapseFilter>
      <br />

      <ColllapseFilter
        isOpenCollapse={isCollappedCategory}
        setIsOpenCollapse={setIsCollappedCategory}
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
          {Object.keys(filterPrice).map((filter) => (
            <CheckboxFilterCourses
              key={filter}
              label={filter}
              isChecked={filtersLevel[filter]}
              handleCheckbox={() => handelCheckboxPriceFilter(filter)}
            />
          ))}
        </div>
      </ColllapseFilter>
    </div>
  );
};

export default CourseSearchFilter;
