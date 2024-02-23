import React, { FC } from "react";

type Props = {
  name: string;
  value: string;
};
const useUpdateQueryString = (
  params: URLSearchParams,
  name: string,
  value: string
) => {
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
};

export default useUpdateQueryString;
