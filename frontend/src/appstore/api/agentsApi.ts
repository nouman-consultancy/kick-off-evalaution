import { baseApi } from './baseApi';

export interface AgentTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  models: string[];
  tools: string[];
  iconUrl?: string;
  iconEmoji?: string;
  isPopular?: boolean;
}

export interface AgentSuggestion {
  id: number;
  text: string;
  category: string;
  iconEmoji?: string;
}

export interface AgentTask {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
}

export interface MyAgent {
  id: number;
  name: string;
  model: string;
  tools: number;
  isActive: boolean;
  iconEmoji?: string;
}

export interface LibraryAgent {
  id: number;
  name: string;
  description: string;
  models: string[];
  tools: string[];
  iconEmoji?: string;
  category: string;
}

interface Wrapped<T> { data: T; timestamp: string }
interface ListResponse<T> { data: T[]; total: number }

const agentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentTemplates: builder.query<ListResponse<AgentTemplate>, { search?: string; category?: string }>({
      query: ({ search, category } = {}) => {
        const p = new URLSearchParams();
        if (search) p.set('search', search);
        if (category && category !== 'All') p.set('category', category);
        return `/agents/templates?${p.toString()}`;
      },
      transformResponse: (res: Wrapped<ListResponse<AgentTemplate>>) => res.data,
      providesTags: ['Agents'],
    }),
    getAgentSuggestions: builder.query<ListResponse<AgentSuggestion>, { category?: string }>({
      query: ({ category } = {}) => {
        const p = new URLSearchParams();
        if (category && category !== 'All') p.set('category', category);
        return `/agents/suggestions?${p.toString()}`;
      },
      transformResponse: (res: Wrapped<ListResponse<AgentSuggestion>>) => res.data,
      providesTags: ['Agents'],
    }),
    getAgentTasks: builder.query<ListResponse<AgentTask>, void>({
      query: () => '/agents/tasks',
      transformResponse: (res: Wrapped<ListResponse<AgentTask>>) => res.data,
      providesTags: ['Agents'],
    }),
    getMyAgents: builder.query<ListResponse<MyAgent>, void>({
      query: () => '/agents/my-agents',
      transformResponse: (res: Wrapped<ListResponse<MyAgent>>) => res.data,
      providesTags: ['Agents'],
    }),
    getLibraryAgents: builder.query<ListResponse<LibraryAgent>, { search?: string }>({
      query: ({ search } = {}) => `/agents/library${search ? `?search=${encodeURIComponent(search)}` : ''}`,
      transformResponse: (res: Wrapped<ListResponse<LibraryAgent>>) => res.data,
      providesTags: ['Agents'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAgentTemplatesQuery,
  useGetAgentSuggestionsQuery,
  useGetAgentTasksQuery,
  useGetMyAgentsQuery,
  useGetLibraryAgentsQuery,
} = agentsApi;
