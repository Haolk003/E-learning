import React from "react";

type Props = {
  thumbnail: string;
  title: string;
  ratings: number;
  totalReviews: number;
  author: string;
  totalLectures: number;
  totalLenghtVideo: number;
  price: number;
  sale: {
    discount: number;
  };
  _id: string;
};
const CartItemPage = () => {
  return <div>CartItemPage</div>;
};

export default CartItemPage;
