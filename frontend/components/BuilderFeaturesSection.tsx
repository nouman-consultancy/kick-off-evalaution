"use client";

import { Box, Card, CardActionArea, CardContent, Grid, Stack, Typography } from "@mui/material";

const features = [
  {
    icon: "🧭",
    title: "Guided Discovery Chat",
    desc: "A genuine conversation before recommending models. No overwhelming lists.",
  },
  {
    icon: "📐",
    title: "Prompt Engineering Guide",
    desc: "Tailored prompt templates, principles, and examples for each model.",
  },
  {
    icon: "🤖",
    title: "Agent Builder",
    desc: "Step-by-step agent creation guides: system prompts, tools, memory, deployment.",
  },
  {
    icon: "💰",
    title: "Flexible Pricing",
    desc: "Free tiers, pay-per-use, subscriptions, and enterprise plans—transparent pricing.",
  },
  {
    icon: "⭐",
    title: "User Reviews & Ratings",
    desc: "Verified reviews, benchmark scores, and I/O specs to choose confidently.",
  },
  {
    icon: "🔬",
    title: "Research Feed",
    desc: "Daily curated releases and breakthroughs from top labs—stay ahead.",
  },
];

export default function BuilderFeaturesSection() {
  return (
    <Box component="section" id="builders" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Built for every builder
      </Typography>
      <Grid container spacing={2}>
        {features.map((f) => (
          <Grid key={f.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 3,
                transition: "box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease",
                "&:hover": {
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07),0 4px 16px rgba(0,0,0,0.04)",
                  borderColor: "rgba(200,98,42,0.25)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Box sx={{ fontSize: 26 }}>{f.icon}</Box>
                    <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 800 }}>
                      {f.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 13, lineHeight: 1.6 }}>
                      {f.desc}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

