import { baseApi } from './baseApi';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  modelId: number;
  modelName: string;
  messages: ChatMessage[];
  createdAt: string;
}

export interface QuickAction { id: number; label: string; group: string; }
export interface WelcomeCard  { id: number; emoji: string; title: string; subtitle: string; }
export interface SuggestionChip { id: number; label: string; category: string; }
export interface PromptSuggestion { id: number; text: string; category: string; column: 'left' | 'right'; }

interface W<T> { data: T; timestamp: string }

const chatApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    createSession: b.mutation<ChatSession, { modelId: number; modelName: string }>({
      query: (body) => ({ url: '/chat/session', method: 'POST', body }),
      transformResponse: (r: W<ChatSession>) => r.data,
    }),
    sendMessage: b.mutation<{ session: ChatSession; reply: ChatMessage }, { sessionId: string; content: string }>({
      query: (body) => ({ url: '/chat/message', method: 'POST', body }),
      transformResponse: (r: W<{ session: ChatSession; reply: ChatMessage }>) => r.data,
    }),
    getQuickActions: b.query<QuickAction[], void>({
      query: () => '/chat/quick-actions',
      transformResponse: (r: W<QuickAction[]>) => r.data,
    }),
    getWelcomeCards: b.query<WelcomeCard[], void>({
      query: () => '/chat/welcome-cards',
      transformResponse: (r: W<WelcomeCard[]>) => r.data,
    }),
    getSuggestionChips: b.query<SuggestionChip[], void>({
      query: () => '/chat/suggestion-chips',
      transformResponse: (r: W<SuggestionChip[]>) => r.data,
    }),
    getPromptSuggestions: b.query<PromptSuggestion[], { category?: string }>({
      query: ({ category } = {}) => `/chat/prompt-suggestions${category ? `?category=${category}` : ''}`,
      transformResponse: (r: W<PromptSuggestion[]>) => r.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSessionMutation,
  useSendMessageMutation,
  useGetQuickActionsQuery,
  useGetWelcomeCardsQuery,
  useGetSuggestionChipsQuery,
  useGetPromptSuggestionsQuery,
} = chatApi;
