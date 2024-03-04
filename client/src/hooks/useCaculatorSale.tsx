import React from "react";

const UseCaculatorSale = (price: number, discount: number) => {
  return (price - (price * discount) / 100).toFixed(2);
};

export default UseCaculatorSale;
