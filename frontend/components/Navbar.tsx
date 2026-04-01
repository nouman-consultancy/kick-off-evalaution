"use client";

import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  mode?: "light" | "dark";
  onToggleMode?: () => void;
};

export default function Navbar({ mode = "light", onToggleMode }: Props) {
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [lang, setLang] = useState<"EN" | "AR" | "FR" | "DE" | "ES" | "PT" | "ZH" | "JA" | "KO" | "HI" | "UR" | "TR" | "RU" | "IT" | "NL">("EN");

  const langOptions = useMemo(
    () => [
      { code: "EN", label: "🇺🇸 English" },
      { code: "AR", label: "🇸🇦 العربية" },
      { code: "FR", label: "🇫🇷 Français" },
      { code: "DE", label: "🇩🇪 Deutsch" },
      { code: "ES", label: "🇪🇸 Español" },
      { code: "PT", label: "🇧🇷 Português" },
      { code: "ZH", label: "🇨🇳 中文" },
      { code: "JA", label: "🇯🇵 日本語" },
      { code: "KO", label: "🇰🇷 한국어" },
      { code: "HI", label: "🇮🇳 हिन्दी" },
      { code: "UR", label: "🇵🇰 اردو" },
      { code: "TR", label: "🇹🇷 Türkçe" },
      { code: "RU", label: "🇷🇺 Русский" },
      { code: "IT", label: "🇮🇹 Italiano" },
      { code: "NL", label: "🇳🇱 Nederlands" },
    ] as const,
    [],
  );

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(244,242,238,0.92)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: 1.5,
                bgcolor: "primary.main",
                display: "grid",
                placeItems: "center",
                color: "common.white",
                fontFamily: "var(--font-syne)",
                fontWeight: 900,
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              ◇
            </Box>
            <Typography variant="h6" sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              NexusAI
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            <Button
              component={Link}
              href="/"
              variant="text"
              color="inherit"
              sx={{ color: "text.secondary", fontSize: 13, textTransform: "none" }}
            >
              Chat Hub
            </Button>
            <Button
              component={Link}
              href="/marketplace"
              variant="text"
              color="inherit"
              sx={{ color: "text.secondary", fontSize: 13, textTransform: "none" }}
            >
              Marketplace
            </Button>
            <Button
              component={Link}
              href="/discover-new"
              variant="text"
              color="inherit"
              sx={{ color: "text.secondary", fontSize: 13, textTransform: "none" }}
            >
              Discover New
            </Button>
            <Button
              component={Link}
              href="/agents"
              variant="text"
              color="inherit"
              sx={{ color: "text.secondary", fontSize: 13, textTransform: "none" }}
            >
              Agents
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={(e) => setLangAnchor(e.currentTarget)}
              sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}
              title="Change language"
            >
              🌐 {lang} ▾
            </Button>
            <Menu
              anchorEl={langAnchor}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
              PaperProps={{ sx: { borderRadius: 3, minWidth: 220 } }}
            >
              <Typography sx={{ px: 2, pt: 1.5, pb: 1, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                App Language
              </Typography>
              {langOptions.map((o) => (
                <MenuItem
                  key={o.code}
                  selected={o.code === lang}
                  onClick={() => {
                    setLang(o.code);
                    setLangAnchor(null);
                  }}
                  sx={{ fontSize: 13 }}
                >
                  {o.label}
                </MenuItem>
              ))}
            </Menu>

            <Button variant="outlined" sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}>
              Sign in
            </Button>
            <Button variant="contained" sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}>
              Get Started →
            </Button>

            <Button
              variant="text"
              color="inherit"
              onClick={onToggleMode}
              sx={{ minWidth: 36, borderRadius: 999, textTransform: "none" }}
              title="Toggle dark mode"
            >
              {mode === "light" ? "🌙" : "☀️"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
