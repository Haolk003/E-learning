// pages/_error.tsx

"use client";
import { NextPageContext } from "next";
import ErrorPage from "@/components/errors/500";
interface ErrorProps {
  statusCode?: number;
}

export default function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ErrorPage />
    </div>
  );
}

export function getErrorProps({ err, res }: NextPageContext) {
  const statusCode =
    res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return { props: { statusCode } };
}
