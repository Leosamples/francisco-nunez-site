"use client";

import { createContext, useContext, useState } from "react";

/** One chapter open at a time, even though the contents span two pages. */
const Ctx = createContext<{ open: number | null; setOpen: (i: number | null) => void }>({
  open: null,
  setOpen: () => {},
});

export function ChaptersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export const useChapters = () => useContext(Ctx);
