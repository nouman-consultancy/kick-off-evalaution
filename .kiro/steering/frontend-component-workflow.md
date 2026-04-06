---
name: Frontend Component Development Workflow
description: Step-by-step orchestration guide for creating React components with Material-UI and API integration using the frontend-component-generator agent
inclusion: manual
tags: [frontend, react, components, workflow, planning]
---

# Frontend Component Development Workflow

This workflow guides you through creating production-ready React components with Material-UI design and RTK Query API integration.

## Prerequisites

Before starting:
- [ ] Backend module is running
- [ ] API integration file exists (`frontend/src/appstore/api/[entity]Api.ts`)
- [ ] You have a clear design/mockup of the component
- [ ] You know which API endpoints to use

## Planning Phase

### 1. Define Component Type

Choose the type of component you need:

**Component Types**:
- [ ] **List/Grid Page** - Display collection of items with pagination, filters, search
- [ ] **Form Component** - Create or edit forms with validation
- [ ] **Detail Page** - Show single item details with actions
- [ ] **Dashboard Widget** - Smaller reusable component for dashboards
- [ ] **Feature Page** - Complete page with multiple sections

### 2. Define Component Location

Determine where the component should live:

**Page Components** (full pages):
- `frontend/src/app/(marketing)/[feature]/page.tsx` - Public/marketing pages
- `frontend/src/app/(dashboard)/[feature]/page.tsx` - Protected dashboard pages
- `frontend/src/app/(auth)/[feature]/page.tsx` - Authentication pages

**Feature Components** (reusable within a feature):
- `frontend/src/features/[feature]/components/[component-name].tsx`

**Shared Components** (reusable across features):
- `frontend/src/shared/components/[component-name].tsx`

### 3. Identify Required API Hooks

List the RTK Query hooks you'll need:

**For List Pages**:
- [ ] `useGet[Entity]sQuery` - Fetch paginated list

**For Forms**:
- [ ] `useCreate[Entity]Mutation` - Create new item
- [ ] `useUpdate[Entity]Mutation` - Update existing item

**For Detail Pages**:
- [ ] `useGet[Entity]ByIdQuery` - Fetch single item
- [ ] `useUpdate[Entity]Mutation` - Update item
- [ ] `useDelete[Entity]Mutation` - Delete item

### 4. Plan Component Features

**For List Pages**:
- [ ] Pagination (page, limit)
- [ ] Search functionality
- [ ] Filters (category, status, etc.)
- [ ] Sorting options
- [ ] Loading state (Skeleton)
- [ ] Error state (CommonErrorState)
- [ ] Empty state (CommonNoDataState)
- [ ] Responsive grid layout

**For Forms**:
- [ ] Form fields with validation
- [ ] Error messages
- [ ] Loading state during submission
- [ ] Success feedback
- [ ] Cancel/back button
- [ ] Form reset after success

**For Detail Pages**:
- [ ] Display all entity fields
- [ ] Edit button
- [ ] Delete button with confirmation
- [ ] Back navigation
- [ ] Loading state
- [ ] Error handling

### 5. Design Validation Schema (For Forms)

Define validation rules using yup:

```typescript
const [entity]Schema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: yup.string()
    .email('Invalid email')
    .required('Email is required'),
  description: yup.string()
    .required('Description is required'),
  // Add more fields
});
```

## Execution Phase

### Step 1: Invoke the Agent

Use the frontend-component-generator agent:

**For List Page**:
```
@frontend-component-generator Create a [entity] list page
```

**For Form**:
```
@frontend-component-generator Create a [entity] form component
```

**For Detail Page**:
```
@frontend-component-generator Create a [entity] detail page
```

Example:
```
@frontend-component-generator Create a products list page with search and category filters
```

The agent will:
1. Ask clarifying questions
2. Check for API integration file
3. Generate complete component code
4. Include all three states (loading, error, empty)
5. Follow Material-UI design patterns

### Step 2: Review Generated Component

Check the generated component structure:

**Imports**:
```typescript
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Grid, Card, ... } from '@mui/material';
import { useGet[Entity]sQuery } from '@/appstore/api/[entity]Api';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';
```

**State Management**:
```typescript
const [search, setSearch] = useState('');
const [page, setPage] = useState(1);
const [category, setCategory] = useState('All');
```

**API Integration**:
```typescript
const { data, isLoading, isFetching, isError } = useGet[Entity]sQuery({
  page,
  limit: 12,
  search: search || undefined,
  category: category !== 'All' ? category : undefined,
});
```

**Three States Pattern** (Critical):
```typescript
{isLoading || isFetching ? (
  <CommonLoadingState count={12} itemXs={12} itemSm={6} itemMd={4} />
) : isError ? (
  <CommonErrorState
    title="Failed to load [entities]"
    description="Could not fetch [entities]. Please try again."
  />
) : items.length === 0 ? (
  <CommonNoDataState
    title="No [entities] found"
    description="Try adjusting your search or filters."
  />
) : (
  // Actual content
)}
```

### Step 3: Customize Styling

Adjust Material-UI styling to match your design:

**Common Patterns**:
```typescript
// Card styling
sx={{
  borderRadius: 3,
  border: '1px solid #e2e8f0',
  boxShadow: 'none',
  transition: 'box-shadow 0.2s',
  '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.10)' },
}}

// Button styling
sx={{
  borderRadius: 2,
  fontWeight: 700,
  bgcolor: '#6366f1',
  '&:hover': { bgcolor: '#4f46e5' },
}}

// Chip styling (active)
sx={{
  bgcolor: '#6366f1',
  color: '#fff',
  fontWeight: 600,
}}

// Chip styling (inactive)
sx={{
  bgcolor: 'transparent',
  color: 'text.secondary',
  border: '1px solid #e2e8f0',
}}
```

### Step 4: Add Custom Business Logic

Enhance the component with domain-specific logic:

**Debounced Search**:
```typescript
import { useDebounce } from '@/shared/hooks/use-debounce';

const [searchInput, setSearchInput] = useState('');
const debouncedSearch = useDebounce(searchInput, 400);

const { data } = useGet[Entity]sQuery({
  search: debouncedSearch || undefined,
});
```

**Filter Logic**:
```typescript
const handleCategoryChange = (category: string) => {
  setCategory(category);
  setPage(1); // Reset to first page
};
```

**Pagination**:
```typescript
const totalPages = Math.ceil((data?.total ?? 0) / limit);

<Button
  disabled={page === 1}
  onClick={() => setPage(p => p - 1)}
>
  Previous
</Button>
<Button
  disabled={page >= totalPages}
  onClick={() => setPage(p => p + 1)}
>
  Next
</Button>
```

### Step 5: Add Form Validation (For Forms)

Ensure proper validation with react-hook-form and yup:

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<[Entity]FormData>({
  resolver: yupResolver([entity]Schema),
});

const onSubmit = async (data: [Entity]FormData) => {
  try {
    await create[Entity](data).unwrap();
    reset();
    // Show success message or redirect
  } catch (err: any) {
    setError(err.data?.message || 'Failed to create [entity]');
  }
};
```

### Step 6: Add Navigation

Implement proper routing:

```typescript
const router = useRouter();

// Navigate to detail page
onClick={() => router.push(`/[entities]/${item.id}`)}

// Navigate to edit page
onClick={() => router.push(`/[entities]/${item.id}/edit`)}

// Go back
onClick={() => router.back()}
```

### Step 7: Make Responsive

Add responsive design with Material-UI breakpoints:

```typescript
import { useMediaQuery, useTheme } from '@mui/material';

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// Conditional rendering
{isMobile ? (
  <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
    {/* Mobile sidebar */}
  </Drawer>
) : (
  <Box sx={{ width: 240 }}>
    {/* Desktop sidebar */}
  </Box>
)}

// Responsive grid
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    {/* Item */}
  </Grid>
</Grid>
```

## Verification Phase

### Step 1: Run Diagnostics

Check for TypeScript errors:

```
Run getDiagnostics on the component file
```

Fix any type errors or import issues.

### Step 2: Test Component Locally

Start the frontend development server:

```bash
cd frontend
npm run dev
```

Navigate to the component route and test:

**For List Pages**:
- [ ] Items display correctly
- [ ] Loading state shows Skeleton
- [ ] Error state shows when backend is down
- [ ] Empty state shows when no data
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works
- [ ] Responsive on mobile

**For Forms**:
- [ ] All fields render
- [ ] Validation works (try submitting empty)
- [ ] Error messages display
- [ ] Submit button shows loading state
- [ ] Success message appears
- [ ] Form resets after success

**For Detail Pages**:
- [ ] Data displays correctly
- [ ] Edit button navigates properly
- [ ] Delete button shows confirmation
- [ ] Back button works
- [ ] Loading state shows while fetching

### Step 3: Test with Real Data

Ensure backend is running and test with actual API data:

- [ ] Data matches backend response
- [ ] Pagination numbers are correct
- [ ] Filters return expected results
- [ ] Create/update/delete operations work

### Step 4: Test Error Scenarios

Simulate errors to verify error handling:

- [ ] Stop backend → Error state shows
- [ ] Invalid ID → 404 error handled
- [ ] Network timeout → Error message
- [ ] Validation errors → Field-level errors

### Step 5: Test Accessibility

Basic accessibility checks:

- [ ] Keyboard navigation works
- [ ] Form labels are present
- [ ] Error messages are announced
- [ ] Focus states are visible
- [ ] Color contrast is sufficient

## Common Issues & Solutions

### Issue: `data.map is not a function`
**Solution**: Check API integration has proper `transformResponse`

### Issue: Infinite re-renders
**Solution**: Wrap callbacks in `useCallback`, memoize expensive computations

### Issue: Form doesn't reset
**Solution**: Call `reset()` after successful submission

### Issue: Pagination doesn't work
**Solution**: Ensure `page` state updates trigger new API call

### Issue: Filters not applying
**Solution**: Check query parameters are passed correctly to API hook

### Issue: Loading state flickers
**Solution**: Use both `isLoading` and `isFetching` flags

### Issue: Mobile layout broken
**Solution**: Test responsive breakpoints, use `useMediaQuery`

## Best Practices

### 1. State Management
- Use local `useState` for UI state (search, filters, modals)
- Use RTK Query for server state (data fetching)
- Don't duplicate server state in local state

### 2. Performance
- Debounce search inputs (400ms)
- Use `useCallback` for event handlers passed as props
- Memoize expensive computations with `useMemo`
- Implement virtual scrolling for large lists

### 3. Error Handling
- Always show user-friendly error messages
- Use CommonErrorState for API errors
- Show field-level errors for forms
- Log errors to console for debugging

### 4. Loading States
- Use Skeleton components for better UX
- Show loading on buttons during mutations
- Disable form during submission
- Show progress indicators for long operations

### 5. Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

### 6. Code Organization
- Extract sub-components for reusability
- Keep components focused (single responsibility)
- Use TypeScript strictly
- Add comments for complex logic

## Next Steps

After completing the component:

1. **Add to Navigation**: Update header/sidebar with link to new page
2. **Add Tests**: Write unit tests for component logic
3. **Optimize Performance**: Profile and optimize if needed
4. **Document**: Add JSDoc comments for complex components
5. **Review**: Get code review from team

## Checklist Summary

- [ ] Component type defined
- [ ] Component location determined
- [ ] Required API hooks identified
- [ ] Component features planned
- [ ] Validation schema defined (for forms)
- [ ] Component generated using agent
- [ ] Generated code reviewed
- [ ] Styling customized
- [ ] Business logic added
- [ ] Form validation implemented (if applicable)
- [ ] Navigation added
- [ ] Responsive design implemented
- [ ] Diagnostics run and errors fixed
- [ ] Component tested locally
- [ ] Real data tested
- [ ] Error scenarios tested
- [ ] Accessibility checked
- [ ] Added to navigation
- [ ] Ready for code review

---

**Estimated Time**: 20-45 minutes (depending on complexity)

**Difficulty**: Intermediate

**Related Workflows**:
- Backend Module Development Workflow
- Frontend API Integration Workflow
- Full-Stack Feature Workflow
