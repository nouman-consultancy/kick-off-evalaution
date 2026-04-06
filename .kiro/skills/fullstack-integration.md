---
name: fullstack-integration
description: Orchestrates complete full-stack feature development from backend to frontend, coordinating the nestjs-module-generator, frontend-api-integration-generator, and frontend-component-generator agents to build end-to-end features.
version: 1.0.0
---

# Full-Stack Integration Skill

This skill helps you build complete full-stack features by orchestrating three specialized agents in sequence:

1. **Backend Module** (nestjs-module-generator)
2. **API Integration** (frontend-api-integration-generator)
3. **Frontend Components** (frontend-component-generator)

## When to Use This Skill

Use this skill when you need to:
- Build a complete new feature from scratch (backend + frontend)
- Create CRUD functionality for a new entity
- Scaffold a full-stack module quickly
- Ensure consistency between backend and frontend

## Workflow

### Step 1: Gather Requirements

Ask the user for:
- **Feature/Module Name** (e.g., "products", "orders", "customers")
- **Entity Fields** (e.g., name, description, price, status)
- **Component Type** (list page, form, detail page, or all)
- **Special Requirements** (filters, search, custom endpoints)

### Step 2: Generate Backend Module

Invoke the `nestjs-module-generator` agent:
```
@nestjs-module-generator Generate a [module-name] module
```

This creates:
- Module, controller, service files
- Entity interface
- DTOs (create, update)
- Seed data
- All in `backend/src/modules/[module-name]/`

**After generation:**
- Remind user to import the module in `backend/src/app.module.ts`
- Verify the backend structure is correct

### Step 3: Generate API Integration

Invoke the `frontend-api-integration-generator` agent:
```
@frontend-api-integration-generator Generate API integration for [module-name]
```

This creates:
- RTK Query API file with all endpoints
- TypeScript interfaces matching backend
- Exported hooks (useGetXQuery, useCreateXMutation, etc.)
- File at `frontend/src/appstore/api/[module-name]Api.ts`

**After generation:**
- Remind user to import the API in `frontend/src/appstore/index.ts`
- Remind user to add tag type to `baseApi.ts` if needed

### Step 4: Generate Frontend Components

Invoke the `frontend-component-generator` agent for each component needed:

**For List Page:**
```
@frontend-component-generator Create a [module-name] list page
```

**For Form Component:**
```
@frontend-component-generator Create a [module-name] form component
```

**For Detail Page:**
```
@frontend-component-generator Create a [module-name] detail page
```

This creates:
- Complete React components with Material-UI
- RTK Query integration
- Loading, error, and empty states
- Form validation (if applicable)
- Responsive design

**After generation:**
- Remind user to add routes to navigation
- Test the complete flow

### Step 5: Integration Checklist

After all agents complete, provide a checklist:

```markdown
## Integration Checklist

### Backend
- [ ] Import module in `backend/src/app.module.ts`
- [ ] Customize entity fields if needed
- [ ] Add business logic to service
- [ ] Test endpoints with Postman/Thunder Client
- [ ] Run backend: `npm run start:dev`

### Frontend API
- [ ] Import API in `frontend/src/appstore/index.ts`
- [ ] Add tag type to `baseApi.ts` tagTypes array
- [ ] Verify API endpoints match backend routes

### Frontend Components
- [ ] Add routes to navigation/menu
- [ ] Customize styling as needed
- [ ] Test with real backend data
- [ ] Add any additional UI logic
- [ ] Run frontend: `npm run dev`

### Testing
- [ ] Create a new item via form
- [ ] View items in list page
- [ ] View item details
- [ ] Update an item
- [ ] Delete an item
- [ ] Test pagination and filters
- [ ] Test error states (disconnect backend)
- [ ] Test loading states
```

## Example Usage

**User Request:**
"Build a products feature with list, create form, and detail pages"

**Your Response:**
1. Confirm requirements (fields: name, description, price, stock, category)
2. Invoke nestjs-module-generator for products module
3. Invoke frontend-api-integration-generator for products API
4. Invoke frontend-component-generator for products list page
5. Invoke frontend-component-generator for product form
6. Invoke frontend-component-generator for product detail page
7. Provide integration checklist

## Best Practices

1. **Sequential Execution**: Always generate backend first, then API, then components
2. **Verify Each Step**: Check that each agent completed successfully before proceeding
3. **Consistent Naming**: Use the same module name across all three layers
4. **Field Consistency**: Ensure entity fields match across backend, API types, and forms
5. **Test Integration**: Encourage testing after each major step

## Common Patterns

### Simple CRUD Feature
- Backend module with standard endpoints
- API integration with all CRUD hooks
- List page + form component

### Read-Only Feature
- Backend module with GET endpoints only
- API integration with query hooks only
- List page + detail page (no forms)

### Complex Feature
- Backend module with custom endpoints
- API integration with custom query parameters
- Multiple specialized components

## Error Handling

If any agent fails:
1. Identify which step failed
2. Check error messages
3. Fix the issue (missing dependencies, incorrect naming, etc.)
4. Re-run the failed agent
5. Continue with remaining steps

## Tips for Success

- **Start Simple**: Begin with basic CRUD, add complexity later
- **Consistent Naming**: Use singular form for entities (product, not products)
- **Test Early**: Test backend endpoints before building frontend
- **Iterate**: Generate basic structure first, then customize
- **Documentation**: Keep track of custom endpoints and business logic

## Integration Points

### Backend → Frontend API
- Entity interfaces must match
- Endpoint routes must match
- Response structure must match (wrapped in `{ data, timestamp }`)

### Frontend API → Components
- Hook names must match usage
- Type definitions must be imported
- Query parameters must match API expectations

### End-to-End
- Backend seeds data → Frontend displays it
- Frontend forms → Backend validates and stores
- Backend errors → Frontend displays user-friendly messages

## Advanced Usage

### Custom Endpoints
If you need custom endpoints beyond CRUD:
1. Add them to the backend controller
2. Add corresponding endpoints to the API integration
3. Use the custom hooks in components

### Relationships
For related entities (e.g., products → categories):
1. Define relationships in backend entities
2. Include related data in API responses
3. Display relationships in frontend components

### Authentication
For protected routes:
1. Add guards to backend controller
2. API integration automatically includes auth headers
3. Add route protection in frontend (middleware/guards)

## Summary

This skill orchestrates three specialized agents to build complete full-stack features efficiently. By following the sequential workflow and integration checklist, you can scaffold production-ready features in minutes instead of hours.

**Remember**: The agents provide the structure and boilerplate. You still need to customize business logic, styling, and add domain-specific features.
