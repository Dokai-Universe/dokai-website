"use client";

import { createQueryClient } from "@lib/react-query/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import ThemeProvider from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
