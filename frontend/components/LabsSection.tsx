"use client";

import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

const labs = [
  { icon: "🧠", name: "OpenAI", meta: "3 models · GPT-5.4, Sora 2" },
  { icon: "⚡", name: "Anthropic", meta: "3 models · Opus, Sonnet, Haiku" },
  { icon: "🔬", name: "Google DeepMind", meta: "5 models · Gemini 3.1, Veo 3" },
  { icon: "𝕏", name: "xAI (Grok)", meta: "2 models · Grok-4-1, Grok-Imagine" },
  { icon: "💻", name: "DeepSeek", meta: "3 models · V3, V3.2, R1" },
  { icon: "🦙", name: "Meta (Llama)", meta: "2 models · Maverick, Scout" },
  { icon: "🀄", name: "Alibaba (Qwen)", meta: "2 models · Qwen3-Max, Coder" },
  { icon: "🌀", name: "Mistral", meta: "2 models · Devstral 2, Medium 3.1" },
];

export default function LabsSection() {
  return (
    <Box component="section" id="labs" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h2">Browse by AI Lab</Typography>
        <Button variant="text">See all labs →</Button>
      </Stack>
      <Grid container spacing={1.5}>
        {labs.map((lab) => (
          <Grid key={lab.name} size={{ xs: 6, sm: 4, md: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "background.default",
                transition: "all 180ms ease",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "background.paper",
                  borderColor: "rgba(200,98,42,0.25)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07),0 4px 16px rgba(0,0,0,0.04)",
                },
              }}
            >
              <Box sx={{ fontSize: 26, mb: 0.5 }}>{lab.icon}</Box>
              <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 14 }}>
                {lab.name}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 11.5 }}>
                {lab.meta}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

