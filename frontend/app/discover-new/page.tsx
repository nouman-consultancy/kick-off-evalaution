"use client";

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import AttachFileRounded from "@mui/icons-material/AttachFileRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";
import SendRounded from "@mui/icons-material/SendRounded";

type Model = {
  id: string;
  name: string;
  org: string;
  icon: string;
  iconBg: string;
  live?: boolean;
  desc: string;
  ctx: string;
  price: string;
  rating: string;
};

const modelsSeed: Model[] = [
  {
    id: "gpt54",
    name: "GPT-5.4",
    org: "OpenAI",
    icon: "🧠",
    iconBg: "rgba(30,77,168,0.08)",
    live: true,
    desc: "Flagship reasoning + multimodal. Great for guided discovery and fast prototyping.",
    ctx: "1.05M",
    price: "$2.50",
    rating: "4.8⭐",
  },
  {
    id: "claude-sonnet46",
    name: "Claude Sonnet 4.6",
    org: "Anthropic",
    icon: "⚡",
    iconBg: "rgba(20,184,166,0.10)",
    live: true,
    desc: "Fast, high-quality writing + coding. Strong for business workflows and content.",
    ctx: "200K",
    price: "$3.00",
    rating: "4.8⭐",
  },
  {
    id: "gemini31-pro",
    name: "Gemini 3.1 Pro",
    org: "Google DeepMind",
    icon: "🔬",
    iconBg: "rgba(245,158,11,0.14)",
    live: true,
    desc: "Deep research, long-context analysis, and strong multimodal understanding.",
    ctx: "1M",
    price: "$2.00",
    rating: "4.7⭐",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek-R1",
    org: "DeepSeek",
    icon: "🧩",
    iconBg: "rgba(180,83,9,0.12)",
    live: true,
    desc: "Reasoning-oriented model for math, logic, and structured problem solving.",
    ctx: "128K",
    price: "$0.90",
    rating: "4.6⭐",
  },
];

const discoveryTiles = [
  { icon: "✍️", label: "Write content", sub: "Emails, posts, stories" },
  { icon: "🎨", label: "Create images", sub: "Art, photos, designs" },
  { icon: "🛠️", label: "Build something", sub: "Apps, tools, websites" },
  { icon: "⚡", label: "Automate work", sub: "Save hours every week" },
  { icon: "📊", label: "Analyse data", sub: "PDFs, sheets, reports" },
  { icon: "🔍", label: "Just exploring", sub: "Show me what's possible" },
] as const;

export default function DiscoverNewPage() {
  const [modelQuery, setModelQuery] = useState("");
  const [activeModelId, setActiveModelId] = useState(modelsSeed[0]?.id ?? "");
  const [input, setInput] = useState("");

  const active = useMemo(() => modelsSeed.find((m) => m.id === activeModelId) ?? modelsSeed[0], [activeModelId]);

  const filteredModels = useMemo(() => {
    const q = modelQuery.trim().toLowerCase();
    if (!q) return modelsSeed;
    return modelsSeed.filter((m) => `${m.name} ${m.org}`.toLowerCase().includes(q));
  }, [modelQuery]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ pt: 2.5, pb: 3 }}>
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.25 }}>
            <Stack direction="row" alignItems="center" spacing={1.25}>
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
              <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                NexusAI
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
              <Button component={Link} href="/" variant="text" sx={{ textTransform: "none", borderRadius: 999 }}>
                💬 Chat Hub
              </Button>
              <Button component={Link} href="/marketplace" variant="text" sx={{ textTransform: "none", borderRadius: 999 }}>
                🛍 Marketplace
              </Button>
              <Button component={Link} href="/agents" variant="text" sx={{ textTransform: "none", borderRadius: 999 }}>
                🤖 Agents
              </Button>
              <Button variant="contained" sx={{ textTransform: "none", borderRadius: 999, fontWeight: 900 }}>
                🔬 Discover New
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button variant="outlined" sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}>
                Sign in
              </Button>
              <Button variant="contained" sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}>
                Try free →
              </Button>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 2, py: 1.1 }}>
            <Chip
              size="small"
              label={
                <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
                  <Box component="span" aria-hidden="true">
                    ✦
                  </Box>
                  Guided discovery
                </Box>
              }
              sx={{ borderRadius: 999, fontWeight: 800 }}
            />
            <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
              No tech background needed. Tell us what you want to achieve — we’ll recommend models and next steps.
            </Typography>
          </Stack>
        </Paper>

        <Box sx={{ display: "flex", gap: 2, minHeight: 0 }}>
          {/* Left sidebar */}
          <Paper
            variant="outlined"
            sx={{
              width: 280,
              flexShrink: 0,
              borderRadius: 3,
              bgcolor: "background.paper",
              p: 2,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              minHeight: "calc(100vh - 64px - 140px)",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 900,
                color: "text.secondary",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Models
            </Typography>

            <TextField
              size="small"
              value={modelQuery}
              onChange={(e) => setModelQuery(e.target.value)}
              placeholder="Search models…"
              sx={{
                mb: 1.25,
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "background.default" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
              <Stack spacing={0.75}>
                {filteredModels.map((m) => {
                  const selected = m.id === activeModelId;
                  return (
                    <Paper
                      key={m.id}
                      variant="outlined"
                      onClick={() => setActiveModelId(m.id)}
                      sx={{
                        borderRadius: 3,
                        p: 1.1,
                        cursor: "pointer",
                        borderColor: selected ? "rgba(200,98,42,0.55)" : "divider",
                        bgcolor: selected ? "rgba(200,98,42,0.06)" : "transparent",
                        transition: "180ms",
                        "&:hover": { borderColor: "rgba(200,98,42,0.55)" },
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 2,
                            bgcolor: m.iconBg,
                            display: "grid",
                            placeItems: "center",
                            fontSize: 18,
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          {m.icon}
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography sx={{ fontWeight: 900, fontSize: 13.5, lineHeight: 1.1 }} noWrap>
                            {m.name}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: "text.secondary", display: "flex", alignItems: "center", gap: 0.75 }} noWrap>
                            <Box
                              component="span"
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: 999,
                                bgcolor: m.live ? "rgba(20,184,166,1)" : "rgba(148,163,184,1)",
                                boxShadow: m.live ? "0 0 0 3px rgba(20,184,166,0.14)" : "none",
                                flexShrink: 0,
                              }}
                              aria-hidden="true"
                            />
                            {m.org}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Paper
              variant="outlined"
              sx={{
                borderRadius: 3,
                bgcolor: "rgba(200,98,42,0.10)",
                borderColor: "rgba(200,98,42,0.25)",
                p: 1.25,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 900, color: "primary.main", mb: 0.25 }}>
                + Create Agent
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.45 }}>
                Build a custom AI agent with any model.
              </Typography>
            </Paper>
          </Paper>

          {/* Center */}
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 0,
              borderRadius: 3,
              bgcolor: "background.paper",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 64px - 140px)",
            }}
          >
            <Box sx={{ p: { xs: 2, md: 2.5 }, overflowY: "auto", flex: 1 }}>
              <Paper
                variant="outlined"
                sx={{
                  borderRadius: 4,
                  p: { xs: 2, md: 2.5 },
                  maxWidth: 720,
                  mx: "auto",
                  textAlign: "center",
                  bgcolor: "background.default",
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    bgcolor: "rgba(200,98,42,0.14)",
                    display: "grid",
                    placeItems: "center",
                    mx: "auto",
                    mb: 1.25,
                    fontFamily: "var(--font-syne)",
                    fontWeight: 900,
                    color: "primary.main",
                  }}
                  aria-hidden="true"
                >
                  ✦
                </Box>
                <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em", mb: 0.75 }}>
                  Welcome! I&apos;m here to help you 👋
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.65, mb: 2 }}>
                  No tech background needed. Tell me what you&apos;d like to <strong>achieve</strong> — I&apos;ll help you discover what&apos;s possible, step by step.
                </Typography>

                <Paper variant="outlined" sx={{ borderRadius: 3, p: 1.5, bgcolor: "background.paper", mb: 1.25 }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "primary.main",
                      mb: 1.25,
                    }}
                  >
                    ✨ What would you like to do today?
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
                      gap: 1,
                    }}
                  >
                    {discoveryTiles.map((t) => (
                      <Paper
                        key={t.label}
                        variant="outlined"
                        onClick={() => setInput(t.sub)}
                        sx={{
                          borderRadius: 3,
                          p: 1.1,
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "180ms",
                          "&:hover": { borderColor: "rgba(200,98,42,0.45)", boxShadow: "0 10px 20px rgba(0,0,0,0.06)" },
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                          <Box sx={{ fontSize: 18, lineHeight: 1, mt: 0.1 }} aria-hidden="true">
                            {t.icon}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 900 }} noWrap>
                              {t.label}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "text.secondary" }} noWrap>
                              {t.sub}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Box>
                </Paper>

                <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                  Or type anything below — there are no wrong answers ↓
                </Typography>
              </Paper>
            </Box>

            <Divider />

            {/* Input area */}
            <Box sx={{ p: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <TextField
                  fullWidth
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your project, ask a question, or just say hi — I’m here to help…"
                  multiline
                  minRows={1}
                  maxRows={5}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: "background.default" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" title="Voice conversation">
                          <MicRounded fontSize="small" />
                        </IconButton>
                        <IconButton size="small" title="Attach file">
                          <AttachFileRounded fontSize="small" />
                        </IconButton>
                        <IconButton size="small" title="Upload image">
                          <ImageRounded fontSize="small" />
                        </IconButton>
                        <Chip
                          size="small"
                          label={active ? active.name : "Choose model"}
                          variant="outlined"
                          sx={{ ml: 0.75, borderRadius: 999, fontWeight: 800 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  onClick={() => setInput("")}
                  sx={{ borderRadius: 3, minWidth: 44, height: 44, px: 0 }}
                  title="Send"
                >
                  <SendRounded fontSize="small" />
                </Button>
              </Stack>
            </Box>
          </Paper>

          {/* Right panel */}
          <Paper
            variant="outlined"
            sx={{
              width: 320,
              flexShrink: 0,
              borderRadius: 3,
              bgcolor: "background.paper",
              p: 2,
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              minHeight: "calc(100vh - 64px - 140px)",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 900,
                color: "text.secondary",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Active model
            </Typography>

            <Paper variant="outlined" sx={{ borderRadius: 3, p: 1.5, bgcolor: "background.default", mb: 2 }}>
              <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    bgcolor: active?.iconBg ?? "rgba(200,98,42,0.10)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 19,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {active?.icon ?? "🧠"}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: 14 }} noWrap>
                    {active?.name ?? "Select a model"}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: "text.secondary" }} noWrap>
                    by {active?.org ?? "—"}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={active?.live ? "Live" : "—"}
                  sx={{
                    borderRadius: 999,
                    fontWeight: 900,
                    bgcolor: active?.live ? "rgba(20,184,166,0.12)" : "rgba(148,163,184,0.16)",
                  }}
                />
              </Stack>

              <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.55, mb: 1.25 }}>
                {active?.desc ?? "Pick a model to see details."}
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
                <Paper variant="outlined" sx={{ borderRadius: 3, p: 1, textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 900, fontSize: 12.5 }}>{active?.ctx ?? "—"}</Typography>
                  <Typography sx={{ fontSize: 11, color: "text.secondary" }}>Context</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ borderRadius: 3, p: 1, textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 900, fontSize: 12.5 }}>{active?.price ?? "—"}</Typography>
                  <Typography sx={{ fontSize: 11, color: "text.secondary" }}>/1M tk</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ borderRadius: 3, p: 1, textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 900, fontSize: 12.5 }}>{active?.rating ?? "—"}</Typography>
                  <Typography sx={{ fontSize: 11, color: "text.secondary" }}>Rating</Typography>
                </Paper>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mt: 1.25 }}>
                <Button variant="outlined" fullWidth sx={{ borderRadius: 999, textTransform: "none", fontWeight: 800 }}>
                  Details
                </Button>
                <Button variant="contained" fullWidth sx={{ borderRadius: 999, textTransform: "none", fontWeight: 800 }}>
                  Pricing
                </Button>
              </Stack>
            </Paper>

            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 900,
                color: "text.secondary",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Quick actions
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              {[
                { icon: "🛍", label: "Browse Marketplace", href: "/marketplace" },
                { icon: "🤖", label: "Build an Agent", href: "/agents" },
                { icon: "📐", label: "Prompt tips", href: "/discover-new" },
                { icon: "📊", label: "Model analysis", href: "/marketplace" },
              ].map((a) => (
                <Button
                  key={a.label}
                  component={Link}
                  href={a.href}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    justifyContent: "flex-start",
                    gap: 1,
                    fontSize: 12.5,
                    fontWeight: 800,
                    py: 1,
                  }}
                >
                  <Box component="span" aria-hidden="true">
                    {a.icon}
                  </Box>
                  {a.label}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Paper
              variant="outlined"
              sx={{
                borderRadius: 3,
                bgcolor: "rgba(200,98,42,0.08)",
                borderColor: "rgba(200,98,42,0.25)",
                p: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 12.5, fontWeight: 900, mb: 0.25 }}>
                ✦ Tip
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.55 }}>
                Start with what you want to <strong>do</strong>, not which model to pick. We&apos;ll handle the matching.
              </Typography>
            </Paper>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

