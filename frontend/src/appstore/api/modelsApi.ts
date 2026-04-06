import { baseApi } from './baseApi';

export interface ModelCard {
  id: number;
  name: string;
  provider: string;
  description?: string;
  contextInput?: string;
  output?: string;
  multimodal?: boolean;
  speed?: string;
  bestFor?: string;
  contextLimit?: number;
  maxOutputTokens?: number;
  iconUrl?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  pricePerMToken?: string;
  badge?: 'Hot' | 'New';
}

export interface PaginatedModelsResponse {
  data: ModelCard[];
  total: number;
}

export interface MarketplaceFilters {
  page?: number;
  limit?: number;
  search?: string;
  providers?: string[];
  tags?: string[];
  category?: string;
  minRating?: number;
  maxPrice?: number;
  pricingModel?: string[];
}

export interface ComparisonModel {
  name: string;
  provider: string;
  contextInput?: string;
  inputPrice?: string;
  outputPrice?: string;
  multimodal?: boolean;
  speed?: string;
  bestFor?: string;
  iconUrl?: string;
}

interface TransformedResponse<T> {
  data: T;
  timestamp: string;
}

export const modelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<PaginatedModelsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 8 }) => `/models?page=${page}&limit=${limit}`,
      transformResponse: (response: TransformedResponse<PaginatedModelsResponse>) => response.data,
      providesTags: ['Models'],
    }),
    getAllModels: builder.query<ModelCard[], void>({
      query: () => `/models?page=1&limit=1000`,
      transformResponse: (response: TransformedResponse<PaginatedModelsResponse>) => response.data.data,
      providesTags: ['Models'],
    }),
    getMarketplaceModels: builder.query<PaginatedModelsResponse, MarketplaceFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        params.set('page', String(filters.page ?? 1));
        params.set('limit', String(filters.limit ?? 12));
        if (filters.search) params.set('search', filters.search);
        if (filters.providers?.length) params.set('providers', filters.providers.join(','));
        if (filters.tags?.length) params.set('tags', filters.tags.join(','));
        if (filters.category && filters.category !== 'All') params.set('category', filters.category);
        if (filters.minRating) params.set('minRating', String(filters.minRating));
        if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
        if (filters.pricingModel?.length) params.set('pricingModel', filters.pricingModel.join(','));
        return `/models?${params.toString()}`;
      },
      transformResponse: (response: TransformedResponse<PaginatedModelsResponse>) => response.data,
      providesTags: ['Models'],
    }),
    getComparisonModels: builder.query<ComparisonModel[], void>({
      query: () => '/models/comparison',
      transformResponse: (response: TransformedResponse<ComparisonModel[]>) => response.data,
      providesTags: ['Models'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetModelsQuery, useGetAllModelsQuery, useGetMarketplaceModelsQuery, useGetComparisonModelsQuery } = modelsApi;
