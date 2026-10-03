"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";

// Honors the OS "reduce motion" setting for every motion component on the site.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  // read by the ?diag overlay: proves the app hydrated on this device
  useEffect(() => {
    (window as Window & { __fnHydrated?: boolean }).__fnHydrated = true;
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
