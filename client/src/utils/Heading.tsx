import React, { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  keyword: string;
}
const Heading: FC<HeadProps> = ({ description, keyword, title }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width ,inital-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </>
  );
};

export default Heading;
