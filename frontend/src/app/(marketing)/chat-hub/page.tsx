'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, Typography, TextField, InputAdornment, Chip, Skeleton,
  IconButton, Divider, useMediaQuery, useTheme, Drawer, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import {
  useCreateSessionMutation, useSendMessageMutation,
  useGetQuickActionsQuery, useGetWelcomeCardsQuery,
  useGetSuggestionChipsQuery, useGetPromptSuggestionsQuery,
  ChatMessage, ChatSession,
} from '@/appstore/api/chatApi';
import { useGetMarketplaceModelsQuery, ModelCard } from '@/appstore/api/modelsApi';
import ChatInputBar from '@/shared/components/ChatInputBar';

// ─── model list item ──────────────────────────────────────────────────────────

function ModelListItem({ model, selected, onClick }: {
  model: ModelCard; selected: boolean; onClick: () => void;
}) {
  return (
    <Box onClick={onClick} sx={{
      display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1,
      cursor: 'pointer', borderRadius: 2, mx: 1,
      bgcolor: selected ? '#eef2ff' : 'transparent',
      '&:hover': { bgcolor: selected ? '#eef2ff' : '#f8fafc' },
      transition: 'background 0.15s',
    }}>
      {model.iconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={model.iconUrl} alt={model.name} width={28} height={28}
          style={{ borderRadius: 6, objectFit: 'contain', flexShrink: 0 }} />
      ) : (
        <Box sx={{ width: 28, height: 28, borderRadius: 1.5, bgcolor: '#eef2ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <SmartToyIcon sx={{ fontSize: 16, color: '#6366f1' }} />
        </Box>
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {model.name}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: 11 }}>
          • {model.provider}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── chat bubble ─────────────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <Box sx={{
      display: 'flex', gap: 1.5, mb: 2,
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
    }}>
      <Box sx={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        bgcolor: isUser ? '#6366f1' : '#f8fafc',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isUser
          ? <PersonIcon sx={{ fontSize: 18, color: '#fff' }} />
          : <SmartToyIcon sx={{ fontSize: 18, color: '#6366f1' }} />
        }
      </Box>
      <Box sx={{
        maxWidth: '75%',
        bgcolor: isUser ? '#6366f1' : '#fff',
        color: isUser ? '#fff' : 'text.primary',
        border: isUser ? 'none' : '1px solid #e2e8f0',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        px: 2, py: 1.2,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {msg.content}
        </Typography>
        <Typography variant="caption" sx={{
          display: 'block', mt: 0.5, opacity: 0.6, fontSize: 10,
          textAlign: isUser ? 'right' : 'left',
        }}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
      <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f8fafc',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <SmartToyIcon sx={{ fontSize: 18, color: '#6366f1' }} />
      </Box>
      <Box sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px 18px 18px 4px',
        px: 2, py: 1.5, display: 'flex', gap: 0.5, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <Box key={i} sx={{
            width: 7, height: 7, borderRadius: '50%', bgcolor: '#6366f1',
            animation: 'typingDot 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
            '@keyframes typingDot': { '0%,60%,100%': { opacity: 0.3, transform: 'scale(0.8)' }, '30%': { opacity: 1, transform: 'scale(1)' } },
          }} />
        ))}
      </Box>
    </Box>
  );
}

// ─── welcome screen ───────────────────────────────────────────────────────────

function WelcomeScreen({ onCardClick, onSuggestionClick, selectedChip, onChipClick }: {
  onCardClick: (title: string) => void;
  onSuggestionClick: (text: string) => void;
  selectedChip: string;
  onChipClick: (label: string) => void;
}) {
  const { data: cards = [] } = useGetWelcomeCardsQuery();
  const { data: chips = [] } = useGetSuggestionChipsQuery();
  const { data: suggestions = [] } = useGetPromptSuggestionsQuery({ category: selectedChip === 'Use cases' ? 'Use cases' : undefined });

  const leftSuggestions  = suggestions.filter(s => s.column === 'left');
  const rightSuggestions = suggestions.filter(s => s.column === 'right');

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', px: { xs: 2, md: 4 }, py: 4 }}>
      {/* welcome card */}
      <Box sx={{ width: '100%', maxWidth: 640, bgcolor: '#fff', borderRadius: 4,
        border: '1px solid #e2e8f0', p: { xs: 3, md: 4 }, mb: 3, textAlign: 'center',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#eef2ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <SmartToyIcon sx={{ color: '#6366f1', fontSize: 26 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Welcome! I'm here to help you 👋
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
          No tech background needed. Tell me what you'd like to{' '}
          <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>achieve</Box>
          {' '}— I'll help you discover what's possible, step by step.
        </Typography>

        {/* what would you like to do */}
        <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
            <Typography sx={{ fontSize: 14 }}>🔥</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5 }}>
              WHAT WOULD YOU LIKE TO DO TODAY?
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
            {cards.length === 0
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} variant="rounded" height={72} sx={{ borderRadius: 2 }} />)
              : cards.map(card => (
                  <Box key={card.id} onClick={() => onCardClick(card.title)}
                    sx={{ border: '1px solid #e2e8f0', borderRadius: 2, p: 1.5, cursor: 'pointer',
                      textAlign: 'center', transition: 'all 0.15s',
                      '&:hover': { bgcolor: '#f0f4ff', borderColor: '#6366f1' } }}>
                    <Typography sx={{ fontSize: 22, mb: 0.3 }}>{card.emoji}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: 10 }}>
                      {card.subtitle}
                    </Typography>
                  </Box>
                ))
            }
          </Box>
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 2 }}>
            Or type anything below — there are no wrong answers ↓
          </Typography>
        </Box>
      </Box>

      {/* suggestion chips */}
      <Box sx={{ width: '100%', maxWidth: 640, display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {chips.map(chip => (
          <Chip key={chip.id} label={chip.label} size="small" onClick={() => onChipClick(chip.label)}
            sx={{
              cursor: 'pointer', fontWeight: 600, fontSize: 12,
              bgcolor: selectedChip === chip.label ? '#0f172a' : 'transparent',
              color: selectedChip === chip.label ? '#fff' : 'text.secondary',
              border: selectedChip === chip.label ? 'none' : '1px solid #e2e8f0',
            }} />
        ))}
      </Box>

      {/* prompt suggestions */}
      <Box sx={{ width: '100%', maxWidth: 640, display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
        {[...leftSuggestions, ...rightSuggestions].map(s => (
          <Box key={s.id} onClick={() => onSuggestionClick(s.text)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1,
              borderRadius: 2, cursor: 'pointer', bgcolor: 'transparent',
              '&:hover': { bgcolor: '#f0f4ff' }, transition: 'background 0.15s' }}>
            <Typography sx={{ color: '#6366f1', fontSize: 14, flexShrink: 0 }}>•</Typography>
            <Typography variant="caption" sx={{ lineHeight: 1.4 }}>{s.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── right sidebar ────────────────────────────────────────────────────────────

function RightSidebar() {
  const { data: actions = [], isLoading } = useGetQuickActionsQuery();
  const groups = actions.reduce<Record<string, typeof actions>>((acc, a) => {
    if (!acc[a.group]) acc[a.group] = [];
    acc[a.group].push(a);
    return acc;
  }, {});

  return (
    <Box sx={{ width: 220, flexShrink: 0, overflowY: 'auto', p: 2 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary',
        letterSpacing: 0.8, display: 'block', mb: 1.5 }}>
        QUICK ACTIONS
      </Typography>
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} height={28} sx={{ mb: 0.5 }} />)
        : Object.entries(groups).map(([group, items]) => (
            <Box key={group} sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled',
                letterSpacing: 0.5, display: 'block', mb: 0.8, fontSize: 10 }}>
                {group.toUpperCase()}
              </Typography>
              {items.map(item => (
                <Box key={item.id} sx={{
                  display: 'flex', alignItems: 'center', gap: 1, py: 0.6, px: 1,
                  borderRadius: 1.5, cursor: 'pointer',
                  '&:hover': { bgcolor: '#f0f4ff' }, transition: 'background 0.15s',
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#6366f1', flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ fontSize: 12 }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>
          ))
      }
    </Box>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ChatHubPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // model list
  const [modelSearch, setModelSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelCard | null>(null);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const { data: modelsData, isLoading: modelsLoading } = useGetMarketplaceModelsQuery({
    page: 1, limit: 100, search: modelSearch || undefined,
  });
  const models = modelsData?.data ?? [];

  // chat state
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChip, setSelectedChip] = useState('Use cases');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [createSession] = useCreateSessionMutation();
  const [sendMessage]   = useSendMessageMutation();

  // auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // start/switch session when model changes
  const startSession = useCallback(async (model: ModelCard) => {
    setSelectedModel(model);
    setMessages([]);
    setIsTyping(false);
    try {
      const s = await createSession({ modelId: model.id, modelName: model.name }).unwrap();
      setSession(s);
    } catch {
      // create a local session fallback
      setSession({ id: `local-${Date.now()}`, modelId: model.id, modelName: model.name, messages: [], createdAt: new Date().toISOString() });
    }
    if (isMobile) setLeftOpen(false);
  }, [createSession, isMobile]);

  const handleSend = useCallback(async ({ text }: { text: string }) => {
    if (!text.trim()) return;

    // ensure session exists
    let activeSession = session;
    if (!activeSession) {
      const model = selectedModel ?? models[0];
      if (!model) return;
      try {
        activeSession = await createSession({ modelId: model.id, modelName: model.name }).unwrap();
        setSession(activeSession);
        setSelectedModel(model);
      } catch {
        activeSession = { id: `local-${Date.now()}`, modelId: 1, modelName: 'GPT-5', messages: [], createdAt: new Date().toISOString() };
        setSession(activeSession);
      }
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const result = await sendMessage({ sessionId: activeSession.id, content: text }).unwrap();
      setIsTyping(false);
      setMessages(prev => [...prev, result.reply]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `e-${Date.now()}`, role: 'assistant',
        content: "I'm sorry, I couldn't process that request. Please try again.",
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [session, selectedModel, models, createSession, sendMessage]);

  const handleWelcomeCard = (title: string) => handleSend({ text: `I want to ${title.toLowerCase()}` });
  const handleSuggestion  = (text: string)  => handleSend({ text });

  const showWelcome = messages.length === 0;

  // ── model search debounce ──────────────────────────────────────────────────
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(modelSearch), 350);
    return () => clearTimeout(t);
  }, [modelSearch]);

  const leftPanel = (
    <Box sx={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column',
      borderRight: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
      <Box sx={{ p: 1.5, borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary',
          letterSpacing: 0.5, display: 'block', mb: 1 }}>MODELS</Typography>
        <TextField size="small" fullWidth
          placeholder={`Search ${modelsData?.total ?? 0} models...`}
          value={modelSearch}
          onChange={e => setModelSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></InputAdornment>,
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
        />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        {modelsLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, px: 2, py: 1, alignItems: 'center' }}>
                <Skeleton variant="rounded" width={28} height={28} />
                <Box sx={{ flex: 1 }}><Skeleton width="70%" height={14} /><Skeleton width="50%" height={12} /></Box>
              </Box>
            ))
          : models.map(m => (
              <ModelListItem key={m.id} model={m}
                selected={selectedModel?.id === m.id}
                onClick={() => startSession(m)} />
            ))
        }
      </Box>
    </Box>
  );

  const rightPanel = <RightSidebar />;

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden', bgcolor: '#f1f5f9' }}>

      {/* ── left: model list (desktop) ── */}
      {!isMobile && leftPanel}

      {/* ── left drawer (mobile) ── */}
      <Drawer anchor="left" open={leftOpen} onClose={() => setLeftOpen(false)}
        PaperProps={{ sx: { width: 220 } }}>
        {leftPanel}
      </Drawer>

      {/* ── center: chat ── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>

        {/* mobile top bar */}
        {isMobile && (
          <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 2, py: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton size="small" onClick={() => setLeftOpen(true)}><MenuIcon /></IconButton>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {selectedModel?.name ?? 'Chat Hub'}
            </Typography>
            <IconButton size="small" onClick={() => setRightOpen(true)}><MenuIcon sx={{ transform: 'scaleX(-1)' }} /></IconButton>
          </Box>
        )}

        {/* model indicator bar */}
        {selectedModel && (
          <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 3, py: 0.8,
            display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon sx={{ fontSize: 16, color: '#6366f1' }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{selectedModel.name}</Typography>
            <Typography variant="caption" color="text.disabled">· {selectedModel.provider}</Typography>
          </Box>
        )}

        {/* messages / welcome */}
        {showWelcome ? (
          <WelcomeScreen
            onCardClick={handleWelcomeCard}
            onSuggestionClick={handleSuggestion}
            selectedChip={selectedChip}
            onChipClick={setSelectedChip}
          />
        ) : (
          <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
            {messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </Box>
        )}

        {/* input bar */}
        <Box sx={{ px: { xs: 1, md: 3 }, py: 2, bgcolor: 'transparent' }}>
          {/* model label above input */}
          {selectedModel && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5, pr: 1 }}>
              <Chip label={selectedModel.name} size="small"
                sx={{ height: 20, fontSize: 11, bgcolor: '#eef2ff', color: '#6366f1', border: 'none', fontWeight: 600 }} />
            </Box>
          )}
          <ChatInputBar
            placeholder="Describe your project, ask a question, or just say hi — I'm here to help..."
            sendLabel={selectedModel?.name}
            elevation={2}
            maxWidth="100%"
            onSend={handleSend}
          />
        </Box>
      </Box>

      {/* ── right: quick actions (desktop) ── */}
      {!isTablet && (
        <Box sx={{ borderLeft: '1px solid #e2e8f0', bgcolor: '#fff' }}>
          {rightPanel}
        </Box>
      )}

      {/* ── right drawer (tablet/mobile) ── */}
      <Drawer anchor="right" open={rightOpen} onClose={() => setRightOpen(false)}
        PaperProps={{ sx: { width: 240 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton size="small" onClick={() => setRightOpen(false)}><CloseIcon /></IconButton>
        </Box>
        {rightPanel}
      </Drawer>
    </Box>
  );
}
