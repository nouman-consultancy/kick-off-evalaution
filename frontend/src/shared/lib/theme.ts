"use client";

import { createTheme, alpha } from "@mui/material/styles";

// ─── design tokens ────────────────────────────────────────────────────────────
// Primary: rich indigo-violet  Secondary: warm amber  Neutral: cool slate

const BRAND = {
  50:  "#f0f1ff",
  100: "#e2e4ff",
  200: "#c7cbff",
  300: "#a5abff",
  400: "#8187fc",
  500: "#6366f1",   // primary main
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
};

const theme = createTheme({
  // ── palette ────────────────────────────────────────────────────────────────
  palette: {
    primary: {
      main:        BRAND[500],
      light:       BRAND[400],
      dark:        BRAND[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main:        "#f59e0b",
      light:       "#fbbf24",
      dark:        "#d97706",
      contrastText: "#ffffff",
    },
    error:   { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    info:    { main: "#3b82f6" },
    success: { main: "#10b981" },
    background: {
      default: "#f8fafc",
      paper:   "#ffffff",
    },
    text: {
      primary:   "#0f172a",
      secondary: "#64748b",
      disabled:  "#94a3b8",
    },
    divider: "#e2e8f0",
  },

  // ── typography ─────────────────────────────────────────────────────────────
  // Inter is loaded in layout.tsx — MUI picks it up via CSS variable fallback
  typography: {
    fontFamily: '"Inter", "Inter var", system-ui, -apple-system, sans-serif',
    fontWeightLight:   300,
    fontWeightRegular: 400,
    fontWeightMedium:  500,
    fontWeightBold:    700,

    h1: { fontSize: "2.25rem",  fontWeight: 800, lineHeight: 1.2,  letterSpacing: "-0.03em" },
    h2: { fontSize: "1.875rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.025em" },
    h3: { fontSize: "1.5rem",   fontWeight: 700, lineHeight: 1.3,  letterSpacing: "-0.02em" },
    h4: { fontSize: "1.25rem",  fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.015em" },
    h5: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4,  letterSpacing: "-0.01em" },
    h6: { fontSize: "1rem",     fontWeight: 600, lineHeight: 1.5,  letterSpacing: "-0.005em" },

    subtitle1: { fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontSize: "0.875rem",  fontWeight: 600, lineHeight: 1.5 },

    body1: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.65 },
    body2: { fontSize: "0.875rem",  fontWeight: 400, lineHeight: 1.6  },

    caption:   { fontSize: "0.75rem",   fontWeight: 400, lineHeight: 1.5 },
    overline:  { fontSize: "0.6875rem", fontWeight: 600, lineHeight: 1.5, letterSpacing: "0.08em", textTransform: "uppercase" },
    button:    { fontSize: "0.875rem",  fontWeight: 600, lineHeight: 1.5, letterSpacing: "0.01em" },
  },

  // ── shape ──────────────────────────────────────────────────────────────────
  shape: { borderRadius: 10 },

  // ── shadows ────────────────────────────────────────────────────────────────
  shadows: [
    "none",
    "0 1px 2px rgba(15,23,42,0.06)",
    "0 1px 4px rgba(15,23,42,0.08)",
    "0 2px 8px rgba(15,23,42,0.08)",
    "0 4px 12px rgba(15,23,42,0.08)",
    "0 4px 16px rgba(15,23,42,0.10)",
    "0 8px 24px rgba(15,23,42,0.10)",
    "0 8px 32px rgba(15,23,42,0.12)",
    "0 12px 40px rgba(15,23,42,0.12)",
    "0 16px 48px rgba(15,23,42,0.14)",
    "0 20px 56px rgba(15,23,42,0.14)",
    "0 24px 64px rgba(15,23,42,0.16)",
    "0 28px 72px rgba(15,23,42,0.16)",
    "0 32px 80px rgba(15,23,42,0.18)",
    "0 36px 88px rgba(15,23,42,0.18)",
    "0 40px 96px rgba(15,23,42,0.20)",
    "0 44px 104px rgba(15,23,42,0.20)",
    "0 48px 112px rgba(15,23,42,0.22)",
    "0 52px 120px rgba(15,23,42,0.22)",
    "0 56px 128px rgba(15,23,42,0.24)",
    "0 60px 136px rgba(15,23,42,0.24)",
    "0 64px 144px rgba(15,23,42,0.26)",
    "0 68px 152px rgba(15,23,42,0.26)",
    "0 72px 160px rgba(15,23,42,0.28)",
    "0 76px 168px rgba(15,23,42,0.28)",
  ],

  // ── component overrides ────────────────────────────────────────────────────
  components: {
    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          letterSpacing: "0.01em",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        contained: {
          "&:hover": { boxShadow: "0 4px 12px rgba(99,102,241,0.35)" },
        },
        sizeSmall:  { fontSize: "0.8125rem", padding: "4px 12px" },
        sizeMedium: { fontSize: "0.875rem",  padding: "8px 18px" },
        sizeLarge:  { fontSize: "0.9375rem", padding: "10px 24px" },
      },
    },

    // Card
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 1px 4px rgba(15,23,42,0.07)",
          border: "1px solid #e2e8f0",
        },
      },
    },

    // Paper
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        rounded: { borderRadius: 14 },
        elevation1: { boxShadow: "0 1px 4px rgba(15,23,42,0.08)" },
        elevation2: { boxShadow: "0 2px 8px rgba(15,23,42,0.08)" },
        elevation3: { boxShadow: "0 4px 16px rgba(15,23,42,0.10)" },
      },
    },

    // TextField
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#94a3b8" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: BRAND[500], borderWidth: 1.5 },
        },
      },
    },

    // Chip
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: "0.8125rem",
        },
        sizeSmall: { height: 24, fontSize: "0.75rem" },
      },
    },

    // Divider
    MuiDivider: {
      styleOverrides: { root: { borderColor: "#e2e8f0" } },
    },

    // AppBar
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 0 #e2e8f0",
          backgroundImage: "none",
        },
      },
    },

    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          fontWeight: 500,
          borderRadius: 6,
          backgroundColor: "#0f172a",
          padding: "5px 10px",
        },
        arrow: { color: "#0f172a" },
      },
    },

    // IconButton
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "background 0.15s, color 0.15s",
        },
      },
    },

    // ListItemButton
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: alpha(BRAND[500], 0.08),
            "&:hover": { backgroundColor: alpha(BRAND[500], 0.12) },
          },
        },
      },
    },

    // Skeleton
    MuiSkeleton: {
      styleOverrides: {
        root: { borderRadius: 6, backgroundColor: "#f1f5f9" },
      },
    },

    // Slider
    MuiSlider: {
      styleOverrides: {
        root: { color: BRAND[500] },
        thumb: { width: 14, height: 14 },
        track: { height: 3 },
        rail:  { height: 3, backgroundColor: "#e2e8f0" },
      },
    },
  },
});

export default theme;
