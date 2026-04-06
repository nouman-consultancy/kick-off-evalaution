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

export const modelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<PaginatedModelsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 8 }) => `/models?page=${page}&limit=${limit}`,
      providesTags: ['Models'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetModelsQuery } = modelsApi;
