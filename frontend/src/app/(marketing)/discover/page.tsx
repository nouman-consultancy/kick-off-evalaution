'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Box, Chip, Typography, Divider, Skeleton, useMediaQuery, useTheme,
  IconButton, Drawer, Button,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useGetResearchFeedQuery, ResearchPaper } from '@/appstore/api/researchFeedApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

const TAGS = ['All', 'Reasoning', 'Multimodal', 'Alignment', 'Efficiency', 'Open Weights'];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Reasoning:     { bg: '#eff6ff', color: '#2563eb' },
  Multimodal:    { bg: '#faf5ff', color: '#7c3aed' },
  Alignment:     { bg: '#fff7ed', color: '#c2410c' },
  Efficiency:    { bg: '#f0fdf4', color: '#15803d' },
  'Open Weights':{ bg: '#f0fdf4', color: '#15803d' },
};

// ─── date badge ───────────────────────────────────────────────────────────────
function DateBadge({ date }: { date: string }) {
  const d = new Date(date);
  const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  return (
    <Box sx={{ textAlign: 'center', minWidth: 36 }}>
      <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'text.disabled', lineHeight: 1 }}>{month}</Typography>
      <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>{day}</Typography>
    </Box>
  );
}

// ─── tag chip ─────────────────────────────────────────────────────────────────
function TagChip({ label }: { label: string }) {
  const style = TAG_COLORS[label] ?? { bg: '#eef2ff', color: '#6366f1' };
  return (
    <Chip label={label} size="small"
      sx={{ height: 20, fontSize: 10, fontWeight: 700, bgcolor: style.bg, color: style.color, border: 'none' }} />
  );
}

// ─── list item ────────────────────────────────────────────────────────────────
function PaperListItem({ paper, selected, onClick }: {
  paper: ResearchPaper; selected: boolean; onClick: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex', gap: 2, p: 2, cursor: 'pointer',
        bgcolor: selected ? '#f0f4ff' : 'transparent',
        borderLeft: selected ? '3px solid #6366f1' : '3px solid transparent',
        '&:hover': { bgcolor: '#f8fafc' },
        transition: 'background 0.15s',
      }}
    >
      <DateBadge date={paper.date} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {paper.source}
          </Typography>
          {paper.sourceLabel && <TagChip label={paper.sourceLabel} />}
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.5 }}>
          {paper.title}
        </Typography>
        <Typography variant="caption" color="text.secondary"
          sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {paper.overview}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── detail panel ─────────────────────────────────────────────────────────────
function PaperDetail({ paper, onBack }: { paper: ResearchPaper; onBack?: () => void }) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, md: 4 } }}>
      {onBack && (
        <IconButton onClick={onBack} size="small" sx={{ mb: 2 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      )}

      {/* source + date */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>{paper.source}</Typography>
        <Typography variant="caption" color="text.secondary">
          · {new Date(paper.date).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        {paper.sourceLabel && <TagChip label={paper.sourceLabel} />}
      </Box>

      {/* title */}
      <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 1 }}>
        {paper.title}
      </Typography>

      {/* arxiv + authors */}
      {(paper.arxivId || paper.authors) && (
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 2.5 }}>
          {paper.arxivId}{paper.arxivId && paper.authors ? '  ·  ' : ''}{paper.authors}
        </Typography>
      )}

      {/* overview */}
      <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
        OVERVIEW
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
        {paper.overview}
      </Typography>

      {/* stats */}
      {paper.stats && paper.stats.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {paper.stats.map((s) => (
            <Box key={s.label} sx={{ flex: 1, minWidth: 120, border: '1px solid #e2e8f0',
              borderRadius: 2, p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>{s.value}</Typography>
              <Typography variant="caption" color="text.secondary">{s.label}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* key findings */}
      {paper.keyFindings?.length > 0 && (
        <>
          <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
            KEY FINDINGS
          </Typography>
          <Box component="ol" sx={{ mt: 1, mb: 3, pl: 0, listStyle: 'none' }}>
            {paper.keyFindings.map((f, i) => (
              <Box key={i} component="li" sx={{ display: 'flex', gap: 1.5, mb: 1.5,
                bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2, p: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#6366f1', minWidth: 20 }}>
                  {i + 1}.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{f}</Typography>
              </Box>
            ))}
          </Box>
        </>
      )}

      {/* models referenced */}
      {paper.modelsReferenced?.length > 0 && (
        <>
          <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
            MODELS REFERENCED
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1, mb: 3 }}>
            {paper.modelsReferenced.map((m) => (
              <Chip key={m} label={m} size="small"
                sx={{ bgcolor: '#eef2ff', color: '#6366f1', border: 'none', fontWeight: 600 }} />
            ))}
          </Box>
        </>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* actions */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button variant="contained" startIcon={<ChatBubbleOutlineIcon />}
          component={Link} href="/chat-hub"
          sx={{ flex: 1, minWidth: 160, bgcolor: '#c0392b', '&:hover': { bgcolor: '#a93226' }, borderRadius: 2 }}>
          Discuss in Chat Hub
        </Button>
        <Button variant="outlined" startIcon={<BookmarkBorderIcon />}
          sx={{ borderRadius: 2 }}>
          Save
        </Button>
        <Button variant="outlined" startIcon={<ShareIcon />}
          sx={{ borderRadius: 2 }}>
          Share
        </Button>
      </Box>
    </Box>
  );
}

// ─── list skeleton ────────────────────────────────────────────────────────────
function ListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, p: 2 }}>
          <Box sx={{ minWidth: 36 }}>
            <Skeleton width={30} height={12} />
            <Skeleton width={30} height={28} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={14} sx={{ mb: 0.5 }} />
            <Skeleton width="90%" height={16} />
            <Skeleton width="70%" height={14} />
          </Box>
        </Box>
      ))}
    </>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────
export default function DiscoverPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeTag, setActiveTag] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const { data, isLoading, isError } = useGetResearchFeedQuery({ tag: activeTag });
  const papers = data?.data ?? [];
  const weekCount = data?.weekCount ?? 0;

  const selectedPaper = papers.find((p) => p.id === selectedId) ?? papers[0] ?? null;

  const handleSelect = (paper: ResearchPaper) => {
    setSelectedId(paper.id);
    if (isMobile) setMobileDetailOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* ── top bar ── */}
      <Box sx={{ borderBottom: '1px solid #e2e8f0', px: { xs: 2, md: 3 }, py: 1.5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, bgcolor: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>AI Research Feed</Typography>
          <Typography variant="caption" color="text.disabled">Curated breakthroughs · Updated daily</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {weekCount > 0 && (
            <Chip label={`+ ${weekCount} papers this week`} size="small"
              sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, fontSize: 12 }} />
          )}
          <Button size="small" startIcon={<NotificationsNoneIcon />}
            variant="outlined" sx={{ borderRadius: 3, fontSize: 12 }}>
            Subscribe
          </Button>
        </Box>
      </Box>

      {/* ── tag filter row ── */}
      <Box sx={{ borderBottom: '1px solid #e2e8f0', px: { xs: 2, md: 3 }, py: 1,
        display: 'flex', gap: 1, overflowX: 'auto', bgcolor: '#fff',
        '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { borderRadius: 2, bgcolor: '#ddd' } }}>
        {TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            onClick={() => { setActiveTag(tag); setSelectedId(null); }}
            sx={{
              cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
              bgcolor: activeTag === tag ? '#0f172a' : 'transparent',
              color: activeTag === tag ? '#fff' : 'text.secondary',
              border: activeTag === tag ? 'none' : '1px solid #e2e8f0',
              '&:hover': { bgcolor: activeTag === tag ? '#0f172a' : '#eef2ff' },
            }}
          />
        ))}
      </Box>

      {/* ── body ── */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* list panel */}
        <Box sx={{
          width: { xs: '100%', md: 320 }, flexShrink: 0,
          borderRight: '1px solid #e2e8f0', overflowY: 'auto', bgcolor: '#fff',
          display: isMobile && mobileDetailOpen ? 'none' : 'block',
        }}>
          {isError ? (
            <Box sx={{ p: 2 }}>
              <CommonErrorState title="Failed to load feed" description="Could not fetch research papers." />
            </Box>
          ) : isLoading ? (
            <ListSkeleton />
          ) : papers.length === 0 ? (
            <Box sx={{ p: 2 }}>
              <CommonNoDataState title="No papers found" description="Try a different tag or check back later." />
            </Box>
          ) : (
            papers.map((paper, idx) => (
              <Box key={paper.id}>
                <PaperListItem
                  paper={paper}
                  selected={selectedId ? paper.id === selectedId : idx === 0}
                  onClick={() => handleSelect(paper)}
                />
                {idx < papers.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </Box>

        {/* detail panel — desktop */}
        {!isMobile && (
          <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: '#f8fafc' }}>
            {isLoading ? (
              <Box sx={{ p: 4 }}>
                <Skeleton width="60%" height={32} sx={{ mb: 1 }} />
                <Skeleton width="40%" height={20} sx={{ mb: 3 }} />
                <Skeleton width="100%" height={120} />
              </Box>
            ) : selectedPaper ? (
              <PaperDetail paper={selectedPaper} />
            ) : null}
          </Box>
        )}

        {/* detail panel — mobile drawer */}
        {isMobile && (
          <Drawer anchor="right" open={mobileDetailOpen} onClose={() => setMobileDetailOpen(false)}
            PaperProps={{ sx: { width: '100%' } }}>
            {selectedPaper && (
              <PaperDetail paper={selectedPaper} onBack={() => setMobileDetailOpen(false)} />
            )}
          </Drawer>
        )}
      </Box>
    </Box>
  );
}
