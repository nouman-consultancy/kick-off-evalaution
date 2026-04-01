"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const rows = [
  { model: "GPT-5.4", lab: "OpenAI", context: "1.05M", inPrice: "$2.50", outPrice: "$15", mm: "✅", speed: "🟢 Fast", best: "High-precision professional tasks" },
  { model: "Claude Opus 4.6", lab: "Anthropic", context: "200K/1M β", inPrice: "$5", outPrice: "$25", mm: "✅", speed: "🟠 Moderate", best: "Agents, advanced coding" },
  { model: "Claude Sonnet 4.6", lab: "Anthropic", context: "200K/1M β", inPrice: "$3", outPrice: "$15", mm: "✅", speed: "🟢 Fast", best: "Code, data, content at scale" },
  { model: "Gemini 3.1 Pro", lab: "Google", context: "2M–5M", inPrice: "$2", outPrice: "$12", mm: "✅", speed: "🟠 Moderate", best: "Deep reasoning, long context" },
];

export default function ComparisonSection() {
  return (
    <Box component="section" id="compare" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h2">Flagship Model Comparison</Typography>
        <Button variant="text">Compare all →</Button>
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 720 }}>
        Side-by-side view of the leading models across major labs. Input/Output prices per 1M tokens.
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
        <Table size="small" sx={{ minWidth: 760 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Model</TableCell>
              <TableCell sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Lab</TableCell>
              <TableCell align="center" sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Context</TableCell>
              <TableCell align="center" sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Input $/1M</TableCell>
              <TableCell align="center" sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Output $/1M</TableCell>
              <TableCell align="center" sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Multimodal</TableCell>
              <TableCell align="center" sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Speed</TableCell>
              <TableCell sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "text.secondary" }}>Best For</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.model} hover>
                <TableCell sx={{ fontWeight: 700 }}>{r.model}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{r.lab}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: "secondary.main" }}>{r.context}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800, color: "success.main" }}>{r.inPrice}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800, color: "success.main" }}>{r.outPrice}</TableCell>
                <TableCell align="center">{r.mm}</TableCell>
                <TableCell align="center">{r.speed}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{r.best}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography color="text.secondary" sx={{ mt: 1, fontSize: 12 }}>
        Prices shown are approximate. Beta pricing may change.
      </Typography>
    </Box>
  );
}

