'use client';

import Link from 'next/link';
import { Box, Card, CardContent, Container, Grid, Skeleton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetAllModelsQuery, ModelCard } from '@/appstore/api/modelsApi';
import CommonErrorState from '@/shared/components/CommonErrorState';

// ─── tier definitions ─────────────────────────────────────────────────────────

interface BudgetTier {
  key: string;
  emoji: string;
  label: string;
  sublabel: string;
  bg: string;
  labelColor: string;
  badgeBg: string;
  badgeColor: string;
  filter: (price: number | null) => boolean;
}

const TIERS: BudgetTier[] = [
  {
    key: 'free',
    emoji: '🆓',
    label: 'Free & Open Source',
    sublabel: 'self-host with zero API cost',
    bg: '#f0fdf4',
    labelColor: '#15803d',
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    filter: (p) => p === null || p === 0,
  },
  {
    key: 'budget',
    emoji: '💎',
    label: 'Budget — Under $0.50/1M',
    sublabel: 'best performance per dollar',
    bg: '#eff6ff',
    labelColor: '#2563eb',
    badgeBg: '#dbeafe',
    badgeColor: '#1d4ed8',
    filter: (p) => p !== null && p > 0 && p < 0.5,
  },
  {
    key: 'midrange',
    emoji: '⚖️',
    label: 'Mid-Range — $1–$5/1M',
    sublabel: '',
    bg: '#fffbeb',
    labelColor: '#d97706',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    filter: (p) => p !== null && p >= 1 && p <= 5,
  },
  {
    key: 'premium',
    emoji: '🏆',
    label: 'Premium — $5+/1M',
    sublabel: 'top-tier quality for demanding workloads',
    bg: '#fff1f2',
    labelColor: '#dc2626',
    badgeBg: '#fecaca',
    badgeColor: '#b91c1c',
    filter: (p) => p !== null && p > 5,
  },
];

// parse "$0.27/1M tk" → 0.27, null if free/unknown
function parsePrice(raw?: string): number | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (lower.includes('free') || lower === '$0' || lower === '0') return 0;
  const match = raw.match(/\$?([\d.]+)/);
  if (!match) return null;
  return parseFloat(match[1]);
}

// ─── single tier card ─────────────────────────────────────────────────────────

function TierCard({ tier, models }: { tier: BudgetTier; models: ModelCard[] }) {
  const displayNames = models.slice(0, 4).map((m) => m.name).join(', ');
  const extra = models.length > 4 ? ` and ${models.length - 4} more` : '';

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        border: 'none',
        boxShadow: 'none',
        bgcolor: tier.bg,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 24px rgba(15,23,42,0.10)' },
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* emoji badge */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 2,
            bgcolor: tier.badgeBg, fontSize: 18,
          }}>
            {tier.emoji}
          </Box>
        </Box>

        {/* label */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tier.labelColor, mb: 0.5, lineHeight: 1.3 }}>
          {tier.label}
        </Typography>

        {/* model names */}
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.55, mb: 1.5, flex: 1 }}>
          {models.length === 0
            ? 'No models in this tier yet.'
            : `${displayNames}${extra}${tier.sublabel ? ` — ${tier.sublabel}` : ''}.`}
        </Typography>

        {/* count link */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: tier.labelColor }}>
            {models.length} model{models.length !== 1 ? 's' : ''} available
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: 13, color: tier.labelColor }} />
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── skeleton ─────────────────────────────────────────────────────────────────

function TierCardSkeleton({ bg }: { bg: string }) {
  return (
    <Card sx={{ borderRadius: 3, border: 'none', boxShadow: 'none', bgcolor: bg, p: 3 }}>
      <Skeleton variant="rounded" width={36} height={36} sx={{ mb: 1.5, borderRadius: 2 }} />
      <Skeleton width="80%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="70%" height={14} sx={{ mb: 1.5 }} />
      <Skeleton width="50%" height={14} />
    </Card>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function FindModelsByBudgetSection() {
  const { data: allModels = [], isLoading, isError } = useGetAllModelsQuery();

  // bucket models into tiers
  const tieredModels = TIERS.map((tier) => ({
    tier,
    models: allModels
      .filter((m) => tier.filter(parsePrice(m.pricePerMToken)))
      // sort by rating desc within tier
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
  }));

  return (
    <Box sx={{ bgcolor: '#f8fafc', py: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Find Models by Budget
        </Typography>

        {isError ? (
          <CommonErrorState
            title="Failed to load models"
            description="Could not fetch model data. Please try again later."
          />
        ) : isLoading ? (
          <Grid container spacing={3}>
            {TIERS.map((t) => (
              <Grid item xs={12} sm={6} md={3} key={t.key}>
                <TierCardSkeleton bg={t.bg} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {tieredModels.map(({ tier, models }) => (
              <Grid item xs={12} sm={6} md={3} key={tier.key}>
                <Link href={`/marketplace?maxPrice=${tier.key === 'free' ? 0 : tier.key === 'budget' ? 0.5 : tier.key === 'midrange' ? 5 : 999}`}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <TierCard tier={tier} models={models} />
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
