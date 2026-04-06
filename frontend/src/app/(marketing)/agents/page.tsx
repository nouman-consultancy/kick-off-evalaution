'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box, Typography, Button, Chip, Card, CardContent, Grid,
  IconButton, Tooltip, Paper, TextField, Skeleton,
  useMediaQuery, useTheme, Drawer,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  useGetAgentTemplatesQuery,
  useGetAgentSuggestionsQuery,
  useGetAgentTasksQuery,
  AgentTemplate,
} from '@/appstore/api/agentsApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

// ─── constants ────────────────────────────────────────────────────────────────

const SUGGESTION_CATEGORIES = [
  'Use cases', 'Build a business', 'Help me learn',
  'Monitor the situation', 'Research', 'Create content', 'Analyze & research',
];

// ─── agent template card ──────────────────────────────────────────────────────

function TemplateCard({ template }: { template: AgentTemplate }) {
  return (
    <Card sx={{
      borderRadius: 3, border: '1px solid #eceef3', boxShadow: 'none',
      height: '100%', cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.10)' },
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: 2, bgcolor: '#f0f2ff',
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
              sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: '#f0f2ff', color: '#3d52d5', border: 'none' }} />
          ))}
          {template.tools.map((t) => (
            <Chip key={t} label={t} size="small"
              sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: '#fff4e6', color: '#e65100', border: 'none' }} />
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
      borderRadius: 3, border: '2px dashed #eceef3', boxShadow: 'none',
      height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'border-color 0.2s',
      '&:hover': { borderColor: '#3d52d5' },
    }}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <AddIcon sx={{ fontSize: 28, color: 'text.disabled', mb: 0.5 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#e65100' }}>
          Build from Scratch
        </Typography>
      </CardContent>
    </Card>
  );
}

// ─── chat input (reuses SearchBar icon pattern) ───────────────────────────────

function AgentChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // track the transcript already committed so we don't double-append
  const committedRef = useRef('');

  // cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ── voice-to-text (speech recognition) ──────────────────────────────────────
  const handleVoiceMic = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // always create a fresh instance so restart works reliably
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // snapshot of value at the moment recording starts
    const baseText = value;
    committedRef.current = '';

    recognition.onresult = (event: any) => {
      let interim = '';
      let committed = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          committed += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      committedRef.current = committed;
      // show committed + interim in the field
      setValue(baseText + committed + interim);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // keep only the committed text (drop interim)
      setValue(baseText + committedRef.current);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
    committedRef.current = '';
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const appendText = (extra: string) => setValue((v) => v + extra);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, label: string) => {
    const files = e.target.files;
    if (files?.length) appendText(` [${label}: ${Array.from(files).map(f => f.name).join(', ')}]`);
    e.target.value = '';
  };

  const handleScreen = async () => {
    try {
      if (navigator.mediaDevices?.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        appendText(' [Screen shared]');
        stream.getTracks().forEach(t => t.stop());
      }
    } catch { /* user cancelled */ }
  };

  return (
    <Paper elevation={0} sx={{
      border: '1px solid #e0e0e0', borderRadius: 3, overflow: 'hidden',
      bgcolor: '#fafafa', width: '100%',
    }}>
      {/* label */}
      <Box sx={{ px: 2, pt: 1.5 }}>
        <Typography variant="caption" color="text.disabled">What should we work on next?</Typography>
      </Box>

      {/* video badge */}
      <Box sx={{ px: 2, pt: 0.5 }}>
        <Chip label="Video" size="small"
          sx={{ height: 20, fontSize: 11, bgcolor: '#1a1a2e', color: '#fff', fontWeight: 600 }} />
      </Box>

      {/* text input */}
      <Box sx={{ px: 2, py: 1 }}>
        <TextField
          fullWidth multiline maxRows={4}
          placeholder="Describe what you want your agent to do..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          variant="standard"
          InputProps={{ disableUnderline: true, sx: { fontSize: 15 } }}
        />
      </Box>

      {/* listening indicator */}
      {isListening && (
        <Box sx={{
          px: 2, py: 0.8, bgcolor: '#fff4e6',
          display: 'flex', alignItems: 'center', gap: 1,
        }}>
          <Box sx={{ display: 'flex', gap: 0.4, alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => (
              <Box key={i} sx={{
                width: 3, borderRadius: 2, bgcolor: '#e65100',
                animation: 'voiceBar 0.6s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
                '@keyframes voiceBar': {
                  '0%,100%': { height: 6 },
                  '50%': { height: 18 },
                },
              }} />
            ))}
          </Box>
          <Typography variant="caption" sx={{ color: '#e65100', fontWeight: 600 }}>
            Listening… speak now
          </Typography>
          <IconButton size="small" onClick={handleVoiceMic} sx={{ ml: 'auto', p: 0.3 }}>
            <Box sx={{ width: 10, height: 10, bgcolor: '#e65100', borderRadius: 0.5 }} />
          </IconButton>
        </Box>
      )}

      {/* toolbar */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 1.5, py: 1, borderTop: '1px solid #ebebeb',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={isListening ? 'Stop listening' : 'Voice input (speech to text)'}>
            <IconButton
              size="small"
              onClick={handleVoiceMic}
              sx={{
                color: isListening ? '#e65100' : 'text.secondary',
                bgcolor: isListening ? '#fff4e6' : 'transparent',
                '&:hover': { color: '#e65100' },
              }}
            >
              <MicNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={() => fileRef.current?.click()}>
              <AttachFileIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload image">
            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={() => imageRef.current?.click()}>
              <ImageIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload video">
            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={() => videoRef.current?.click()}>
              <VideocamIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share screen">
            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleScreen}>
              <ScreenShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Select agent">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <SmartToyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <AddIcon sx={{ fontSize: 18, color: 'text.disabled', cursor: 'pointer' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.disabled">Agent</Typography>
          <IconButton
            size="small"
            onClick={handleSend}
            disabled={!value.trim()}
            sx={{
              bgcolor: value.trim() ? '#e65100' : '#eee',
              color: value.trim() ? '#fff' : '#aaa',
              width: 32, height: 32,
              '&:hover': { bgcolor: value.trim() ? '#bf360c' : '#eee' },
            }}
          >
            <SendIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      {/* hidden inputs */}
      <input ref={fileRef} type="file" multiple style={{ display: 'none' }}
        onChange={(e) => handleFile(e, 'File')} />
      <input ref={imageRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
        onChange={(e) => handleFile(e, 'Image')} />
      <input ref={videoRef} type="file" accept="video/*" style={{ display: 'none' }}
        onChange={(e) => handleFile(e, 'Video')} />
    </Paper>
  );
}

// ─── left sidebar ─────────────────────────────────────────────────────────────

function LeftSidebar() {
  const { data: tasksData, isLoading } = useGetAgentTasksQuery();
  const tasks = tasksData?.data ?? [];

  return (
    <Box sx={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Agent Builder header */}
      <Box sx={{ border: '1px solid #eceef3', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#e65100',
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
          sx={{ bgcolor: '#e65100', borderRadius: 2, fontWeight: 700, '&:hover': { bgcolor: '#bf360c' } }}>
          + New Agent
        </Button>
      </Box>

      {/* Help */}
      <Box sx={{ border: '1px solid #eceef3', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <AddIcon sx={{ fontSize: 14, color: '#3d52d5' }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#3d52d5' }}>Not sure where to start?</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
          Chat with our AI guide — describe what you want your agent to do and get a personalised setup plan.
        </Typography>
        <Button fullWidth variant="outlined" size="small"
          sx={{ borderRadius: 2, fontSize: 12, borderColor: '#eceef3', color: 'text.secondary' }}>
          Ask the Hub →
        </Button>
      </Box>

      {/* Tasks */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <AddIcon sx={{ fontSize: 14, color: '#3d52d5' }} />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>New Task</Typography>
        </Box>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={28} sx={{ mb: 0.5 }} />)
          : tasks.map((task) => (
              <Box key={task.id} sx={{
                display: 'flex', alignItems: 'center', gap: 1, py: 0.8, px: 1,
                borderRadius: 2, cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f7ff' },
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
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* mobile top bar */}
      {isMobile && (
        <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #eceef3', px: 2, py: 1,
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
            width: 240, flexShrink: 0, borderRight: '1px solid #eceef3',
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
              <Box component="span" sx={{ color: '#e65100' }}>for you.</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your AI agent takes care of everything, end to end.
            </Typography>
          </Box>

          {/* chat input */}
          <Box sx={{ maxWidth: 760, mx: 'auto', mb: 3 }}>
            <AgentChatInput onSend={(text) => console.log('Agent prompt:', text)} />
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
                  bgcolor: activeCategory === cat ? '#1a1a2e' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'text.secondary',
                  border: activeCategory === cat ? 'none' : '1px solid #eceef3',
                  '&:hover': { bgcolor: activeCategory === cat ? '#1a1a2e' : '#f0f2ff' },
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
                      mb: 0.8, borderRadius: 2, bgcolor: '#fff', border: '1px solid #eceef3',
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
            <Typography variant="caption" sx={{ color: '#3d52d5', cursor: 'pointer', fontWeight: 600,
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
                  sx={{ height: 18, fontSize: 11, bgcolor: '#f0f2ff', color: '#3d52d5', border: 'none' }} />
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
