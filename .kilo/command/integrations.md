# Integration

## API Integration Standard

When integrating any API-driven UI in the frontend:

1. Always handle loading state with `CommonLoadingState`.
2. Always handle error state with `CommonErrorState`.
3. Always handle empty/no data state with `CommonNoDataState`.
4. Do not ship API UI without all three states.

## Components To Use

- `frontend/src/shared/components/CommonLoadingState.tsx`
- `frontend/src/shared/components/CommonErrorState.tsx`
- `frontend/src/shared/components/CommonNoDataState.tsx`

## Expected Pattern

For every query integration:

- show loading component when request is pending/fetching
- show error component when request fails
- show no-data component when request succeeds but list/result is empty
- render actual UI only when data exists
