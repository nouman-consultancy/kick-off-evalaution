import { baseApi } from './baseApi';

export interface ResearchPaper {
  id: number;
  title: string;
  source: string;
  sourceLabel?: string;
  sourceLabelColor?: string;
  arxivId?: string;
  authors?: string;
  date: string;
  overview: string;
  keyFindings: string[];
  modelsReferenced: string[];
  stats?: { label: string; value: string }[];
  tags: string[];
  isOpenWeights?: boolean;
}

export interface ResearchFeedResponse {
  data: ResearchPaper[];
  total: number;
  weekCount: number;
}

export interface ResearchFeedFilters {
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface TransformedResponse<T> {
  data: T;
  timestamp: string;
}

const researchFeedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResearchFeed: builder.query<ResearchFeedResponse, ResearchFeedFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.tag && filters.tag !== 'All') params.set('tag', filters.tag);
        if (filters.search) params.set('search', filters.search);
        if (filters.page) params.set('page', String(filters.page));
        if (filters.limit) params.set('limit', String(filters.limit));
        return `/research-feed?${params.toString()}`;
      },
      transformResponse: (res: TransformedResponse<ResearchFeedResponse>) => res.data,
    }),
    getResearchPaper: builder.query<ResearchPaper, number>({
      query: (id) => `/research-feed/${id}`,
      transformResponse: (res: TransformedResponse<ResearchPaper>) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetResearchFeedQuery, useGetResearchPaperQuery } = researchFeedApi;
