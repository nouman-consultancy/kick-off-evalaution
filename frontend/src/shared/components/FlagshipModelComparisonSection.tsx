'use client';

import Link from 'next/link';
import {
  Box, Container, Typography, Skeleton,
  useMediaQuery, useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetComparisonModelsQuery, ComparisonModel } from '@/appstore/api/modelsApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

// ─── speed badge ──────────────────────────────────────────────────────────────

const SPEED_STYLES: Record<string, { dot: string; label: string }> = {
  Fast:     { dot: '#22c55e', label: 'Fast' },
  Fastest:  { dot: '#f59e0b', label: 'Fastest' },
  Moderate: { dot: '#f97316', label: 'Moderate' },
  Slow:     { dot: '#94a3b8', label: 'Slow' },
};

function SpeedBadge({ speed }: { speed?: string }) {
  const s = speed ? SPEED_STYLES[speed] ?? { dot: '#94a3b8', label: speed } : { dot: '#94a3b8', label: '—' };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: s.dot, flexShrink: 0 }} />
      <Typography variant="caption" sx={{ fontSize: 12, color: 'text.secondary' }}>{s.label}</Typography>
    </Box>
  );
}

// ─── context badge ────────────────────────────────────────────────────────────

function ContextBadge({ value }: { value?: string }) {
  if (!value) return <Typography variant="caption" color="text.disabled">—</Typography>;
  return (
    <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600, fontSize: 12 }}>
      {value}
    </Typography>
  );
}

// ─── price cell ───────────────────────────────────────────────────────────────

function PriceCell({ value }: { value?: string }) {
  if (!value) return <Typography variant="caption" color="text.disabled">—</Typography>;
  const isFree = value.toLowerCase() === 'free';
  return (
    <Typography variant="caption" sx={{
      fontWeight: 600, fontSize: 12,
      color: isFree ? '#15803d' : '#0f172a',
    }}>
      {value}
    </Typography>
  );
}

// ─── table row ────────────────────────────────────────────────────────────────

const COL_WIDTHS = {
  model:     220,
  lab:       120,
  context:   110,
  input:     100,
  output:    100,
  multimodal:100,
  speed:     110,
  bestFor:   'auto' as const,
};

function HeaderCell({ children, width }: { children: React.ReactNode; width?: number | 'auto' }) {
  return (
    <Box sx={{
      width, flexShrink: width === 'auto' ? 1 : 0, flexGrow: width === 'auto' ? 1 : 0,
      px: 1.5, py: 1.2,
    }}>
      <Typography variant="caption" sx={{
        fontWeight: 700, fontSize: 11, color: 'text.disabled',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {children}
      </Typography>
    </Box>
  );
}

function DataCell({ children, width, align = 'left' }: {
  children: React.ReactNode; width?: number | 'auto'; align?: 'left' | 'center';
}) {
  return (
    <Box sx={{
      width, flexShrink: width === 'auto' ? 1 : 0, flexGrow: width === 'auto' ? 1 : 0,
      px: 1.5, py: 1.4, display: 'flex', alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
    }}>
      {children}
    </Box>
  );
}

function TableRow({ model, index }: { model: ComparisonModel; index: number }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center',
      bgcolor: index % 2 === 0 ? '#fff' : '#fafafa',
      borderBottom: '1px solid #f1f5f9',
      '&:hover': { bgcolor: '#f0f4ff' },
      transition: 'background 0.15s',
      minWidth: 800,
    }}>
      {/* model */}
      <DataCell width={COL_WIDTHS.model}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {model.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={model.iconUrl} alt={model.name} width={22} height={22}
              style={{ borderRadius: 4, objectFit: 'contain', flexShrink: 0 }} />
          ) : (
            <Box sx={{ width: 22, height: 22, borderRadius: 1, bgcolor: '#eef2ff', flexShrink: 0 }} />
          )}
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>{model.name}</Typography>
        </Box>
      </DataCell>

      {/* lab */}
      <DataCell width={COL_WIDTHS.lab}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>{model.provider}</Typography>
      </DataCell>

      {/* context */}
      <DataCell width={COL_WIDTHS.context}>
        <ContextBadge value={model.contextInput} />
      </DataCell>

      {/* input $/1M */}
      <DataCell width={COL_WIDTHS.input}>
        <PriceCell value={model.inputPrice} />
      </DataCell>

      {/* output $/1M */}
      <DataCell width={COL_WIDTHS.output}>
        <PriceCell value={model.outputPrice} />
      </DataCell>

      {/* multimodal */}
      <DataCell width={COL_WIDTHS.multimodal} align="center">
        {model.multimodal
          ? <CheckIcon sx={{ fontSize: 16, color: '#22c55e' }} />
          : <CloseIcon sx={{ fontSize: 16, color: '#ef4444' }} />
        }
      </DataCell>

      {/* speed */}
      <DataCell width={COL_WIDTHS.speed}>
        <SpeedBadge speed={model.speed} />
      </DataCell>

      {/* best for */}
      <DataCell width={COL_WIDTHS.bestFor}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
          {model.bestFor ?? '—'}
        </Typography>
      </DataCell>
    </Box>
  );
}

// ─── skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 1.4,
      borderBottom: '1px solid #f1f5f9', gap: 2, minWidth: 800 }}>
      <Skeleton variant="rounded" width={22} height={22} sx={{ flexShrink: 0 }} />
      <Skeleton width={100} height={14} />
      <Skeleton width={60} height={14} sx={{ ml: 'auto' }} />
      <Skeleton width={50} height={14} />
      <Skeleton width={50} height={14} />
      <Skeleton variant="circular" width={16} height={16} />
      <Skeleton width={60} height={14} />
      <Skeleton width={120} height={14} />
    </Box>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function FlagshipModelComparisonSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: models = [], isLoading, isFetching, isError } = useGetComparisonModelsQuery();

  return (
    <Box sx={{ bgcolor: '#fff', py: 8 }}>
      <Container maxWidth="xl">
        {/* header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Flagship Model Comparison
          </Typography>
          <Link href="/marketplace" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main',
              '&:hover': { color: 'primary.dark' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit', whiteSpace: 'nowrap' }}>
                Compare all
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Link>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Side-by-side view of the leading models across all major labs. Input/Output prices per 1M tokens.
        </Typography>

        {/* table */}
        <Box sx={{
          border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden',
          overflowX: 'auto',
        }}>
          {/* header row */}
          <Box sx={{
            display: 'flex', alignItems: 'center',
            bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0',
            minWidth: 800,
          }}>
            <HeaderCell width={COL_WIDTHS.model}>Model</HeaderCell>
            <HeaderCell width={COL_WIDTHS.lab}>Lab</HeaderCell>
            <HeaderCell width={COL_WIDTHS.context}>Context</HeaderCell>
            <HeaderCell width={COL_WIDTHS.input}>Input $/1M</HeaderCell>
            <HeaderCell width={COL_WIDTHS.output}>Output $/1M</HeaderCell>
            <HeaderCell width={COL_WIDTHS.multimodal}>Multimodal</HeaderCell>
            <HeaderCell width={COL_WIDTHS.speed}>Speed</HeaderCell>
            <HeaderCell width={COL_WIDTHS.bestFor}>Best For</HeaderCell>
          </Box>

          {/* body */}
          {isError ? (
            <Box sx={{ p: 3 }}>
              <CommonErrorState title="Failed to load comparison" description="Could not fetch model data." />
            </Box>
          ) : isLoading || isFetching ? (
            Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
          ) : models.length === 0 ? (
            <Box sx={{ p: 3 }}>
              <CommonNoDataState title="No models available" description="Comparison data will appear here." />
            </Box>
          ) : (
            models.map((model, i) => <TableRow key={model.name} model={model} index={i} />)
          )}
        </Box>
      </Container>
    </Box>
  );
}
