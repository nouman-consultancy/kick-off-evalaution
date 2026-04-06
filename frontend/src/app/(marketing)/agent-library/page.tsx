'use client';

import { useState } from 'react';
import {
  Box, Typography, Button, Chip, Card, CardContent, Grid,
  IconButton, Skeleton, useMediaQuery, useTheme, Drawer, Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleIcon from '@mui/icons-material/Circle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  useGetAgentTemplatesQuery,
  useGetAgentTasksQuery,
  useGetMyAgentsQuery,
  useGetLibraryAgentsQuery,
  AgentTemplate,
  LibraryAgent,
  MyAgent,
} from '@/appstore/api/agentsApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

// ─── library agent card ───────────────────────────────────────────────────────

function LibraryAgentCard({ agent }: { agent: LibraryAgent }) {
  return (
    <Card sx={{
      borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none',
      height: '100%', cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 4px 16px rgba(15,23,42,0.10)' },
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: 2, bgcolor: '#eef2ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
          }}>
            {agent.iconEmoji ?? '🤖'}
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {agent.name}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', lineHeight: 1.5, mb: 1.5,
        }}>
          {agent.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {agent.models.map((m) => (
            <Chip key={m} label={m} size="small"
              sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: '#eef2ff', color: '#6366f1', border: 'none' }} />
          ))}
          {agent.tools.map((t) => (
            <Chip key={t} label={t} size="small"
              sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── build from scratch card ──────────────────────────────────────────────────

function BuildFromScratchCard({ small = false }: { small?: boolean }) {
  return (
    <Card sx={{
      borderRadius: 3, border: '2px dashed #e2e8f0', boxShadow: 'none',
      height: '100%', minHeight: small ? 110 : 160,
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'border-color 0.2s, background 0.2s',
      '&:hover': { borderColor: '#6366f1', bgcolor: '#fafbff' },
    }}>
      <CardContent sx={{ textAlign: 'center', p: small ? 2 : 3 }}>
        <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: '#f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 0.8 }}>
          <AddIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
        </Box>
        <Typography variant={small ? 'caption' : 'subtitle2'}
          sx={{ fontWeight: 700, color: '#6366f1', display: 'block' }}>
          Build from Scratch
        </Typography>
        {!small && (
          <Typography variant="caption" color="text.disabled">Create a fully custom agent</Typography>
        )}
      </CardContent>
    </Card>
  );
}

// ─── template card ────────────────────────────────────────────────────────────

function TemplateCard({ template }: { template: AgentTemplate }) {
  return (
    <Card sx={{
      borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none',
      height: '100%', cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 4px 16px rgba(15,23,42,0.10)' },
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
          <Typography sx={{ fontSize: 16, flexShrink: 0 }}>{template.iconEmoji ?? '🤖'}</Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {template.name}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', lineHeight: 1.4, fontSize: 11, mb: 1,
        }}>
          {template.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
          {[...template.models, ...template.tools].slice(0, 3).map((t) => (
            <Chip key={t} label={t} size="small"
              sx={{ height: 18, fontSize: 10, fontWeight: 600, bgcolor: '#eef2ff', color: '#6366f1', border: 'none' }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── my agents panel ──────────────────────────────────────────────────────────

function MyAgentsPanel({ onClose }: { onClose: () => void }) {
  const { data, isLoading } = useGetMyAgentsQuery();
  const agents = data?.data ?? [];

  return (
    <Box sx={{
      width: { xs: '100%', md: 220 }, flexShrink: 0, bgcolor: '#fff',
      borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 26, height: 26, borderRadius: 1.5, bgcolor: '#f59e0b',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartToyIcon sx={{ fontSize: 15, color: '#fff' }} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>My Agents</Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: 'text.disabled' }}>
          <CloseIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <Box key={i} sx={{ px: 2, py: 0.8 }}>
                <Skeleton height={38} sx={{ borderRadius: 2 }} />
              </Box>
            ))
          : agents.map((agent: MyAgent) => (
              <Box key={agent.id} sx={{
                display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1,
                cursor: 'pointer', '&:hover': { bgcolor: '#f8fafc' },
              }}>
                <Box sx={{ width: 30, height: 30, borderRadius: 2, bgcolor: '#eef2ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
                  {agent.iconEmoji ?? '🤖'}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', lineHeight: 1.2 }}>
                    {agent.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ fontSize: 10 }}>
                    {agent.model} · {agent.tools} tools
                  </Typography>
                </Box>
                <CircleIcon sx={{ fontSize: 8, color: agent.isActive ? '#22c55e' : '#94a3b8', flexShrink: 0 }} />
              </Box>
            ))
        }
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
        <Button fullWidth variant="contained" size="small" startIcon={<AddIcon />}
          sx={{ bgcolor: '#f59e0b', borderRadius: 2, fontWeight: 700, boxShadow: 'none',
            '&:hover': { bgcolor: '#d97706', boxShadow: 'none' } }}>
          Create Custom Agent
        </Button>
      </Box>
    </Box>
  );
}

// ─── left sidebar ─────────────────────────────────────────────────────────────

function LeftSidebar() {
  const { data: tasksData, isLoading } = useGetAgentTasksQuery();
  const tasks = tasksData?.data ?? [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartToyIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Agent Builder</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
          Create powerful AI agents using any model. Pick a template or start from scratch.
        </Typography>
        <Button fullWidth variant="outlined" size="small" startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
          sx={{ borderRadius: 2, fontSize: 12, borderColor: '#e2e8f0', color: 'text.secondary' }}>
          ← Back
        </Button>
      </Box>

      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <HelpOutlineIcon sx={{ fontSize: 13, color: '#6366f1' }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#6366f1' }}>
            Not sure where to start?
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
          Chat with our AI guide — describe what you want your agent to do and get a personalised setup plan.
        </Typography>
        <Button fullWidth variant="outlined" size="small"
          sx={{ borderRadius: 2, fontSize: 12, borderColor: '#e2e8f0', color: 'text.secondary' }}>
          Ask the Hub →
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <AddIcon sx={{ fontSize: 13, color: '#6366f1' }} />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>New Task</Typography>
        </Box>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={26} sx={{ mb: 0.5 }} />)
          : tasks.map((task) => (
              <Box key={task.id} sx={{
                display: 'flex', alignItems: 'center', gap: 1, py: 0.7, px: 1,
                borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f0f4ff' },
              }}>
                <CheckBoxOutlineBlankIcon sx={{ fontSize: 13, color: 'text.disabled', flexShrink: 0 }} />
                <Typography variant="caption" color="text.secondary"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>
                  {task.title}
                </Typography>
              </Box>
            ))
        }
      </Box>
    </Box>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AgentLibraryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMyAgents, setShowMyAgents] = useState(true);

  const { data: libraryData, isLoading: libraryLoading, isError: libraryError } =
    useGetLibraryAgentsQuery({});
  const libraryAgents = libraryData?.data ?? [];

  const { data: templatesData, isLoading: templatesLoading, isError: templatesError } =
    useGetAgentTemplatesQuery({});
  const templates = templatesData?.data ?? [];

  const sidebar = <LeftSidebar />;

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isMobile && (
        <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 2, py: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton size="small" onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Agent Library</Typography>
          <Box />
        </Box>
      )}

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden',
        height: isMobile ? 'auto' : 'calc(100vh - 72px)' }}>

        {/* col 1: left sidebar */}
        {!isMobile && (
          <Box sx={{ width: 220, flexShrink: 0, borderRight: '1px solid #e2e8f0',
            bgcolor: '#fff', p: 2, overflowY: 'auto' }}>
            {sidebar}
          </Box>
        )}
        <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}
          PaperProps={{ sx: { width: 240, p: 2 } }}>
          {sidebar}
        </Drawer>

        {/* col 2: my agents */}
        {!isMobile && showMyAgents && (
          <MyAgentsPanel onClose={() => setShowMyAgents(false)} />
        )}

        {/* col 3: library + templates */}
        <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* top bar */}
          <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0',
            px: { xs: 2, md: 3 }, py: 1.5,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Agent Library</Typography>
              <Typography variant="caption" color="text.secondary">
                Choose a default agent or build your own
              </Typography>
            </Box>
            <Button variant="contained" size="small"
              sx={{ bgcolor: '#0f172a', borderRadius: 2, fontWeight: 600, fontSize: 12,
                '&:hover': { bgcolor: '#1e293b' }, boxShadow: 'none', whiteSpace: 'nowrap' }}>
              Default Agents
            </Button>
          </Box>

          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* library grid */}
            {libraryError ? (
              <CommonErrorState title="Failed to load library" description="Could not fetch agent library." />
            ) : libraryLoading ? (
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton variant="rounded" height={160} sx={{ borderRadius: 3 }} />
                  </Grid>
                ))}
              </Grid>
            ) : libraryAgents.length === 0 ? (
              <CommonNoDataState title="No agents in library" description="No library agents available yet." />
            ) : (
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {libraryAgents.map((agent) => (
                  <Grid item xs={12} sm={6} md={4} key={agent.id}>
                    <LibraryAgentCard agent={agent} />
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4}>
                  <BuildFromScratchCard />
                </Grid>
              </Grid>
            )}

            {/* templates */}
            <Divider sx={{ mb: 2.5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.8 }}>
                AGENT TEMPLATES
              </Typography>
              {!templatesLoading && (
                <Chip label={templates.length} size="small"
                  sx={{ height: 18, fontSize: 10, bgcolor: '#eef2ff', color: '#6366f1', border: 'none' }} />
              )}
            </Box>

            {templatesLoading ? (
              <Grid container spacing={2}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Skeleton variant="rounded" height={110} sx={{ borderRadius: 3 }} />
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
                  <Grid item xs={12} sm={6} md={4} lg={3} key={t.id}>
                    <TemplateCard template={t} />
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <BuildFromScratchCard small />
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
