'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, Paper, TextField, IconButton, Tooltip, Typography, Chip,
  Popover, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider,
} from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

// ─── types ────────────────────────────────────────────────────────────────────

interface AgentOption {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface RecordedAudio {
  blob: Blob;
  url: string;
  duration: number;
}

export interface ChatInputBarProps {
  /** Placeholder text shown in the text field */
  placeholder?: string;
  /** Label shown above the input (agents page style). Omit for landing style. */
  topLabel?: string;
  /** Extra chip shown below topLabel (e.g. "Video") */
  topBadge?: string;
  /** Right-side label next to send button */
  sendLabel?: string;
  /** Send button accent colour. Defaults to primary blue. */
  accentColor?: string;
  /** Called when the user submits text */
  onSend?: (payload: { text: string; audio?: RecordedAudio }) => void;
  /** Max width of the Paper wrapper */
  maxWidth?: number | string;
  /** Paper elevation (landing = 3, agents = 0) */
  elevation?: number;
}

const DEFAULT_AGENTS: AgentOption[] = [
  { id: '1', name: 'Support Agent',  description: 'Handle customer inquiries',    color: '#4CAF50' },
  { id: '2', name: 'Sales Agent',    description: 'Qualify leads and close deals', color: '#2196F3' },
  { id: '3', name: 'Research Agent', description: 'Find and analyze information',  color: '#9C27B0' },
  { id: '4', name: 'Code Agent',     description: 'Help with coding tasks',        color: '#FF9800' },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// ─── component ────────────────────────────────────────────────────────────────

export default function ChatInputBar({
  placeholder = 'Type your message or use the tools below...',
  topLabel,
  topBadge,
  sendLabel,
  accentColor,
  onSend,
  maxWidth = 800,
  elevation = 3,
}: ChatInputBarProps) {

  // ── text ──────────────────────────────────────────────────────────────────
  const [text, setText] = useState('');

  // ── speech-to-text ────────────────────────────────────────────────────────
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const voiceBaseRef = useRef('');
  const voiceCommittedRef = useRef('');

  // ── audio recording ───────────────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<RecordedAudio | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── agent picker ──────────────────────────────────────────────────────────
  const [selectedAgent, setSelectedAgent] = useState<AgentOption | null>(null);
  const [agentAnchor, setAgentAnchor] = useState<HTMLElement | null>(null);

  // ── dialogs ───────────────────────────────────────────────────────────────
  const [attachOpen, setAttachOpen]       = useState(false);
  const [imageOpen, setImageOpen]         = useState(false);
  const [videoOpen, setVideoOpen]         = useState(false);
  const [screenOpen, setScreenOpen]       = useState(false);

  // ── file refs ─────────────────────────────────────────────────────────────
  const fileRef  = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  // ── cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      if (recordedAudio?.url) URL.revokeObjectURL(recordedAudio.url);
      audioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync audio element when recording finishes
  useEffect(() => {
    if (!recordedAudio?.url) return;
    const audio = new Audio(recordedAudio.url);
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('timeupdate', () => setPlaybackTime(audio.currentTime));
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, [recordedAudio]);

  // ── helpers ───────────────────────────────────────────────────────────────
  const append = (s: string) => setText(v => v + s);

  // ── 1. speech-to-text ─────────────────────────────────────────────────────
  const handleSpeechToggle = useCallback(() => {
    const SR = typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SR) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    voiceBaseRef.current = text;
    voiceCommittedRef.current = '';

    recognition.onresult = (e: any) => {
      let committed = '';
      let interim = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) committed += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      voiceCommittedRef.current = committed;
      setText(voiceBaseRef.current + committed + interim);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend   = () => {
      setText(voiceBaseRef.current + voiceCommittedRef.current);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, text]);

  // ── 2. audio recording ────────────────────────────────────────────────────
  const handleRecordToggle = useCallback(async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      if (recTimerRef.current) { clearInterval(recTimerRef.current); recTimerRef.current = null; }
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudio({ blob, url: URL.createObjectURL(blob), duration: recordingDuration });
        stream.getTracks().forEach(t => t.stop());
      };

      mr.start(100);
      setIsRecording(true);
      setRecordingDuration(0);
      recTimerRef.current = setInterval(() => setRecordingDuration(d => d + 1), 1000);
    } catch {
      alert('Could not access microphone. Please check browser permissions.');
    }
  }, [isRecording, recordingDuration]);

  const handleDeleteAudio = () => {
    if (recordedAudio?.url) URL.revokeObjectURL(recordedAudio.url);
    setRecordedAudio(null);
    setIsPlaying(false);
    setPlaybackTime(0);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else           { audioRef.current.play();  setIsPlaying(true);  }
  };

  const handleSeek = (_: Event, v: number | number[]) => {
    const t = v as number;
    if (audioRef.current) { audioRef.current.currentTime = t; setPlaybackTime(t); }
  };

  // ── 3. file attachment ────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, label: string) => {
    const files = e.target.files;
    if (files?.length) append(` [${label}: ${Array.from(files).map(f => f.name).join(', ')}]`);
    e.target.value = '';
  };

  // ── 4. screen share ───────────────────────────────────────────────────────
  const handleScreenShare = async () => {
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert('Screen sharing is not supported in this browser.');
        return;
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenOpen(true);
      stream.getVideoTracks()[0].onended = () => {
        append(' [Screen recording shared]');
        setScreenOpen(false);
      };
    } catch { /* user cancelled */ }
  };

  // ── send ──────────────────────────────────────────────────────────────────
  const handleSend = () => {
    if (!text.trim() && !recordedAudio) return;
    onSend?.({ text: text.trim(), audio: recordedAudio ?? undefined });
    setText('');
    voiceCommittedRef.current = '';
    setSelectedAgent(null);
    handleDeleteAudio();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const canSend = text.trim().length > 0 || !!recordedAudio;
  const sendBg  = accentColor ?? undefined; // undefined = MUI primary

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Paper
        elevation={elevation}
        sx={{
          width: '100%',
          maxWidth,
          mx: 'auto',
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: elevation === 0 ? '#f8fafc' : 'white',
          border: elevation === 0 ? '1px solid #e2e8f0' : 'none',
        }}
      >
        {/* optional top label */}
        {topLabel && (
          <Box sx={{ px: 2, pt: 1.5 }}>
            <Typography variant="caption" color="text.disabled">{topLabel}</Typography>
          </Box>
        )}

        {/* optional badge */}
        {topBadge && (
          <Box sx={{ px: 2, pt: 0.5 }}>
            <Chip label={topBadge} size="small"
              sx={{ height: 20, fontSize: 11, bgcolor: '#0f172a', color: '#fff', fontWeight: 600 }} />
          </Box>
        )}

        {/* selected agent chip */}
        {selectedAgent && (
          <Box sx={{ px: 2, pt: 1 }}>
            <Chip
              icon={<SmartToyIcon />}
              label={selectedAgent.name}
              onDelete={() => setSelectedAgent(null)}
              size="small"
              sx={{ bgcolor: selectedAgent.color, color: '#fff',
                '& .MuiChip-deleteIcon': { color: '#fff' },
                '& .MuiChip-icon': { color: '#fff' } }}
            />
          </Box>
        )}

        {/* text input */}
        <Box sx={{ px: 2, py: 1 }}>
          <TextField
            fullWidth multiline maxRows={4}
            placeholder={placeholder}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            variant="standard"
            InputProps={{ disableUnderline: true, sx: { fontSize: '1rem', py: 0.5 } }}
          />
        </Box>

        {/* ── speech-to-text listening indicator ── */}
        {isListening && (
          <Box sx={{ px: 2, py: 0.8, bgcolor: 'rgba(99,102,241,0.05)',
            display: 'flex', alignItems: 'center', gap: 1 }}>
            <GraphicEqIcon color="primary" sx={{ fontSize: 18 }} />
            <Box sx={{ display: 'flex', gap: 0.4, alignItems: 'center' }}>
              {[...Array(6)].map((_, i) => (
                <Box key={i} sx={{
                  width: 3, borderRadius: 2, bgcolor: '#6366f1',
                  animation: 'stBar 0.6s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                  '@keyframes stBar': { '0%,100%': { height: 5 }, '50%': { height: 18 } },
                }} />
              ))}
            </Box>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 600, ml: 0.5 }}>
              Listening… speak now
            </Typography>
            <IconButton size="small" onClick={handleSpeechToggle} sx={{ ml: 'auto' }}>
              <StopIcon color="error" fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* ── audio recording waveform ── */}
        {isRecording && (
          <Box sx={{ px: 2, py: 0.8, bgcolor: 'rgba(239,68,68,0.05)',
            display: 'flex', alignItems: 'center', gap: 1 }}>
            <MicIcon color="error" sx={{ fontSize: 18 }} />
            <Box sx={{ display: 'flex', gap: 0.4, alignItems: 'center' }}>
              {[...Array(8)].map((_, i) => (
                <Box key={i} sx={{
                  width: 3, borderRadius: 2, bgcolor: 'error.main',
                  animation: 'recBar 0.5s ease-in-out infinite',
                  animationDelay: `${i * 0.08}s`,
                  '@keyframes recBar': { '0%,100%': { height: 4 }, '50%': { height: 20 } },
                }} />
              ))}
            </Box>
            <Typography variant="caption" color="error" sx={{ fontWeight: 600, ml: 0.5 }}>
              Recording… {fmt(recordingDuration)}
            </Typography>
            <IconButton size="small" onClick={handleRecordToggle} sx={{ ml: 'auto' }}>
              <StopIcon color="error" fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* ── recorded audio player ── */}
        {recordedAudio && !isRecording && (
          <Box sx={{ px: 2, py: 1, bgcolor: 'rgba(99,102,241,0.04)',
            borderTop: '1px solid rgba(99,102,241,0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,
              bgcolor: 'white', borderRadius: 2, px: 1.5, py: 0.5 }}>
              <AudioFileIcon color="primary" sx={{ fontSize: 20 }} />
              <IconButton size="small" onClick={handlePlayPause}>
                {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
              </IconButton>
              <Box sx={{ flex: 1, px: 1 }}>
                <Slider size="small" value={playbackTime}
                  max={recordedAudio.duration || 1} onChange={handleSeek}
                  sx={{ color: 'primary.main', '& .MuiSlider-thumb': { width: 12, height: 12 } }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
                {fmt(playbackTime)} / {fmt(recordedAudio.duration)}
              </Typography>
              <Tooltip title="Delete recording">
                <IconButton size="small" onClick={handleDeleteAudio}>
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}

        {/* ── toolbar ── */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 1, py: 1, borderTop: '1px solid #e2e8f0', bgcolor: '#f8fafc',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

            {/* 1. audio record (mic) */}
            <Tooltip title={isRecording ? 'Stop recording' : 'Record voice message'}>
              <IconButton onClick={handleRecordToggle} disabled={!!recordedAudio && !isRecording}
                sx={{ color: isRecording ? 'error.main' : recordedAudio ? 'success.main' : 'text.secondary',
                  '&:hover': { color: 'error.main' } }}>
                {isRecording ? <MicIcon /> : recordedAudio ? <CheckCircleIcon /> : <MicNoneIcon />}
              </IconButton>
            </Tooltip>

            {/* 2. attachment */}
            <Tooltip title="Attach file">
              <IconButton onClick={() => setAttachOpen(true)}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <AttachFileIcon />
              </IconButton>
            </Tooltip>

            {/* 3. image */}
            <Tooltip title="Upload image">
              <IconButton onClick={() => setImageOpen(true)}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <ImageIcon />
              </IconButton>
            </Tooltip>

            {/* 4. speech-to-text */}
            <Tooltip title={isListening ? 'Stop voice typing' : 'Voice typing (speech to text)'}>
              <IconButton onClick={handleSpeechToggle}
                sx={{ color: isListening ? 'primary.main' : 'text.secondary',
                  bgcolor: isListening ? 'rgba(99,102,241,0.08)' : 'transparent',
                  '&:hover': { color: 'primary.main' } }}>
                <KeyboardVoiceIcon />
              </IconButton>
            </Tooltip>

            {/* 5. video */}
            <Tooltip title="Upload video">
              <IconButton onClick={() => setVideoOpen(true)}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <VideocamIcon />
              </IconButton>
            </Tooltip>

            {/* 6. screen share */}
            <Tooltip title="Share screen">
              <IconButton onClick={handleScreenShare}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <ScreenShareIcon />
              </IconButton>
            </Tooltip>

            {/* agent picker */}
            <Tooltip title="Select agent">
              <IconButton onClick={e => setAgentAnchor(e.currentTarget)}
                sx={{ color: selectedAgent ? selectedAgent.color : 'text.secondary',
                  '&:hover': { color: 'primary.main' } }}>
                <SmartToyIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {sendLabel && (
              <Typography variant="caption" color="text.disabled">{sendLabel}</Typography>
            )}
            <IconButton onClick={handleSend} disabled={!canSend}
              sx={{
                bgcolor: canSend ? (sendBg ?? 'primary.main') : 'grey.300',
                color: 'white', width: 36, height: 36,
                '&:hover': { bgcolor: canSend ? (sendBg ?? 'primary.dark') : 'grey.300' },
                '&.Mui-disabled': { bgcolor: 'grey.300', color: 'grey.400' },
              }}>
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* ── agent picker popover ── */}
      <Popover open={Boolean(agentAnchor)} anchorEl={agentAnchor}
        onClose={() => setAgentAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Box sx={{ p: 2, minWidth: 260 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Select an Agent</Typography>
          <List dense>
            {DEFAULT_AGENTS.map(a => (
              <ListItem key={a.id} disablePadding>
                <ListItemButton onClick={() => {
                  setSelectedAgent(a);
                  append(` [Using ${a.name}]`);
                  setAgentAnchor(null);
                }}>
                  <ListItemIcon>
                    <SmartToyIcon sx={{ color: a.color }} />
                  </ListItemIcon>
                  <ListItemText primary={a.name} secondary={a.description} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      {/* ── attachment dialog ── */}
      <Dialog open={attachOpen} onClose={() => setAttachOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Attach Files
            <IconButton onClick={() => setAttachOpen(false)}><CloseIcon /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ border: '2px dashed', borderColor: 'primary.main', borderRadius: 2,
            p: 4, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => fileRef.current?.click()}>
            <DescriptionIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Drop files here or click to browse</Typography>
            <Typography variant="body2" color="text.secondary">Supports documents, PDFs, and more</Typography>
            <input ref={fileRef} type="file" multiple style={{ display: 'none' }}
              onChange={e => { handleFileChange(e, 'Attached'); setAttachOpen(false); }} />
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={() => setAttachOpen(false)}>Cancel</Button></DialogActions>
      </Dialog>

      {/* ── image dialog ── */}
      <Dialog open={imageOpen} onClose={() => setImageOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Upload Images
            <IconButton onClick={() => setImageOpen(false)}><CloseIcon /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ border: '2px dashed', borderColor: 'success.main', borderRadius: 2,
            p: 4, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => imageRef.current?.click()}>
            <PhotoLibraryIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Drop images here or click to browse</Typography>
            <Typography variant="body2" color="text.secondary">Supports JPG, PNG, GIF, WebP</Typography>
            <input ref={imageRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
              onChange={e => { handleFileChange(e, 'Image'); setImageOpen(false); }} />
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={() => setImageOpen(false)}>Cancel</Button></DialogActions>
      </Dialog>

      {/* ── video dialog ── */}
      <Dialog open={videoOpen} onClose={() => setVideoOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Upload Video
            <IconButton onClick={() => setVideoOpen(false)}><CloseIcon /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ border: '2px dashed', borderColor: 'error.main', borderRadius: 2,
            p: 4, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => videoRef.current?.click()}>
            <VideocamIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Drop video here or click to browse</Typography>
            <Typography variant="body2" color="text.secondary">Supports MP4, WebM, MOV up to 100MB</Typography>
            <input ref={videoRef} type="file" accept="video/*" style={{ display: 'none' }}
              onChange={e => { handleFileChange(e, 'Video'); setVideoOpen(false); }} />
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={() => setVideoOpen(false)}>Cancel</Button></DialogActions>
      </Dialog>

      {/* ── screen share confirmation ── */}
      <Dialog open={screenOpen} onClose={() => setScreenOpen(false)} maxWidth="xs">
        <DialogTitle>Screen Sharing Active</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Screen sharing started!</Typography>
            <Typography variant="body2" color="text.secondary">
              Stop sharing from your browser controls or click below.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { append(' [Screen recording shared]'); setScreenOpen(false); }} color="error">
            Stop Sharing
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
