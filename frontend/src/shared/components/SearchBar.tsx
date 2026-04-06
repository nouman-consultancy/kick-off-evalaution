'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Slider,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import CloseIcon from '@mui/icons-material/Close';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import AudioFileIcon from '@mui/icons-material/AudioFile';

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface RecordedAudio {
  blob: Blob;
  url: string;
  duration: number;
}

const agents: Agent[] = [
  { id: '1', name: 'Support Agent', description: 'Handle customer inquiries', icon: SmartToyIcon, color: '#4CAF50' },
  { id: '2', name: 'Sales Agent', description: 'Qualify leads and close deals', icon: SmartToyIcon, color: '#2196F3' },
  { id: '3', name: 'Research Agent', description: 'Find and analyze information', icon: SmartToyIcon, color: '#9C27B0' },
  { id: '4', name: 'Code Agent', description: 'Help with coding tasks', icon: SmartToyIcon, color: '#FF9800' },
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceTyping, setIsVoiceTyping] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<RecordedAudio | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [agentAnchorEl, setAgentAnchorEl] = useState<HTMLElement | null>(null);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [screenShareDialogOpen, setScreenShareDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  // snapshot of text before voice session starts, to avoid duplicate appends
  const voiceBaseRef = useRef('');
  const voiceCommittedRef = useRef('');

  // Initialize audio element for playback
  useEffect(() => {
    if (recordedAudio?.url) {
      audioRef.current = new Audio(recordedAudio.url);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [recordedAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordedAudio?.url) {
        URL.revokeObjectURL(recordedAudio.url);
      }
    };
  }, []);

  // Initialize speech recognition — always creates a fresh instance
  const initSpeechRecognition = useCallback((baseText: string) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    voiceBaseRef.current = baseText;
    voiceCommittedRef.current = '';

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
      voiceCommittedRef.current = committed;
      setSearchQuery(voiceBaseRef.current + committed + interim);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsVoiceTyping(false);
      setShowWaveform(false);
    };

    recognition.onend = () => {
      // keep only committed, drop interim
      setSearchQuery(voiceBaseRef.current + voiceCommittedRef.current);
      setIsVoiceTyping(false);
      setShowWaveform(false);
    };

    return recognition;
  }, []);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Microphone recording (for audio message)
  const handleMicClick = async () => {
    if (isRecording) {
      // Stop recording
      stopRecording();
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const duration = recordingDuration;

          setRecordedAudio({
            blob: audioBlob,
            url: audioUrl,
            duration: duration,
          });

          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start(100); // Collect data every 100ms
        setIsRecording(true);
        setShowWaveform(true);
        setRecordingDuration(0);

        // Update recording duration every second
        recordingTimerRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);

      } catch (err) {
        console.error('Error accessing microphone:', err);
        alert('Could not access microphone. Please check permissions.');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecording(false);
    setShowWaveform(false);
  };

  // Voice typing (speech to text)
  const handleVoiceTypingClick = () => {
    if (isVoiceTyping) {
      recognitionRef.current?.stop();
      setIsVoiceTyping(false);
      setShowWaveform(false);
      return;
    }

    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const recognition = initSpeechRecognition(searchQuery);
    if (!recognition) return;
    recognitionRef.current = recognition;
    recognition.start();
    setIsVoiceTyping(true);
    setShowWaveform(true);
  };

  // Audio playback controls
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (_: Event, value: number | number[]) => {
    const newTime = value as number;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleDeleteAudio = () => {
    if (recordedAudio?.url) {
      URL.revokeObjectURL(recordedAudio.url);
    }
    setRecordedAudio(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Attachment handling
  const handleAttachmentClick = () => {
    setAttachmentDialogOpen(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((f) => f.name);
      setUploadedFiles(fileNames);
      setSearchQuery((prev) => prev + `[Attached: ${fileNames.join(', ')}] `);
      setAttachmentDialogOpen(false);
    }
  };

  // Image handling
  const handleImageClick = () => {
    setImageDialogOpen(true);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((f) => f.name);
      setSearchQuery((prev) => prev + `[Images: ${fileNames.join(', ')}] `);
      setImageDialogOpen(false);
    }
  };

  // Video handling
  const handleVideoClick = () => {
    setVideoDialogOpen(true);
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((f) => f.name);
      setSearchQuery((prev) => prev + `[Video: ${fileNames.join(', ')}] `);
      setVideoDialogOpen(false);
    }
  };

  // Screen share handling
  const handleScreenShareClick = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setScreenShareDialogOpen(true);

        stream.getVideoTracks()[0].onended = () => {
          setSearchQuery((prev) => prev + '[Screen recording shared] ');
          setScreenShareDialogOpen(false);
        };
      } else {
        alert('Screen sharing is not supported in your browser');
      }
    } catch (err) {
      console.error('Error sharing screen:', err);
    }
  };

  // Agent handling
  const handleAgentClick = (event: React.MouseEvent<HTMLElement>) => {
    setAgentAnchorEl(event.currentTarget);
  };

  const handleAgentClose = () => {
    setAgentAnchorEl(null);
  };

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setSearchQuery((prev) => prev + `[Using ${agent.name}] `);
    handleAgentClose();
  };

  const handleSend = () => {
    if (searchQuery.trim() || recordedAudio) {
      console.log('Sending:', { text: searchQuery, audio: recordedAudio });
      // Reset everything
      setSearchQuery('');
      setUploadedFiles([]);
      setSelectedAgent(null);
      if (recordedAudio?.url) {
        URL.revokeObjectURL(recordedAudio.url);
      }
      setRecordedAudio(null);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const isAgentMenuOpen = Boolean(agentAnchorEl);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        {/* Selected Agent Chip */}
        {selectedAgent && (
          <Box sx={{ px: 2, pt: 1 }}>
            <Chip
              icon={<SmartToyIcon />}
              label={selectedAgent.name}
              onDelete={() => setSelectedAgent(null)}
              color="primary"
              size="small"
              sx={{
                backgroundColor: selectedAgent.color,
                color: 'white',
                '& .MuiChip-deleteIcon': {
                  color: 'white',
                },
              }}
            />
          </Box>
        )}

        {/* Search Input */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message or use the tools below..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="standard"
            multiline
            maxRows={4}
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: '1rem', py: 1 },
            }}
          />
        </Box>

        {/* Waveform Animation (when recording) */}
        {showWaveform && (
          <Box
            sx={{
              px: 2,
              py: 1,
              backgroundColor: 'rgba(25, 118, 210, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <GraphicEqIcon color="primary" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1 }}>
              {[...Array(8)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 4,
                    height: 20 + Math.random() * 20,
                    backgroundColor: 'primary.main',
                    borderRadius: 2,
                    animation: 'pulse 0.5s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`,
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scaleY(0.5)' },
                      '50%': { transform: 'scaleY(1)' },
                    },
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
              {formatTime(recordingDuration)}
            </Typography>
            <Typography variant="caption" color="primary" sx={{ ml: 1 }}>
              {isRecording ? 'Recording voice message...' : 'Listening...'}
            </Typography>
            <IconButton size="small" onClick={isRecording ? stopRecording : handleVoiceTypingClick} sx={{ ml: 'auto' }}>
              <StopIcon color="error" />
            </IconButton>
          </Box>
        )}

        {/* Audio Player (when recorded) */}
        {recordedAudio && !showWaveform && (
          <Box
            sx={{
              px: 2,
              py: 1.5,
              backgroundColor: 'rgba(25, 118, 210, 0.05)',
              borderTop: '1px solid rgba(25, 118, 210, 0.1)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: 'white',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
              }}
            >
              <AudioFileIcon color="primary" />

              <IconButton size="small" onClick={handlePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>

              <Box sx={{ flex: 1, px: 1 }}>
                <Slider
                  size="small"
                  value={currentTime}
                  max={recordedAudio.duration || 100}
                  onChange={handleSeek}
                  sx={{
                    color: 'primary.main',
                    '& .MuiSlider-thumb': {
                      width: 12,
                      height: 12,
                    },
                  }}
                />
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
                {formatTime(currentTime)} / {formatTime(recordedAudio.duration)}
              </Typography>

              <Tooltip title="Delete recording">
                <IconButton size="small" onClick={handleDeleteAudio}>
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}

        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
            py: 1,
            borderTop: '1px solid #e0e0e0',
            backgroundColor: '#f8f9fa',
          }}
        >
          {/* Left Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* Microphone - Voice Message */}
            <Tooltip title={isRecording ? 'Stop Recording' : 'Record Voice Message'}>
              <IconButton
                onClick={handleMicClick}
                disabled={!!recordedAudio}
                sx={{
                  color: isRecording ? 'error.main' : recordedAudio ? 'success.main' : 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {isRecording ? <MicIcon /> : recordedAudio ? <CheckCircleIcon /> : <MicNoneIcon />}
              </IconButton>
            </Tooltip>

            {/* Attachment */}
            <Tooltip title="Attach File">
              <IconButton
                onClick={handleAttachmentClick}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <AttachFileIcon />
              </IconButton>
            </Tooltip>

            {/* Image */}
            <Tooltip title="Upload Image">
              <IconButton
                onClick={handleImageClick}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <ImageIcon />
              </IconButton>
            </Tooltip>

            {/* Voice Typing */}
            <Tooltip title={isVoiceTyping ? 'Stop Voice Typing' : 'Voice Typing'}>
              <IconButton
                onClick={handleVoiceTypingClick}
                sx={{
                  color: isVoiceTyping ? 'primary.main' : 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <KeyboardVoiceIcon />
              </IconButton>
            </Tooltip>

            {/* Video Input */}
            <Tooltip title="Upload Video">
              <IconButton
                onClick={handleVideoClick}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <VideocamIcon />
              </IconButton>
            </Tooltip>

            {/* Share Screen */}
            <Tooltip title="Share Screen">
              <IconButton
                onClick={handleScreenShareClick}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <ScreenShareIcon />
              </IconButton>
            </Tooltip>

            {/* Agent */}
            <Tooltip title="Select Agent">
              <IconButton
                onClick={handleAgentClick}
                sx={{
                  color: selectedAgent ? selectedAgent.color : 'text.secondary',
                  '&:hover': { color: selectedAgent ? selectedAgent.color : 'primary.main' },
                }}
              >
                <SmartToyIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Send Button */}
          <IconButton
            onClick={handleSend}
            disabled={!searchQuery.trim() && !recordedAudio}
            sx={{
              backgroundColor: searchQuery.trim() || recordedAudio ? 'primary.main' : 'grey.300',
              color: 'white',
              '&:hover': {
                backgroundColor: searchQuery.trim() || recordedAudio ? 'primary.dark' : 'grey.300',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Agent Selection Popover */}
      <Popover
        open={isAgentMenuOpen}
        anchorEl={agentAnchorEl}
        onClose={handleAgentClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, minWidth: 280 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Select an Agent
          </Typography>
          <List dense>
            {agents.map((agent) => (
              <ListItem key={agent.id} disablePadding>
                <ListItemButton onClick={() => handleAgentSelect(agent)}>
                  <ListItemIcon>
                    <agent.icon sx={{ color: agent.color }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={agent.name}
                    secondary={agent.description}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      {/* Attachment Dialog */}
      <Dialog open={attachmentDialogOpen} onClose={() => setAttachmentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Attach Files
            <IconButton onClick={() => setAttachmentDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <DescriptionIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Drop files here or click to browse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supports documents, PDFs, and more
            </Typography>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple
              onChange={handleFileSelect}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAttachmentDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Upload Images
            <IconButton onClick={() => setImageDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'success.main',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => imageInputRef.current?.click()}
          >
            <PhotoLibraryIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Drop images here or click to browse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supports JPG, PNG, GIF, WebP
            </Typography>
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              multiple
              onChange={handleImageSelect}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Upload Video
            <IconButton onClick={() => setVideoDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'error.main',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => videoInputRef.current?.click()}
          >
            <VideocamIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Drop video here or click to browse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supports MP4, WebM, MOV up to 100MB
            </Typography>
            <input
              type="file"
              ref={videoInputRef}
              style={{ display: 'none' }}
              accept="video/*"
              onChange={handleVideoSelect}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Screen Share Dialog */}
      <Dialog open={screenShareDialogOpen} onClose={() => setScreenShareDialogOpen(false)} maxWidth="xs">
        <DialogTitle>Screen Sharing</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Screen sharing started!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose what to share in your browser dialog
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScreenShareDialogOpen(false)} color="error">
            Stop Sharing
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
