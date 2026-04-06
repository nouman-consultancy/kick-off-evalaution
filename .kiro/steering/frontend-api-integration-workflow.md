---
name: Frontend API Integration Workflow
description: Step-by-step orchestration guide for creating frontend API integration using RTK Query with the frontend-api-integration-generator agent
inclusion: manual
tags: [frontend, api, rtk-query, workflow, planning]
---

# Frontend API Integration Workflow

This workflow guides you through creating frontend API integration files that connect your React/Next.js frontend to your NestJS backend using RTK Query.

## Prerequisites

Before starting:
- [ ] Backend module exists and is running
- [ ] Backend endpoints are tested and working
- [ ] You know the entity structure from the backend
- [ ] Frontend project is set up with RTK Query

## Planning Phase

### 1. Identify Backend Endpoints

List all endpoints you need to integrate:

**Base Route**: `/[entity]` (e.g., `/products`, `/orders`)

**Standard Endpoints**:
- [ ] `GET /[entity]?page=1&limit=10` - List with pagination
- [ ] `GET /[entity]/:id` - Get by ID
- [ ] `POST /[entity]` - Create
- [ ] `PATCH /[entity]/:id` - Update
- [ ] `DELETE /[entity]/:id` - Delete

**Custom Endpoints**:
- [ ] `GET /[entity]/active` - Get active items
- [ ] `GET /[entity]/category/:category` - Filter by category
- [ ] Other: _________________

### 2. Define Query Parameters

What filters/parameters does your API support?

**Pagination**:
- [ ] `page` (number)
- [ ] `limit` (number)

**Search/Filter**:
- [ ] `search` (string)
- [ ] `category` (string)
- [ ] `status` (string)
- [ ] Other: _________________

### 3. Map Entity Structure

Review the backend entity and map to frontend types:

**Backend Entity** → **Frontend Interface**
```typescript
// Backend: backend/src/modules/[entity]/entities/[entity].entity.ts
export interface [Entity] {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Frontend: Will become
export interface [Entity] {
  id: number;
  name: string;
  description: string;
  createdAt: string;  // Note: Date becomes string in JSON
  updatedAt: string;
}
```

### 4. Check Response Structure

Verify the backend response wrapper:

All responses are wrapped by `TransformInterceptor`:
```json
{
  "data": <actual payload>,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

For paginated responses:
```json
{
  "data": {
    "data": [<items>],
    "total": 100
  },
  "timestamp": "..."
}
```

## Execution Phase

### Step 1: Invoke the Agent

Use the frontend-api-integration-generator agent:

```
@frontend-api-integration-generator Generate API integration for [entity-name]
```

Example:
```
@frontend-api-integration-generator Generate API integration for products
```

The agent will:
1. Check if backend module exists
2. Read backend entity structure
3. Generate API integration file
4. Create TypeScript interfaces
5. Generate RTK Query endpoints
6. Export hooks

Output file: `frontend/src/appstore/api/[entity]Api.ts`

### Step 2: Review Generated Interfaces

Check the generated TypeScript interfaces:

```typescript
// Entity interface
export interface [Entity] {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Paginated response
export interface Paginated[Entity]Response {
  data: [Entity][];
  total: number;
}

// Query filters
export interface [Entity]Filters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}
```

### Step 3: Verify Response Unwrapping

Ensure all endpoints have `transformResponse` to unwrap the backend envelope:

```typescript
transformResponse: (response: { data: T; timestamp: string }) => response.data
```

**Critical**: Without this, you'll get `TypeError: x.map is not a function`

### Step 4: Add Tag Type to baseApi

Open `frontend/src/appstore/api/baseApi.ts` and add the new tag:

```typescript
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // ... auth logic
      return headers;
    },
  }),
  tagTypes: [
    'Users',
    'Auth',
    'Models',
    'Labs',
    'Agents',
    '[Entity]',  // Add your new tag here
  ],
  endpoints: () => ({}),
});
```

### Step 5: Import API in Store (Optional)

If using side-effect imports, add to `frontend/src/appstore/index.ts`:

```typescript
import './api/authApi';
import './api/modelsApi';
import './api/usersApi';
import './api/[entity]Api';  // Add this line
```

**Note**: This is optional if you're importing hooks directly in components.

### Step 6: Customize Endpoints (If Needed)

Add custom endpoints or modify query logic:

**Example: Add custom filter endpoint**
```typescript
get[Entity]ByCategory: builder.query<[Entity][], string>({
  query: (category) => `/[entity]/category/${category}`,
  transformResponse: (response: { data: [Entity][]; timestamp: string }) => response.data,
  providesTags: ['[Entity]'],
}),
```

**Example: Add complex query parameters**
```typescript
get[Entity]s: builder.query<Paginated[Entity]Response, [Entity]Filters>({
  query: (filters) => {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.search) params.set('search', filters.search);
    if (filters.category && filters.category !== 'All') {
      params.set('category', filters.category);
    }
    return `/[entity]?${params.toString()}`;
  },
  transformResponse: (response: { data: Paginated[Entity]Response; timestamp: string }) => 
    response.data,
  providesTags: ['[Entity]'],
}),
```

## Verification Phase

### Step 1: Run Diagnostics

Check for TypeScript errors:

```
Run getDiagnostics on frontend/src/appstore/api/[entity]Api.ts
```

Fix any type errors or import issues.

### Step 2: Test Hooks in Component

Create a simple test component:

```typescript
'use client';

import { useGet[Entity]sQuery } from '@/appstore/api/[entity]Api';

export default function Test[Entity]Page() {
  const { data, isLoading, isError } = useGet[Entity]sQuery({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading [entities]</div>;

  return (
    <div>
      <h1>[Entity]s: {data?.total}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### Step 3: Verify Network Requests

Open browser DevTools → Network tab:

- [ ] Request URL is correct
- [ ] Query parameters are properly formatted
- [ ] Authorization header is included (if needed)
- [ ] Response structure matches expectations

### Step 4: Test All Hooks

Test each generated hook:

**Query Hooks**:
```typescript
const { data, isLoading, isError } = useGet[Entity]sQuery({ page: 1, limit: 10 });
const { data: item } = useGet[Entity]ByIdQuery(1);
```

**Mutation Hooks**:
```typescript
const [create[Entity], { isLoading }] = useCreate[Entity]Mutation();
const [update[Entity]] = useUpdate[Entity]Mutation();
const [delete[Entity]] = useDelete[Entity]Mutation();

// Usage
await create[Entity]({ name: 'Test', description: 'Test desc' }).unwrap();
await update[Entity]({ id: 1, data: { name: 'Updated' } }).unwrap();
await delete[Entity](1).unwrap();
```

## Common Issues & Solutions

### Issue: `TypeError: data.map is not a function`
**Solution**: Missing `transformResponse` to unwrap the backend envelope

```typescript
// Wrong
query: () => '/[entity]',

// Correct
query: () => '/[entity]',
transformResponse: (response: { data: T; timestamp: string }) => response.data,
```

### Issue: 401 Unauthorized
**Solution**: Check that auth token is being added in `baseApi.ts` `prepareHeaders`

### Issue: CORS error
**Solution**: Verify backend CORS configuration allows frontend origin

### Issue: Query parameters not working
**Solution**: Use `URLSearchParams` and ensure proper encoding

```typescript
const params = new URLSearchParams();
params.set('search', searchTerm);
return `/[entity]?${params.toString()}`;
```

### Issue: Cache not invalidating
**Solution**: Ensure mutations use `invalidatesTags` and queries use `providesTags`

```typescript
// Query
providesTags: ['[Entity]'],

// Mutation
invalidatesTags: ['[Entity]'],
```

## Best Practices

### 1. Type Safety
- Always define proper TypeScript interfaces
- Match backend entity structure exactly
- Use strict typing for query parameters

### 2. Response Handling
- Always unwrap the transform interceptor envelope
- Handle paginated vs. non-paginated responses correctly
- Define separate interfaces for different response types

### 3. Query Parameters
- Use `URLSearchParams` for complex query strings
- Handle optional parameters properly
- Encode special characters

### 4. Cache Management
- Use descriptive tag names
- Invalidate tags on mutations
- Provide tags on queries for automatic refetching

### 5. Error Handling
- Let RTK Query handle loading/error states
- Use `isLoading`, `isFetching`, `isError` flags
- Handle errors in components with try/catch on `.unwrap()`

## Next Steps

After completing the API integration:

1. **Build Frontend Components**: Use `frontend-component-generator` agent
2. **Test End-to-End**: Verify data flows from backend to frontend
3. **Add Error Handling**: Implement proper error boundaries
4. **Optimize Performance**: Add caching strategies

## Checklist Summary

- [ ] Backend endpoints identified and tested
- [ ] Query parameters defined
- [ ] Entity structure mapped
- [ ] API integration file generated
- [ ] Interfaces reviewed and customized
- [ ] Response unwrapping verified
- [ ] Tag type added to baseApi.ts
- [ ] API imported in store (if needed)
- [ ] Custom endpoints added (if needed)
- [ ] Diagnostics run and errors fixed
- [ ] Hooks tested in component
- [ ] Network requests verified
- [ ] All CRUD operations tested

---

**Estimated Time**: 10-20 minutes

**Difficulty**: Beginner to Intermediate

**Related Workflows**:
- Backend Module Development Workflow
- Frontend Component Development Workflow
- Full-Stack Feature Workflow
