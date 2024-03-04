import React from "react";

const UseFindId = (arr: Array<any>, id: string) => {
  return arr.some((item) => {
    return Array.isArray(item) ? item.some((i) => i.id === id) : item.id === id;
  });
};

export default UseFindId;
