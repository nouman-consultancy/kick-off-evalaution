---
name: Full-Stack Feature Development Workflow
description: Complete end-to-end orchestration guide for building full-stack features from backend to frontend, coordinating all three specialized agents
inclusion: manual
tags: [fullstack, workflow, planning, orchestration, e2e]
---

# Full-Stack Feature Development Workflow

This is the master workflow that orchestrates all three specialized agents to build complete full-stack features from backend to frontend in a coordinated, efficient manner.

## Overview

This workflow combines:
1. **Backend Module Development** (nestjs-module-generator)
2. **Frontend API Integration** (frontend-api-integration-generator)
3. **Frontend Component Development** (frontend-component-generator)

**Estimated Total Time**: 45-90 minutes (depending on complexity)

## Prerequisites

Before starting:
- [ ] Backend and frontend projects are set up
- [ ] Development servers can run
- [ ] You have a clear feature specification
- [ ] You understand the data model

## Phase 1: Planning & Requirements

### 1.1 Define the Feature

**Feature Name**: _________________ (e.g., "Product Catalog", "Order Management")

**Entity Name**: _________________ (singular, e.g., "product", "order")

**Feature Description**:
_____________________________________________________________________________
_____________________________________________________________________________

### 1.2 Define Data Model

**Entity Fields**:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| id | number | Yes | Auto | 1 |
| name | string | Yes | Min 3 chars | "Product Name" |
| description | string | Yes | Min 10 chars | "Description..." |
| price | number | No | Min 0 | 99.99 |
| category | string | No | - | "Electronics" |
| status | enum | No | active/inactive | "active" |
| createdAt | Date | Yes | Auto | 2024-01-01 |
| updatedAt | Date | Yes | Auto | 2024-01-01 |

### 1.3 Define API Endpoints

**Standard CRUD**:
- [ ] `POST /[entity]` - Create
- [ ] `GET /[entity]` - List (paginated)
- [ ] `GET /[entity]/:id` - Get by ID
- [ ] `PATCH /[entity]/:id` - Update
- [ ] `DELETE /[entity]/:id` - Delete

**Custom Endpoints**:
- [ ] `GET /[entity]/active` - Get active items
- [ ] `GET /[entity]/category/:category` - Filter by category
- [ ] Other: _________________

**Query Parameters**:
- [ ] `page` - Pagination page number
- [ ] `limit` - Items per page
- [ ] `search` - Text search
- [ ] `category` - Filter by category
- [ ] `status` - Filter by status
- [ ] Other: _________________

### 1.4 Define UI Components

**Components Needed**:
- [ ] List/Grid Page - Display all items
- [ ] Create Form - Add new item
- [ ] Edit Form - Update existing item
- [ ] Detail Page - View single item
- [ ] Dashboard Widget - Summary view

**UI Features**:
- [ ] Search functionality
- [ ] Category filters
- [ ] Status filters
- [ ] Pagination
- [ ] Sorting
- [ ] Bulk actions
- [ ] Export functionality

### 1.5 Define User Flow

Map out the user journey:

1. User lands on list page → Sees all items
2. User searches/filters → Results update
3. User clicks "Add New" → Opens create form
4. User fills form → Submits → Item created
5. User clicks item → Opens detail page
6. User clicks "Edit" → Opens edit form
7. User updates → Submits → Item updated
8. User clicks "Delete" → Confirms → Item deleted

## Phase 2: Backend Development

### 2.1 Generate Backend Module

**Action**: Invoke nestjs-module-generator agent

```
@nestjs-module-generator Generate a [entity-name] module with the following fields:
- name (string, required)
- description (string, required)
- price (number, optional)
- category (string, optional)
- status (enum: active/inactive, optional)
```

**Generated Files**:
- ✅ `backend/src/modules/[entity]/[entity].module.ts`
- ✅ `backend/src/modules/[entity]/[entity].controller.ts`
- ✅ `backend/src/modules/[entity]/[entity].service.ts`
- ✅ `backend/src/modules/[entity]/entities/[entity].entity.ts`
- ✅ `backend/src/modules/[entity]/dto/create-[entity].dto.ts`
- ✅ `backend/src/modules/[entity]/dto/update-[entity].dto.ts`
- ✅ `backend/src/modules/[entity]/data/[entity].seed.ts`

### 2.2 Register Module

**Action**: Import module in `backend/src/app.module.ts`

```typescript
import { [Entity]Module } from './modules/[entity]/[entity].module';

@Module({
  imports: [
    // ... existing modules
    [Entity]Module,
  ],
})
export class AppModule {}
```

### 2.3 Customize Backend

**Customize Entity** (`entities/[entity].entity.ts`):
- [ ] Add/modify fields as needed
- [ ] Add computed properties
- [ ] Add relationships

**Customize DTOs** (`dto/*.dto.ts`):
- [ ] Add validation decorators
- [ ] Add Swagger documentation
- [ ] Add transformation logic

**Customize Service** (`[entity].service.ts`):
- [ ] Add search functionality
- [ ] Add filtering logic
- [ ] Add sorting logic
- [ ] Add custom business logic

**Customize Controller** (`[entity].controller.ts`):
- [ ] Add custom endpoints
- [ ] Add query parameters
- [ ] Add Swagger documentation

**Customize Seed Data** (`data/[entity].seed.ts`):
- [ ] Add realistic sample data (8-10 items)
- [ ] Include variety for testing filters

### 2.4 Verify Backend

**Run Diagnostics**:
```
Run getDiagnostics on all backend files
```

**Start Backend**:
```bash
cd backend
npm run start:dev
```

**Test Endpoints** (use Thunder Client/Postman):
- [ ] `GET http://localhost:3001/[entity]` - Returns list
- [ ] `GET http://localhost:3001/[entity]/1` - Returns single item
- [ ] `POST http://localhost:3001/[entity]` - Creates item
- [ ] `PATCH http://localhost:3001/[entity]/1` - Updates item
- [ ] `DELETE http://localhost:3001/[entity]/1` - Deletes item

**Check Swagger**:
- [ ] Visit `http://localhost:3001/api`
- [ ] Verify all endpoints documented
- [ ] Test endpoints via Swagger UI

## Phase 3: Frontend API Integration

### 3.1 Generate API Integration

**Action**: Invoke frontend-api-integration-generator agent

```
@frontend-api-integration-generator Generate API integration for [entity-name]
```

**Generated File**:
- ✅ `frontend/src/appstore/api/[entity]Api.ts`

**Contains**:
- TypeScript interfaces matching backend
- RTK Query endpoints
- Exported hooks (useGetXQuery, useCreateXMutation, etc.)
- Proper response unwrapping

### 3.2 Register API Integration

**Add Tag Type** to `frontend/src/appstore/api/baseApi.ts`:

```typescript
tagTypes: [
  'Users',
  'Auth',
  'Models',
  'Labs',
  'Agents',
  '[Entity]',  // Add this
],
```

**Import API** in `frontend/src/appstore/index.ts` (optional):

```typescript
import './api/[entity]Api';
```

### 3.3 Verify API Integration

**Run Diagnostics**:
```
Run getDiagnostics on frontend/src/appstore/api/[entity]Api.ts
```

**Test in Browser Console**:
```javascript
// Open browser console on any page
import { store } from '@/appstore';
const result = await store.dispatch(
  [entity]Api.endpoints.get[Entity]s.initiate({ page: 1, limit: 10 })
);
console.log(result.data);
```

## Phase 4: Frontend Component Development

### 4.1 Generate List Page

**Action**: Invoke frontend-component-generator agent

```
@frontend-component-generator Create a [entity] list page with:
- Search functionality
- Category filters
- Pagination
- Grid layout with cards
```

**Generated File**:
- ✅ `frontend/src/app/(marketing)/[entity]s/page.tsx` or
- ✅ `frontend/src/app/(dashboard)/[entity]s/page.tsx`

**Includes**:
- Loading state (Skeleton)
- Error state (CommonErrorState)
- Empty state (CommonNoDataState)
- Search input
- Filter chips
- Pagination controls
- Responsive grid

### 4.2 Generate Create Form

**Action**: Invoke frontend-component-generator agent

```
@frontend-component-generator Create a [entity] create form with validation
```

**Generated File**:
- ✅ `frontend/src/features/[entity]s/components/[entity]-form.tsx`

**Includes**:
- react-hook-form integration
- yup validation schema
- Material-UI form fields
- Error handling
- Success feedback
- Loading state

### 4.3 Generate Detail Page

**Action**: Invoke frontend-component-generator agent

```
@frontend-component-generator Create a [entity] detail page with edit and delete actions
```

**Generated File**:
- ✅ `frontend/src/app/(marketing)/[entity]s/[id]/page.tsx`

**Includes**:
- Fetch single item by ID
- Display all fields
- Edit button
- Delete button with confirmation
- Back navigation
- Loading/error states

### 4.4 Customize Components

**Customize Styling**:
- [ ] Match design system colors
- [ ] Adjust spacing and layout
- [ ] Add custom icons
- [ ] Implement responsive design

**Add Business Logic**:
- [ ] Debounce search input
- [ ] Add filter combinations
- [ ] Add sorting options
- [ ] Add bulk actions

**Enhance UX**:
- [ ] Add loading indicators
- [ ] Add success toasts
- [ ] Add error messages
- [ ] Add confirmation dialogs

### 4.5 Verify Components

**Run Diagnostics**:
```
Run getDiagnostics on all component files
```

**Start Frontend**:
```bash
cd frontend
npm run dev
```

**Test Each Component**:

**List Page** (`http://localhost:3000/[entity]s`):
- [ ] Items display correctly
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works
- [ ] Loading state shows
- [ ] Error state shows (stop backend)
- [ ] Empty state shows (clear data)
- [ ] Responsive on mobile

**Create Form**:
- [ ] All fields render
- [ ] Validation works
- [ ] Submit creates item
- [ ] Success message shows
- [ ] Form resets

**Detail Page** (`http://localhost:3000/[entity]s/1`):
- [ ] Data displays correctly
- [ ] Edit button works
- [ ] Delete button works
- [ ] Confirmation dialog shows
- [ ] Back button works

## Phase 5: Integration Testing

### 5.1 End-to-End Flow Test

Test the complete user journey:

1. **List Page**:
   - [ ] Navigate to list page
   - [ ] Verify seed data displays
   - [ ] Test search functionality
   - [ ] Test filters
   - [ ] Test pagination

2. **Create Flow**:
   - [ ] Click "Add New" button
   - [ ] Fill out form
   - [ ] Submit form
   - [ ] Verify success message
   - [ ] Verify item appears in list

3. **Detail Flow**:
   - [ ] Click on an item
   - [ ] Verify all data displays
   - [ ] Click edit button
   - [ ] Modify data
   - [ ] Submit changes
   - [ ] Verify updates appear

4. **Delete Flow**:
   - [ ] Click delete button
   - [ ] Confirm deletion
   - [ ] Verify item removed from list

### 5.2 Error Scenario Testing

Test error handling:

- [ ] Stop backend → Error states show
- [ ] Invalid data → Validation errors show
- [ ] Network timeout → Error message shows
- [ ] 404 errors → Handled gracefully

### 5.3 Performance Testing

Check performance:

- [ ] List page loads quickly
- [ ] Search is responsive (debounced)
- [ ] Pagination is smooth
- [ ] No unnecessary re-renders
- [ ] No memory leaks

### 5.4 Accessibility Testing

Basic accessibility checks:

- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Focus states visible
- [ ] Color contrast sufficient
- [ ] Form labels present

## Phase 6: Finalization

### 6.1 Add to Navigation

**Update Header/Sidebar**:

```typescript
// frontend/src/shared/components/Header.tsx or Sidebar.tsx
const navLinks = [
  { label: 'Home', href: '/' },
  { label: '[Entity]s', href: '/[entity]s' },
  // ... other links
];
```

### 6.2 Documentation

**Create Feature Documentation**:

```markdown
# [Entity] Feature

## Overview
Brief description of the feature

## API Endpoints
- GET /[entity] - List all
- POST /[entity] - Create
- GET /[entity]/:id - Get by ID
- PATCH /[entity]/:id - Update
- DELETE /[entity]/:id - Delete

## Frontend Routes
- /[entity]s - List page
- /[entity]s/new - Create form
- /[entity]s/:id - Detail page
- /[entity]s/:id/edit - Edit form

## Data Model
[Entity] interface with all fields

## Business Logic
Any custom logic or rules
```

### 6.3 Code Review Checklist

- [ ] All TypeScript errors resolved
- [ ] No console errors or warnings
- [ ] Code follows project conventions
- [ ] Components are properly typed
- [ ] Error handling is comprehensive
- [ ] Loading states are implemented
- [ ] Responsive design works
- [ ] Accessibility basics covered
- [ ] Code is documented
- [ ] Tests are written (if applicable)

### 6.4 Deployment Preparation

- [ ] Environment variables configured
- [ ] Backend migrations ready (if using DB)
- [ ] Frontend build succeeds
- [ ] Backend build succeeds
- [ ] API documentation updated
- [ ] README updated

## Common Issues & Solutions

### Backend Issues

**Issue**: Module not found
**Solution**: Ensure module is imported in `app.module.ts`

**Issue**: Validation not working
**Solution**: Check DTO decorators and global validation pipe

**Issue**: CORS errors
**Solution**: Configure CORS in `main.ts` to allow frontend origin

### API Integration Issues

**Issue**: `data.map is not a function`
**Solution**: Add `transformResponse` to unwrap backend envelope

**Issue**: 401 Unauthorized
**Solution**: Check auth token in `baseApi.ts` `prepareHeaders`

**Issue**: Cache not updating
**Solution**: Ensure mutations use `invalidatesTags`

### Frontend Component Issues

**Issue**: Infinite re-renders
**Solution**: Wrap callbacks in `useCallback`, check dependencies

**Issue**: Form doesn't reset
**Solution**: Call `reset()` after successful submission

**Issue**: Pagination broken
**Solution**: Ensure page state updates trigger new API call

## Success Criteria

Your feature is complete when:

- [ ] Backend module is running and tested
- [ ] All API endpoints work correctly
- [ ] Swagger documentation is complete
- [ ] Frontend API integration is working
- [ ] All components render correctly
- [ ] All three states (loading, error, empty) work
- [ ] CRUD operations work end-to-end
- [ ] Search and filters work
- [ ] Pagination works
- [ ] Error handling is comprehensive
- [ ] Responsive design works
- [ ] Basic accessibility is covered
- [ ] Feature is added to navigation
- [ ] Documentation is complete
- [ ] Code review is passed

## Time Estimates

| Phase | Estimated Time |
|-------|----------------|
| Planning & Requirements | 10-15 min |
| Backend Development | 15-25 min |
| Frontend API Integration | 10-15 min |
| Frontend Components | 20-30 min |
| Integration Testing | 10-15 min |
| Finalization | 10-15 min |
| **Total** | **75-115 min** |

## Next Steps

After completing the feature:

1. **Add Tests**: Write unit and integration tests
2. **Optimize**: Profile and optimize performance
3. **Enhance**: Add advanced features (export, bulk actions, etc.)
4. **Monitor**: Set up error tracking and analytics
5. **Iterate**: Gather feedback and improve

---

**Related Workflows**:
- Backend Module Development Workflow
- Frontend API Integration Workflow
- Frontend Component Development Workflow

**Related Skills**:
- fullstack-integration

**Related Agents**:
- nestjs-module-generator
- frontend-api-integration-generator
- frontend-component-generator
