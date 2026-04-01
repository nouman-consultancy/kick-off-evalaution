"use client";

import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#C8622A" },
      secondary: { main: "#1E4DA8" },
      background: {
        default: mode === "light" ? "#F4F2EE" : "#0b0f14",
        paper: mode === "light" ? "#FFFFFF" : "#141a22",
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: "var(--font-instrument), Arial, sans-serif",
      h1: { fontFamily: "var(--font-syne), var(--font-instrument), Arial, sans-serif", fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.04em" },
      h2: { fontFamily: "var(--font-syne), var(--font-instrument), Arial, sans-serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" },
    },
  });
