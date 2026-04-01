"use client";

import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

type Model = {
  name: string;
  org: string;
  badge?: "Hot" | "New";
  desc: string;
  tags: string[];
  rating: string;
  price: string;
  icon: string;
};

const models: Model[] = [
  {
    name: "GPT-5",
    org: "OpenAI",
    badge: "Hot",
    desc: "OpenAI flagship. Native computer-use agents, advanced reasoning, 2M context.",
    tags: ["Flagship", "Agents", "Multimodal"],
    rating: "4.9 (4,210)",
    price: "$7.50/1M tk",
    icon: "🧠",
  },
  {
    name: "GPT-5.2",
    org: "OpenAI",
    badge: "New",
    desc: "Mid-tier GPT-5 variant with improved instruction-following and multimodal support.",
    tags: ["Multimodal", "Balanced", "Instruction"],
    rating: "4.8 (2,180)",
    price: "$4/1M tk",
    icon: "🧠",
  },
  {
    name: "Claude Sonnet 4.6",
    org: "Anthropic",
    desc: "Fast, high-quality model for coding, data, and content at scale.",
    tags: ["Code", "Data", "Scale"],
    rating: "4.8 (3,560)",
    price: "$3/1M tk",
    icon: "⚡",
  },
  {
    name: "Gemini 3.1 Pro",
    org: "Google",
    desc: "Deep reasoning and long-context analysis across massive inputs.",
    tags: ["Long context", "Research", "Reasoning"],
    rating: "4.7 (1,980)",
    price: "$2/1M tk",
    icon: "🔬",
  },
];

export default function FeaturedModelsSection() {
  return (
    <Box component="section" id="featured" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h2">Featured Models</Typography>
        <Button component={Link} href="/marketplace" variant="text">
          Browse all 525 →
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {models.map((m) => (
          <Grid key={m.name} size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: "rgba(30,77,168,0.08)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 20,
                      }}
                    >
                      {m.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 800 }}>
                        {m.name}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                        {m.org}
                      </Typography>
                    </Box>
                  </Stack>
                  {m.badge && (
                    <Chip
                      label={m.badge}
                      size="small"
                      sx={{
                        bgcolor: m.badge === "Hot" ? "rgba(200,98,42,0.12)" : "rgba(20,184,166,0.12)",
                        color: "text.primary",
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Stack>

                <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                  {m.desc}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
                  {m.tags.map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" />
                  ))}
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
                <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                  ★★★★ {m.rating}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{m.price}</Typography>
                  <Button size="small" variant="contained" sx={{ borderRadius: 999 }}>
                    Try →
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

