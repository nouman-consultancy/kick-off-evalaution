"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const quickActions = [
  { icon: "🎨", label: "Create image", prompt: "Create an image for me" },
  { icon: "🎵", label: "Generate audio", prompt: "Generate audio for me" },
  { icon: "🎬", label: "Create video", prompt: "Create a video for me" },
  { icon: "📊", label: "Create slides", prompt: "Create a presentation for me" },
  { icon: "✍️", label: "Write content", prompt: "Help me write content" },
  { icon: "💻", label: "Code generation", prompt: "Help me generate and debug code" },
  { icon: "📄", label: "Document analysis", prompt: "Analyze a document for me" },
  { icon: "🔭", label: "Just exploring", prompt: "I am just exploring what AI can do" },
];

export default function LandingHero() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const open = focused || value.length > 0;

  const stats = useMemo(
    () => [
      { strong: "525+", label: "AI Models" },
      { strong: "82K", label: "Builders" },
      { strong: "28", label: "AI Labs" },
      { strong: "4.8★", label: "Avg Rating" },
    ],
    [],
  );

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        pt: { xs: 7, md: 10 },
        pb: { xs: 6, md: 8 },
        textAlign: "center",
        position: "relative",
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Chip
          label="347 models live · Updated daily"
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            fontSize: 12,
          }}
        />

        <Typography variant="h1" sx={{ maxWidth: 900 }}>
          Find your perfect <Box component="span" sx={{ color: "primary.main" }}>AI model</Box>
          <br />
          with guided discovery
        </Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
          You don&apos;t need to know anything about AI to get started. Click the box below — we&apos;ll do the rest together.
        </Typography>

        <Box sx={{ width: "100%", maxWidth: 720, mt: 2 }}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              borderWidth: 1.5,
              borderColor: open ? "primary.main" : "divider",
              boxShadow: open ? "0 0 0 4px rgba(200,98,42,0.10)" : "none",
              transition: "border-color 180ms ease, box-shadow 180ms ease",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1.5 }}>
              <TextField
                fullWidth
                placeholder="Click here and type anything — or just say hi!"
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                InputProps={{ disableUnderline: true }}
              />
              <Button variant="contained" sx={{ borderRadius: 999, px: 2.5 }}>
                Let&apos;s go
              </Button>
            </Stack>

            <Collapse in={open} timeout={250}>
              <Box sx={{ borderTop: 1, borderColor: "divider", p: 2 }}>
                <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 700, mb: 0.5 }}>
                  Welcome! You&apos;re in the right place.
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  Answer a few quick questions and we&apos;ll recommend the best models and prompts for your goal.
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Button size="small" variant="contained" sx={{ borderRadius: 999 }}>
                    ✨ Let&apos;s get started
                  </Button>
                  <Button size="small" variant="text" sx={{ borderRadius: 999 }}>
                    Skip — search directly
                  </Button>
                </Stack>
              </Box>
            </Collapse>
          </Paper>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 920, mt: 2 }}>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
            {quickActions.map((a) => (
              <Chip
                key={a.label}
                label={`${a.icon} ${a.label}`}
                onClick={() => setValue(a.prompt)}
                variant="outlined"
                sx={{ bgcolor: "background.paper" }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 760, mt: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            {stats.map((s) => (
              <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                  <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 20 }}>
                    {s.strong}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                    {s.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

