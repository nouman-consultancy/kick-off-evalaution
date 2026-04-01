"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import AttachFileRounded from "@mui/icons-material/AttachFileRounded";
import { useMemo, useState } from "react";

type ModelType = "language" | "vision" | "code" | "image" | "audio" | "open";
type Provider = "OpenAI" | "Anthropic" | "Google" | "Meta" | "DeepSeek" | "Mistral" | "Cohere";
type PricingModel = "Pay-per-use" | "Subscription" | "Free tier" | "Enterprise";
type License = "Commercial" | "Open source" | "Research only";

type Model = {
  id: string;
  name: string;
  org: Provider;
  lab: string;
  badge?: "Hot" | "New";
  desc: string;
  tags: string[];
  types: ModelType[];
  rating: number; // 0..5
  reviews: number;
  pricePer1M: number; // USD
  pricingModel: PricingModel;
  license: License;
  icon: string;
  iconBg?: string;
};

const allTypes: { id: "all" | ModelType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "language", label: "Language" },
  { id: "vision", label: "Vision" },
  { id: "code", label: "Code" },
  { id: "image", label: "Image Gen" },
  { id: "audio", label: "Audio" },
  { id: "open", label: "Open Source" },
];

const modelsSeed: Model[] = [
  {
    id: "gpt5",
    name: "GPT-5",
    org: "OpenAI",
    lab: "OpenAI",
    badge: "Hot",
    desc: "OpenAI flagship. Native computer-use agents, advanced reasoning, 2M context.",
    tags: ["Flagship", "Agents", "Multimodal", "Reasoning"],
    types: ["language", "vision", "code"],
    rating: 4.9,
    reviews: 4210,
    pricePer1M: 7.5,
    pricingModel: "Pay-per-use",
    license: "Commercial",
    icon: "🧠",
    iconBg: "rgba(30,77,168,0.08)",
  },
  {
    id: "gpt52",
    name: "GPT-5.2",
    org: "OpenAI",
    lab: "OpenAI",
    badge: "New",
    desc: "Improved instruction-following with multimodal support for everyday building.",
    tags: ["Balanced", "Instruction", "Multimodal"],
    types: ["language", "vision", "code"],
    rating: 4.8,
    reviews: 2180,
    pricePer1M: 4,
    pricingModel: "Pay-per-use",
    license: "Commercial",
    icon: "🧠",
    iconBg: "rgba(30,77,168,0.08)",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.6",
    org: "Anthropic",
    lab: "Anthropic",
    desc: "Fast, high-quality model for coding, data, and content at scale.",
    tags: ["Code", "Data", "Scale"],
    types: ["language", "code"],
    rating: 4.8,
    reviews: 3560,
    pricePer1M: 3,
    pricingModel: "Pay-per-use",
    license: "Commercial",
    icon: "⚡",
    iconBg: "rgba(20,184,166,0.10)",
  },
  {
    id: "gemini-pro",
    name: "Gemini 3.1 Pro",
    org: "Google",
    lab: "Google DeepMind",
    desc: "Deep reasoning and long-context analysis across massive inputs.",
    tags: ["Long context", "Research", "Reasoning"],
    types: ["language", "vision"],
    rating: 4.7,
    reviews: 1980,
    pricePer1M: 2,
    pricingModel: "Subscription",
    license: "Commercial",
    icon: "🔬",
    iconBg: "rgba(30,77,168,0.06)",
  },
  {
    id: "llama",
    name: "Llama 4 Instruct",
    org: "Meta",
    lab: "Meta",
    badge: "New",
    desc: "Open-weight instruction model tuned for safety, tool use, and efficiency.",
    tags: ["Open weights", "Instruction", "Tools"],
    types: ["language", "open"],
    rating: 4.6,
    reviews: 1240,
    pricePer1M: 0.8,
    pricingModel: "Free tier",
    license: "Open source",
    icon: "🦙",
    iconBg: "rgba(200,98,42,0.10)",
  },
  {
    id: "deepseek",
    name: "DeepSeek Coder",
    org: "DeepSeek",
    lab: "DeepSeek",
    desc: "Code-specialized model with strong refactoring and debugging skills.",
    tags: ["Code", "Refactor", "Debug"],
    types: ["code", "open"],
    rating: 4.7,
    reviews: 890,
    pricePer1M: 0.5,
    pricingModel: "Pay-per-use",
    license: "Research only",
    icon: "💻",
    iconBg: "rgba(30,77,168,0.06)",
  },
  {
    id: "mistral",
    name: "Mistral Large",
    org: "Mistral",
    lab: "Mistral AI",
    desc: "Strong general model with excellent latency and multilingual performance.",
    tags: ["Multilingual", "Low latency", "General"],
    types: ["language"],
    rating: 4.6,
    reviews: 1120,
    pricePer1M: 1.2,
    pricingModel: "Pay-per-use",
    license: "Commercial",
    icon: "🌀",
    iconBg: "rgba(20,184,166,0.10)",
  },
  {
    id: "cohere",
    name: "Command R+",
    org: "Cohere",
    lab: "Cohere",
    desc: "RAG-optimized model for enterprise search, citations, and grounded answers.",
    tags: ["RAG", "Enterprise", "Search"],
    types: ["language"],
    rating: 4.5,
    reviews: 640,
    pricePer1M: 2.5,
    pricingModel: "Enterprise",
    license: "Commercial",
    icon: "🔵",
    iconBg: "rgba(30,77,168,0.06)",
  },
];

function formatPrice(p: number) {
  return `$${p.toFixed(p < 10 && p % 1 !== 0 ? 2 : 2)}/1M tk`;
}

function formatRating(r: number) {
  const full = Math.floor(r);
  return "★★★★★".slice(0, full).padEnd(5, "☆");
}

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ModelType>("all");
  const [lab, setLab] = useState<string>("all");
  const [providers, setProviders] = useState<Record<Provider, boolean>>({
    OpenAI: true,
    Anthropic: true,
    Google: true,
    Meta: true,
    Mistral: true,
    DeepSeek: true,
    Cohere: false,
  });
  const [pricingModels, setPricingModels] = useState<Record<PricingModel, boolean>>({
    "Pay-per-use": true,
    Subscription: true,
    "Free tier": false,
    Enterprise: false,
  });
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState<0 | 4 | 4.5>(0);
  const [licenses, setLicenses] = useState<Record<License, boolean>>({
    Commercial: true,
    "Open source": true,
    "Research only": false,
  });

  const labs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of modelsSeed) counts.set(m.lab, (counts.get(m.lab) ?? 0) + 1);
    const labNames = Array.from(counts.keys()).sort((a, b) => a.localeCompare(b));
    return [
      { id: "all", label: "All Labs", icon: "🌐", count: modelsSeed.length },
      ...labNames.map((name) => ({
        id: name,
        label: name,
        icon:
          name === "OpenAI"
            ? "🧠"
            : name === "Anthropic"
              ? "👑"
              : name.toLowerCase().includes("google")
                ? "🔬"
                : name === "Meta"
                  ? "🦙"
                  : name === "DeepSeek"
                    ? "💻"
                    : name.toLowerCase().includes("mistral")
                      ? "🌀"
                      : "🏛",
        count: counts.get(name) ?? 0,
      })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return modelsSeed.filter((m) => {
      if (typeFilter !== "all" && !m.types.includes(typeFilter)) return false;
      if (lab !== "all" && m.lab !== lab) return false;
      if (!providers[m.org]) return false;
      if (!pricingModels[m.pricingModel]) return false;
      if (!licenses[m.license]) return false;
      if (m.pricePer1M > maxPrice) return false;
      if (minRating !== 0 && m.rating < minRating) return false;
      if (!q) return true;

      const hay = `${m.name} ${m.org} ${m.lab} ${m.desc} ${m.tags.join(" ")} ${m.types.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, typeFilter, lab, providers, pricingModels, licenses, maxPrice, minRating]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ pt: 3, pb: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Paper
          variant="outlined"
          sx={{
            bgcolor: "background.paper",
            borderRadius: 3,
            mb: 1.5,
            p: { xs: 2, md: 2.5 },
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }}>
            <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
              Model Marketplace
            </Typography>

            <Box sx={{ flex: 1, maxWidth: 560 }}>
              <TextField
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, capabilities…"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 999,
                    bgcolor: "background.default",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" title="Voice search" onClick={() => {}}>
                        <MicRounded fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="Upload file" onClick={() => {}}>
                        <AttachFileRounded fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="Upload image" onClick={() => {}}>
                        <ImageRounded fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <ToggleButtonGroup
              exclusive
              value={typeFilter}
              onChange={(_, v) => v && setTypeFilter(v)}
              sx={{
                flexWrap: "wrap",
                "& .MuiToggleButton-root": {
                  textTransform: "none",
                  fontSize: 12.5,
                  borderRadius: 999,
                  px: 1.5,
                  py: 0.5,
                },
              }}
            >
              {allTypes.map((t) => (
                <ToggleButton key={t.id} value={t.id}>
                  {t.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            p: 1.25,
            mb: 1.25,
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: 0 },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 720 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: "text.secondary", whiteSpace: "nowrap", px: 0.75 }}>
              🏛 AI Labs
            </Typography>
            <Divider orientation="vertical" flexItem />
            {labs.map((l) => (
              <Chip
                key={l.id}
                label={
                  <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
                    <Box component="span" aria-hidden="true">
                      {l.icon}
                    </Box>
                    <Box component="span">{l.label}</Box>
                    <Box component="span" sx={{ fontSize: 11, opacity: 0.75, fontWeight: 700 }}>
                      ({l.count})
                    </Box>
                  </Box>
                }
                clickable
                onClick={() => setLab(l.id)}
                variant={lab === l.id ? "filled" : "outlined"}
                color={lab === l.id ? "primary" : "default"}
                sx={{
                  borderRadius: 999,
                  fontSize: 12,
                  "& .MuiChip-label": { px: 1.25, py: 0.5 },
                }}
              />
            ))}
          </Stack>
        </Paper>

        {lab !== "all" && (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(200,98,42,0.08)",
              borderColor: "rgba(200,98,42,0.25)",
              p: 1.25,
              mb: 1.5,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ fontSize: 13 }}>
                  <Box component="span" sx={{ mr: 0.5 }} aria-hidden="true">
                    🏛
                  </Box>
                  Showing models from <Box component="span" sx={{ fontWeight: 800 }}>{lab}</Box>
                </Typography>
              </Stack>
              <Button
                size="small"
                variant="text"
                startIcon={<CloseRounded fontSize="small" />}
                onClick={() => setLab("all")}
                sx={{ textTransform: "none", borderRadius: 999 }}
              >
                Clear filter
              </Button>
            </Stack>
          </Paper>
        )}

        <Box sx={{ display: "flex", gap: 2, flex: 1, minHeight: 0 }}>
          <Paper
            variant="outlined"
            sx={{
              width: 260,
              flexShrink: 0,
              borderRadius: 3,
              bgcolor: "background.paper",
              p: 2,
              overflowY: "auto",
              display: { xs: "none", md: "block" },
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 3,
                bgcolor: "rgba(200,98,42,0.10)",
                borderColor: "rgba(200,98,42,0.25)",
                p: 1.25,
                mb: 2,
                cursor: "pointer",
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 900, color: "primary.main", mb: 0.25 }}>
                ✦ Need help choosing?
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: "text.secondary", lineHeight: 1.45 }}>
                Chat with our AI guide for a personalised recommendation in 60 seconds.
              </Typography>
            </Paper>

            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>
              Provider
            </Typography>
            {Object.entries(providers).map(([k, v]) => (
              <FormControlLabel
                key={k}
                control={
                  <Checkbox
                    size="small"
                    checked={v}
                    onChange={(e) => setProviders((p) => ({ ...p, [k]: e.target.checked }))}
                  />
                }
                label={<Typography sx={{ fontSize: 13, color: "text.secondary" }}>{k}</Typography>}
                sx={{ my: -0.25 }}
              />
            ))}

            <Divider sx={{ my: 1.75 }} />

            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>
              Pricing Model
            </Typography>
            {Object.entries(pricingModels).map(([k, v]) => (
              <FormControlLabel
                key={k}
                control={
                  <Checkbox
                    size="small"
                    checked={v}
                    onChange={(e) => setPricingModels((p) => ({ ...p, [k]: e.target.checked }))}
                  />
                }
                label={<Typography sx={{ fontSize: 13, color: "text.secondary" }}>{k}</Typography>}
                sx={{ my: -0.25 }}
              />
            ))}

            <Divider sx={{ my: 1.75 }} />

            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>
              Max Price /1M tokens
            </Typography>
            <Slider value={maxPrice} min={0} max={100} onChange={(_, v) => setMaxPrice(v as number)} />
            <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: -0.5 }}>
              Up to ${maxPrice}
            </Typography>

            <Divider sx={{ my: 1.75 }} />

            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>
              Min Rating
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={minRating}
              onChange={(_, v) => v !== null && setMinRating(v)}
              sx={{
                flexWrap: "wrap",
                "& .MuiToggleButton-root": {
                  textTransform: "none",
                  fontSize: 12,
                  borderRadius: 999,
                  px: 1.25,
                  py: 0.4,
                },
              }}
            >
              <ToggleButton value={0}>Any</ToggleButton>
              <ToggleButton value={4}>4+ ⭐</ToggleButton>
              <ToggleButton value={4.5}>4.5+ ⭐</ToggleButton>
            </ToggleButtonGroup>

            <Divider sx={{ my: 1.75 }} />

            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>
              Licence
            </Typography>
            {Object.entries(licenses).map(([k, v]) => (
              <FormControlLabel
                key={k}
                control={<Checkbox size="small" checked={v} onChange={(e) => setLicenses((p) => ({ ...p, [k]: e.target.checked }))} />}
                label={<Typography sx={{ fontSize: 13, color: "text.secondary" }}>{k}</Typography>}
                sx={{ my: -0.25 }}
              />
            ))}

            <Divider sx={{ my: 1.75 }} />

            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>
              Quick Guides
            </Typography>
            <Stack spacing={1}>
              <Button variant="outlined" sx={{ justifyContent: "flex-start", borderRadius: 2, textTransform: "none", fontSize: 12.5 }}>
                📐 Prompt engineering tips
              </Button>
              <Button variant="outlined" sx={{ justifyContent: "flex-start", borderRadius: 2, textTransform: "none", fontSize: 12.5 }}>
                🤖 Agent creation guide
              </Button>
              <Button variant="outlined" sx={{ justifyContent: "flex-start", borderRadius: 2, textTransform: "none", fontSize: 12.5 }}>
                💰 Pricing comparison
              </Button>
            </Stack>
          </Paper>

          <Box sx={{ flex: 1, minWidth: 0, overflowY: "auto", pr: { xs: 0, md: 0.5 } }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: 2,
                alignContent: "start",
              }}
            >
              {filtered.map((m) => (
                <Card key={m.id} variant="outlined" sx={{ borderRadius: 3, height: "100%", transition: "180ms", "&:hover": { boxShadow: "0 10px 24px rgba(0,0,0,0.10)", borderColor: "rgba(200,98,42,0.35)" } }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: m.iconBg ?? "rgba(200,98,42,0.10)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 20,
                          }}
                        >
                          {m.icon}
                        </Box>
                        <Box>
                          <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 900, lineHeight: 1.1 }}>
                            {m.name}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{m.org}</Typography>
                        </Box>
                      </Stack>

                      {m.badge && (
                        <Chip
                          size="small"
                          label={m.badge}
                          sx={{
                            bgcolor: m.badge === "Hot" ? "rgba(200,98,42,0.14)" : "rgba(20,184,166,0.14)",
                            fontWeight: 900,
                          }}
                        />
                      )}
                    </Stack>

                    <Typography sx={{ mt: 1.25, color: "text.secondary" }}>{m.desc}</Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
                      {m.tags.slice(0, 5).map((t) => (
                        <Chip key={t} label={t} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                      <Box component="span" sx={{ letterSpacing: "0.06em" }}>
                        {formatRating(m.rating)}
                      </Box>{" "}
                      {m.rating.toFixed(1)} ({m.reviews.toLocaleString()})
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontWeight: 900, fontSize: 12.5 }}>{formatPrice(m.pricePer1M)}</Typography>
                      <Button size="small" variant="contained" sx={{ borderRadius: 999, textTransform: "none" }}>
                        Try →
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              ))}
            </Box>

            {filtered.length === 0 && (
              <Paper variant="outlined" sx={{ mt: 2, p: 2, borderRadius: 3, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "var(--font-syne)", fontWeight: 900 }}>No models found</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Try adjusting filters or searching different keywords.
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

