'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Chip, Card, CardContent, Grid,
  IconButton, Skeleton, useMediaQuery, useTheme, Drawer,
} from '@mui/material';import AddIcon from '@mui/icons-material/Add';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  useGetAgentTemplatesQuery,
  useGetAgentSuggestionsQuery,
  useGetAgentTasksQuery,
  AgentTemplate,
} from '@/appstore/api/agentsApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';
import ChatInputBar from '@/shared/components/ChatInputBar';

// ─── constants ────────────────────────────────────────────────────────────────

const SUGGESTION_CATEGORIES = [
  'Use cases', 'Build a business', 'Help me learn',
  'Monitor the situation', 'Research', 'Create content', 'Analyze & research',
];

// ─── agent template card ──────────────────────────────────────────────────────

function TemplateCard({ template }: { template: AgentTemplate }) {
  return (
    <Card sx={{
      borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none',
      height: '100%', cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.10)' },
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: 2, bgcolor: '#eef2ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
          }}>
            {template.iconEmoji ?? '🤖'}
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{template.name}</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
          {template.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {template.models.map((m) => (
            <Chip key={m} label={m} size="small"
              sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: '#eef2ff', color: '#6366f1', border: 'none' }} />
          ))}
          {template.tools.map((t) => (
            <Chip key={t} label={t} size="small"
              sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: '#fffbeb', color: '#d97706', border: 'none' }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── build from scratch card ──────────────────────────────────────────────────

function BuildFromScratchCard() {
  return (
    <Card sx={{
      borderRadius: 3, border: '2px dashed #e2e8f0', boxShadow: 'none',
      height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'border-color 0.2s',
      '&:hover': { borderColor: '#6366f1' },
    }}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <AddIcon sx={{ fontSize: 28, color: 'text.disabled', mb: 0.5 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6366f1' }}>
          Build from Scratch
        </Typography>
      </CardContent>
    </Card>
  );
}

// ─── left sidebar ─────────────────────────────────────────────────────────────

function LeftSidebar() {
  const router = useRouter();
  const { data: tasksData, isLoading } = useGetAgentTasksQuery();
  const tasks = tasksData?.data ?? [];

  return (
    <Box sx={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Agent Builder header */}
      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartToyIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Agent Builder</Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
          Create powerful AI agents using any model. Pick a template or start from scratch.
        </Typography>
        <Button fullWidth variant="contained" size="small" startIcon={<AddIcon />}
          onClick={() => router.push('/agent-library')}
          sx={{ bgcolor: '#6366f1', borderRadius: 2, fontWeight: 700, '&:hover': { bgcolor: '#4f46e5' } }}>
          + New Agent
        </Button>
      </Box>

      {/* Help */}
      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <AddIcon sx={{ fontSize: 14, color: '#6366f1' }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#6366f1' }}>Not sure where to start?</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
          Chat with our AI guide — describe what you want your agent to do and get a personalised setup plan.
        </Typography>
        <Button fullWidth variant="outlined" size="small"
          onClick={() => router.push('/chat-hub')}
          sx={{ borderRadius: 2, fontSize: 12, borderColor: '#e2e8f0', color: 'text.secondary' }}>
          Ask the Hub →
        </Button>
      </Box>

      {/* Tasks */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <AddIcon sx={{ fontSize: 14, color: '#6366f1' }} />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>New Task</Typography>
        </Box>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={28} sx={{ mb: 0.5 }} />)
          : tasks.map((task) => (
              <Box key={task.id} sx={{
                display: 'flex', alignItems: 'center', gap: 1, py: 0.8, px: 1,
                borderRadius: 2, cursor: 'pointer',
                '&:hover': { bgcolor: '#f0f4ff' },
              }}>
                <CheckBoxOutlineBlankIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
                <Typography variant="caption" color="text.secondary"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {task.title}
                </Typography>
              </Box>
            ))
        }
      </Box>
    </Box>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeCategory, setActiveCategory] = useState('Analyze & research');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // suggestions filtered by active category
  const { data: suggestionsData, isLoading: suggestionsLoading, isError: suggestionsError } =
    useGetAgentSuggestionsQuery({ category: activeCategory });
  const suggestions = suggestionsData?.data ?? [];
  // show 4 suggestions, shuffle by slicing differently
  const visibleSuggestions = suggestions.slice(shuffleSeed % Math.max(1, suggestions.length - 3), (shuffleSeed % Math.max(1, suggestions.length - 3)) + 4);

  // templates
  const { data: templatesData, isLoading: templatesLoading, isError: templatesError } =
    useGetAgentTemplatesQuery({});
  const templates = templatesData?.data ?? [];

  const handleShuffle = () => setShuffleSeed((s) => s + 1);

  const sidebar = <LeftSidebar />;

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* mobile top bar */}
      {isMobile && (
        <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 2, py: 1,
          display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Agent Builder</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* ── desktop sidebar ── */}
        {!isMobile && (
          <Box sx={{
            width: 240, flexShrink: 0, borderRight: '1px solid #e2e8f0',
            bgcolor: '#fff', p: 2, overflowY: 'auto',
          }}>
            {sidebar}
          </Box>
        )}

        {/* ── mobile sidebar drawer ── */}
        <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}
          PaperProps={{ sx: { width: 260, p: 2 } }}>
          {sidebar}
        </Drawer>

        {/* ── main content ── */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 6 }, py: { xs: 3, md: 5 } }}>
          {/* hero text */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              Agent works{' '}
              <Box component="span" sx={{ color: '#6366f1' }}>for you.</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your AI agent takes care of everything, end to end.
            </Typography>
          </Box>

          {/* chat input */}
          <Box sx={{ maxWidth: 760, mx: 'auto', mb: 3 }}>
            <ChatInputBar
              placeholder="Describe what you want your agent to do..."
              topLabel="What should we work on next?"
              topBadge="Video"
              sendLabel="Agent"
              accentColor="#6366f1"
              elevation={0}
              maxWidth={760}
              onSend={({ text, audio }) => console.log('Agent prompt:', text, audio)}
            />
          </Box>

          {/* category filter chips */}
          <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
            {SUGGESTION_CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                size="small"
                onClick={() => setActiveCategory(cat)}
                sx={{
                  cursor: 'pointer', fontWeight: 600, fontSize: 12,
                  bgcolor: activeCategory === cat ? '#0f172a' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'text.secondary',
                  border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                  '&:hover': { bgcolor: activeCategory === cat ? '#0f172a' : '#eef2ff' },
                }}
              />
            ))}
          </Box>

          {/* suggestions list */}
          <Box sx={{ maxWidth: 760, mx: 'auto', mb: 1 }}>
            {suggestionsLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} height={44} sx={{ mb: 1, borderRadius: 2 }} />
                ))
              : suggestionsError
              ? <CommonErrorState title="Failed to load suggestions" description="Could not fetch suggestions." />
              : visibleSuggestions.length === 0
              ? <CommonNoDataState title="No suggestions" description="Try a different category." />
              : visibleSuggestions.map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.2,
                      mb: 0.8, borderRadius: 2, bgcolor: '#fff', border: '1px solid #e2e8f0',
                      cursor: 'pointer', transition: 'box-shadow 0.15s',
                      '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
                    }}
                  >
                    <Typography sx={{ fontSize: 18, lineHeight: 1 }}>{s.iconEmoji ?? '💡'}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{s.text}</Typography>
                  </Box>
                ))
            }
          </Box>

          {/* view all + shuffle */}
          <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="caption" sx={{ color: '#6366f1', cursor: 'pointer', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 0.3 }}>
              View all suggestions <ArrowForwardIcon sx={{ fontSize: 13 }} />
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
              onClick={handleShuffle}>
              <ShuffleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Shuffle</Typography>
            </Box>
          </Box>

          {/* agent templates */}
          <Box sx={{ maxWidth: 760, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.8 }}>
                AGENT TEMPLATES
              </Typography>
              {!templatesLoading && (
                <Chip label={templates.length} size="small"
                  sx={{ height: 18, fontSize: 11, bgcolor: '#eef2ff', color: '#6366f1', border: 'none' }} />
              )}
            </Box>

            {templatesLoading ? (
              <Grid container spacing={2}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton variant="rounded" height={130} sx={{ borderRadius: 3 }} />
                  </Grid>
                ))}
              </Grid>
            ) : templatesError ? (
              <CommonErrorState title="Failed to load templates" description="Could not fetch agent templates." />
            ) : templates.length === 0 ? (
              <CommonNoDataState title="No templates" description="No agent templates available yet." />
            ) : (
              <Grid container spacing={2}>
                {templates.map((t) => (
                  <Grid item xs={12} sm={6} md={4} key={t.id}>
                    <TemplateCard template={t} />
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4}>
                  <BuildFromScratchCard />
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
