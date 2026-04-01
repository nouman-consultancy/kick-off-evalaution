"use client";

import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { getTheme } from "@/theme/theme";
import Navbar from "@/components/Navbar";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar mode={mode} onToggleMode={() => setMode(mode === "light" ? "dark" : "light")} />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
