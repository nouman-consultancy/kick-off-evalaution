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
}

export interface PaginatedModelsResponse {
  data: ModelCard[];
  total: number;
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
  }),
  overrideExisting: false,
});

export const { useGetModelsQuery, useGetAllModelsQuery } = modelsApi;
