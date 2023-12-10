"use client";
import useAnimatedRouter from "@/hooks/useAnimatedRoute";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};
const AnimatedLink: FC<Props> = ({ children, href }) => {
  const { animatedRoute } = useAnimatedRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        animatedRoute(href);
      }}
      passHref
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
