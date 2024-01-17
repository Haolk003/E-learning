"use client";

import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/utils/next-themes";
import Header from "@/components/Header";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

import {
  useCreateInteractCourseMutation,
  useUpdatePageViewMutation,
  useUpdateInteractEndTimeMutation,
  useUpdateTimeSpentMutation,
} from "@/features/interact/InteractApi";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [request, setRequest] = useState(false);

  const [createInteract, { data }] = useCreateInteractCourseMutation();

  const [updateInteractPageView, { error }] = useUpdatePageViewMutation();

  const [updateEndTime] = useUpdateInteractEndTimeMutation();

  const [updateTimeSpent] = useUpdateTimeSpentMutation();

  const pathname = usePathname();

  const handleUpdateTimeSpent = async () => {
    const sessionInteract = sessionStorage.getItem("session-interact");
    if (sessionInteract) {
      await updateTimeSpent({
        id: JSON.parse(sessionInteract).id,
        timeSpent: 20,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateTimeSpent();
    }, 20000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleRouteChange = () => {
      // Xử lý chuyển trang ở đây
      console.log(pathname);
    };

    window.onpopstate = handleRouteChange;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    if (request) {
      const sessionInteract = sessionStorage.getItem("session-interact");

      if (!sessionInteract) {
        createInteract(pathname);
      } else {
        updateInteractPageView({
          id: JSON.parse(sessionInteract).id,
          url: pathname,
        });
      }
    }
    setRequest(true);
  }, [pathname, request]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem(
        "session-interact",
        JSON.stringify({ id: data.data._id })
      );
    }
  }, [data]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      const sessionInteract = sessionStorage.getItem("session-interact");

      if (sessionInteract) {
        await updateEndTime(JSON.parse(sessionInteract).id);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="">{children}</div>
    </>
  );
}
