'use client';

import Link from 'next/link';
import { Box, Card, CardContent, Container, Grid, Skeleton, Typography, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetResearchFeedQuery } from '@/appstore/api/researchFeedApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

// ── label badge colours mapped from sourceLabel ───────────────────────────────
const LABEL_STYLES: Record<string, { bg: string; color: string }> = {
  'REASONING':     { bg: '#eff6ff', color: '#2563eb' },
  'OPEN WEIGHTS':  { bg: '#f0fdf4', color: '#15803d' },
  'MULTIMODAL':    { bg: '#faf5ff', color: '#7c3aed' },
  'ALIGNMENT':     { bg: '#fff7ed', color: '#c2410c' },
  'EFFICIENCY':    { bg: '#f0fdf4', color: '#15803d' },
  'HOT':           { bg: '#fef2f2', color: '#dc2626' },
  'JUST RELEASED': { bg: '#f0fdf4', color: '#15803d' },
  'AGENT USE':     { bg: '#eef2ff', color: '#6366f1' },
  'REAL-TIME':     { bg: '#fff7ed', color: '#c2410c' },
  'OPEN SOURCE':   { bg: '#f0fdf4', color: '#15803d' },
  'CODING':        { bg: '#eef2ff', color: '#6366f1' },
};

function getLabelStyle(label?: string) {
  if (!label) return { bg: '#eef2ff', color: '#6366f1' };
  return LABEL_STYLES[label.toUpperCase()] ?? { bg: '#eef2ff', color: '#6366f1' };
}

// ── single trending card ──────────────────────────────────────────────────────

function TrendingCard({ paper }: { paper: ReturnType<typeof useGetResearchFeedQuery>['data'] extends { data: (infer T)[] } | undefined ? T : never }) {
  const labelStyle = getLabelStyle(paper.sourceLabel);

  return (
    <Card sx={{
      height: '100%', borderRadius: 3, border: '1px solid #e2e8f0',
      boxShadow: 'none', cursor: 'pointer',
      transition: 'box-shadow 0.2s, transform 0.2s',
      '&:hover': { boxShadow: '0 4px 20px rgba(15,23,42,0.10)', transform: 'translateY(-2px)' },
    }}>
      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* badge row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
          {paper.sourceLabel && (
            <Chip
              label={paper.sourceLabel}
              size="small"
              sx={{
                height: 20, fontSize: 10, fontWeight: 700, border: 'none',
                bgcolor: labelStyle.bg, color: labelStyle.color,
              }}
            />
          )}
          <Typography variant="caption" color="text.disabled" sx={{ fontSize: 11 }}>
            {paper.source}
          </Typography>
        </Box>

        {/* title */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.35, mb: 1 }}>
          {paper.title}
        </Typography>

        {/* overview — clamped to 3 lines */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {paper.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ── skeleton card ─────────────────────────────────────────────────────────────

function TrendingCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', p: 2.5 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Skeleton variant="rounded" width={72} height={20} />
        <Skeleton width={60} height={20} />
      </Box>
      <Skeleton width="90%" height={18} sx={{ mb: 0.5 }} />
      <Skeleton width="70%" height={18} sx={{ mb: 1 }} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="60%" height={14} />
    </Card>
  );
}

// ── section ───────────────────────────────────────────────────────────────────

export default function TrendingThisWeekSection() {
  const { data, isLoading, isFetching, isError } = useGetResearchFeedQuery({ limit: 6 });
  const papers = data?.data ?? [];

  return (
    <Box sx={{ bgcolor: '#fff', py: 8 }}>
      <Container maxWidth="xl">
        {/* header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ fontSize: 22 }}>🔥</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Trending This Week
            </Typography>
          </Box>
          <Link href="/discover" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5,
              color: 'primary.main', fontWeight: 600, fontSize: 14,
              '&:hover': { color: 'primary.dark' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
                View research feed
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Link>
        </Box>

        {/* grid */}
        {isError ? (
          <CommonErrorState
            title="Failed to load trending papers"
            description="Could not fetch research feed. Please try again later."
          />
        ) : isLoading || isFetching ? (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
                <TrendingCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : papers.length === 0 ? (
          <CommonNoDataState
            title="No trending papers"
            description="Check back later for the latest AI research."
          />
        ) : (
          <Grid container spacing={2}>
            {papers.map((paper) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={paper.id}>
                <TrendingCard paper={paper} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
