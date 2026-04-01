"use client";

import { Box, Button, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

type TemplateTagTone = "blue" | "teal" | "amber" | "rose";

type Template = {
  icon: string;
  title: string;
  description: string;
  tags: { label: string; tone: TemplateTagTone }[];
};

const templates: Template[] = [
  {
    icon: "🔍",
    title: "Research Agent",
    description: "Automates web research, summarises findings, and generates structured reports on demand.",
    tags: [
      { label: "GPT-4o", tone: "blue" },
      { label: "Web search", tone: "teal" },
      { label: "Reports", tone: "amber" },
    ],
  },
  {
    icon: "💼",
    title: "Customer Support Agent",
    description: "Handles tickets, FAQs, and escalates complex issues with full conversation context.",
    tags: [
      { label: "GPT-4o", tone: "blue" },
      { label: "Ticketing", tone: "teal" },
      { label: "Escalation", tone: "rose" },
    ],
  },
  {
    icon: "💻",
    title: "Code Review Agent",
    description: "Reviews pull requests, flags bugs, suggests improvements, and explains changes inline.",
    tags: [
      { label: "Claude 3.7", tone: "teal" },
      { label: "GitHub", tone: "blue" },
      { label: "Code", tone: "amber" },
    ],
  },
  {
    icon: "📊",
    title: "Data Analysis Agent",
    description: "Processes spreadsheets, generates insights, creates visualisations, and answers data questions.",
    tags: [
      { label: "Gemini", tone: "amber" },
      { label: "Spreadsheets", tone: "blue" },
      { label: "Charts", tone: "teal" },
    ],
  },
  {
    icon: "✍️",
    title: "Content Writer Agent",
    description: "Creates blog posts, social content, and marketing copy with consistent brand voice.",
    tags: [
      { label: "Claude 3.7", tone: "teal" },
      { label: "Marketing", tone: "rose" },
      { label: "SEO", tone: "blue" },
    ],
  },
];

function chipSx(tone: TemplateTagTone) {
  const base = {
    borderRadius: 999,
    height: 24,
    "& .MuiChip-label": { px: 1.1, fontSize: 12, fontWeight: 700 },
  } as const;

  if (tone === "teal") return { ...base, bgcolor: "rgba(20,184,166,0.12)", color: "rgba(13,148,136,1)", borderColor: "rgba(20,184,166,0.25)" };
  if (tone === "amber") return { ...base, bgcolor: "rgba(245,158,11,0.14)", color: "rgba(180,83,9,1)", borderColor: "rgba(245,158,11,0.28)" };
  if (tone === "rose") return { ...base, bgcolor: "rgba(244,63,94,0.12)", color: "rgba(190,18,60,1)", borderColor: "rgba(244,63,94,0.25)" };
  return { ...base, bgcolor: "rgba(30,77,168,0.10)", color: "rgba(30,77,168,1)", borderColor: "rgba(30,77,168,0.24)" };
}

export default function AgentsPage() {
  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "flex-start" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "var(--font-syne)",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                mb: 0.75,
              }}
            >
              Agent Builder
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: "text.secondary" }}>
              Create powerful AI agents using any model. Pick a template or start from scratch.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/marketplace"
            variant="contained"
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 800 }}
          >
            + New Agent
          </Button>
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            borderColor: "rgba(200,98,42,0.35)",
            bgcolor: "background.paper",
            p: 2,
            mb: 3,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ fontSize: 22, lineHeight: 1 }} aria-hidden="true">
              ✦
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: "text.primary", mb: 0.25 }}>
                Not sure where to start?
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Chat with our AI guide — describe what you want your agent to do and get a personalised setup plan.
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/"
              variant="text"
              sx={{ ml: "auto", borderRadius: 999, textTransform: "none", fontSize: 13, whiteSpace: "nowrap" }}
            >
              Ask the Hub →
            </Button>
          </Stack>
        </Paper>

        <Typography
          sx={{
            fontFamily: "var(--font-syne)",
            fontSize: 13,
            fontWeight: 900,
            mb: 2,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Agent Templates
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
          {templates.map((t) => (
            <Paper
              key={t.title}
              variant="outlined"
              sx={{
                borderRadius: 3,
                bgcolor: "background.paper",
                p: 3,
                cursor: "pointer",
                transition: "180ms",
                "&:hover": {
                  boxShadow: "0 14px 34px rgba(0,0,0,0.10)",
                  borderColor: "rgba(200,98,42,0.35)",
                },
              }}
            >
              <Box sx={{ fontSize: 22, mb: 1.5 }} aria-hidden="true">
                {t.icon}
              </Box>
              <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 15, mb: 0.75 }}>
                {t.title}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.6, mb: 2 }}>
                {t.description}
              </Typography>
              <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                {t.tags.map((tag) => (
                  <Chip key={`${t.title}-${tag.label}`} label={tag.label} variant="outlined" sx={chipSx(tag.tone)} />
                ))}
              </Stack>
              <Typography sx={{ fontSize: 12.5, color: "primary.main", fontWeight: 700 }}>
                Use template →
              </Typography>
            </Paper>
          ))}

          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              p: 3,
              bgcolor: "rgba(200,98,42,0.08)",
              borderStyle: "dashed",
              borderWidth: 1.5,
              borderColor: "rgba(200,98,42,0.35)",
              cursor: "pointer",
              minHeight: 180,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              transition: "180ms",
              "&:hover": { bgcolor: "rgba(200,98,42,0.10)" },
            }}
          >
            <Box sx={{ fontSize: 32, mb: 1 }} aria-hidden="true">
              +
            </Box>
            <Typography sx={{ fontSize: 14, fontWeight: 800, color: "primary.main" }}>
              Build from Scratch
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.75, lineHeight: 1.5, maxWidth: 320 }}>
              Start with any model and a blank canvas — full control over every detail.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

