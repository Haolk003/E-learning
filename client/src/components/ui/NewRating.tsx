import React, { Dispatch, SetStateAction, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

type Props = {
  setRating: Dispatch<SetStateAction<number>>;
  hoverValue: number;
  rating: number;
  handleNextStep: () => void;
  step: number;
  setHoverValue: Dispatch<SetStateAction<number>>;
};
const NewRating: React.FC<Props> = ({
  setRating,
  hoverValue,
  setHoverValue,
  rating,
  handleNextStep,
  step,
}) => {
  const handleChangeRating = (value: number) => {
    if (step === 1) {
      setHoverValue(value);
    }
  };
  const handleClickRating = (value: number) => {
    if (step === 1) {
      setRating(value);
      handleNextStep();
    }
  };
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starValue = i;
    const isFilled = hoverValue >= starValue;

    const starIcon = isFilled ? (
      <AiFillStar size={40} color="#f6b100" className="mr-1.5 cursor-pointer" />
    ) : (
      <AiOutlineStar
        size={40}
        color="#f6b100"
        className="mr-1.5 cursor-pointer"
      />
    );

    stars.push(
      <div
        className="text-2xl"
        key={i}
        onMouseEnter={() => handleChangeRating(starValue)}
        onMouseLeave={() => handleChangeRating(rating)}
        onClick={() => handleClickRating(starValue)}
      >
        {starIcon}
      </div>
    );
  }

  return <div className="flex items-center">{stars}</div>;
};

export default NewRating;
