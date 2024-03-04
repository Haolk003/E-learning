"use client";

import { ExtendDocument } from "@/types/extendDocument";
import { useRouter } from "next/navigation";
export default function UseAnimatedRouter() {
  const router = useRouter();
  const viewTransitionsStatus = () => {
    const extendedDocument = document as ExtendDocument;
    let status = "Opss, Your bowser doesn't support View Transitions API";

    if (extendedDocument?.startViewTransition) {
      status = "Yes, Your browser support View Transition API";
    }
    return status;
  };
  const animatedRoute = (url: string) => {
    const extendDocument = document as ExtendDocument;
    if (!extendDocument.startViewTransition) {
      return router.push(url);
    } else {
      extendDocument.startViewTransition(() => {
        router.push(url);
      });
    }
  };
  return { animatedRoute, viewTransitionsStatus };
}
