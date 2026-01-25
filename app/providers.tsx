"use client";

import { ReactNode } from "react";
import TanstackQueryProvider from "./tanstack";

export function Providers({ children }: { children: ReactNode }) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
