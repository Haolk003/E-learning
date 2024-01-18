"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  useUpdateInteractionPageViewMutation,
} from "@/features/interact/InteractApi";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<EventListener | null>(null);
  const clickRef = useRef<EventListener | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [request, setRequest] = useState(false);

  const [createInteract, { data }] = useCreateInteractCourseMutation();

  const [updateInteractPageView, { error }] = useUpdatePageViewMutation();

  const [updateEndTime] = useUpdateInteractEndTimeMutation();

  const [updateTimeSpent] = useUpdateTimeSpentMutation();
  const [updateInteractionPageView] = useUpdateInteractionPageViewMutation();

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

  const handleInteractType = async (type: string) => {
    const sessionInteract = sessionStorage.getItem("session-interact");

    if (sessionInteract) {
      await updateInteractionPageView({
        id: JSON.parse(sessionInteract).id,
        interation: type,
      });
    }
  };
  const handleScroll = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleInteractType("scroll");
    }, 3000);
  }, []);

  const handleClick = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    handleInteractType("click");
  }, []);
  useEffect(() => {
    scrollRef.current = handleScroll;
    clickRef.current = handleClick;

    window.addEventListener("scroll", scrollRef.current);
    window.addEventListener("click", clickRef.current);

    return () => {
      window.removeEventListener("scroll", scrollRef.current as EventListener);
      window.removeEventListener("click", clickRef.current as EventListener);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [handleScroll, handleClick]);
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
