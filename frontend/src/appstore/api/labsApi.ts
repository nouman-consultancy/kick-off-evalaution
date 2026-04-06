import { baseApi } from './baseApi';

export interface Lab {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  isActive?: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedLabsResponse {
  data: Lab[];
  total: number;
}

// The transform interceptor wraps all responses: { data: <payload>, timestamp }
interface TransformedResponse {
  data: PaginatedLabsResponse;
  timestamp: string;
}

export const labsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLabs: builder.query<PaginatedLabsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/labs?page=${page}&limit=${limit}`,
      transformResponse: (response: TransformedResponse) => response.data,
      providesTags: ['Labs'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetLabsQuery } = labsApi;
