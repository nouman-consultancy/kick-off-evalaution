---
name: Backend Module Development Workflow
description: Step-by-step orchestration guide for creating NestJS backend modules using the nestjs-module-generator agent
inclusion: manual
tags: [backend, nestjs, workflow, planning]
---

# Backend Module Development Workflow

This workflow guides you through creating a complete NestJS backend module using the `nestjs-module-generator` agent.

## Prerequisites

Before starting:
- [ ] Backend server is set up (`backend/` directory exists)
- [ ] NestJS dependencies are installed
- [ ] You have a clear understanding of the entity/resource you're building

## Planning Phase

### 1. Define Your Entity

Answer these questions:

**Entity Name**: _________________ (singular, e.g., "product", "order", "customer")

**Core Fields**:
- [ ] What is the primary identifier? (usually `id: number`)
- [ ] What are the required fields? (e.g., name, description)
- [ ] What are the optional fields? (e.g., iconUrl, category, status)
- [ ] What metadata fields are needed? (createdAt, updatedAt)

**Business Logic**:
- [ ] What filters/queries are needed? (search, category, status)
- [ ] What relationships exist? (belongs to, has many)
- [ ] What validation rules apply? (min length, email format, etc.)

### 2. Design Your API Endpoints

Standard CRUD endpoints:
- [ ] `POST /[entity]` - Create new item
- [ ] `GET /[entity]` - List all items (with pagination)
- [ ] `GET /[entity]/:id` - Get single item
- [ ] `PATCH /[entity]/:id` - Update item
- [ ] `DELETE /[entity]/:id` - Delete item

Custom endpoints (if needed):
- [ ] `GET /[entity]/active` - Get active items
- [ ] `GET /[entity]/category/:category` - Filter by category
- [ ] Other: _________________

### 3. Plan Your Seed Data

- [ ] How many sample records do you need? (minimum 3-5)
- [ ] What realistic data should they contain?
- [ ] Do you need variety for testing filters? (different categories, statuses, etc.)

## Execution Phase

### Step 1: Invoke the Agent

Use the nestjs-module-generator agent:

```
@nestjs-module-generator Generate a [entity-name] module
```

Example:
```
@nestjs-module-generator Generate a products module
```

The agent will create:
- `backend/src/modules/[entity]/[entity].module.ts`
- `backend/src/modules/[entity]/[entity].controller.ts`
- `backend/src/modules/[entity]/[entity].service.ts`
- `backend/src/modules/[entity]/entities/[entity].entity.ts`
- `backend/src/modules/[entity]/dto/create-[entity].dto.ts`
- `backend/src/modules/[entity]/dto/update-[entity].dto.ts`
- `backend/src/modules/[entity]/data/[entity].seed.ts`

### Step 2: Register the Module

**Action Required**: Import the new module in `backend/src/app.module.ts`

```typescript
import { [Entity]Module } from './modules/[entity]/[entity].module';

@Module({
  imports: [
    // ... other modules
    [Entity]Module,
  ],
})
export class AppModule {}
```

### Step 3: Customize Entity Fields

Review and customize the entity interface:

```typescript
// backend/src/modules/[entity]/entities/[entity].entity.ts
export interface [Entity] {
  id: number;
  // Add your custom fields here
  name: string;
  description: string;
  // ... other fields
  createdAt: Date;
  updatedAt: Date;
}
```

### Step 4: Customize DTOs

Update the Create and Update DTOs with proper validation:

```typescript
// backend/src/modules/[entity]/dto/create-[entity].dto.ts
export class Create[Entity]Dto {
  @ApiProperty({ example: 'Example Name' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'Example description' })
  @IsString()
  description: string;

  // Add more fields with validation
}
```

### Step 5: Enhance Service Logic

Add custom business logic to the service:

**Common enhancements**:
- [ ] Add search functionality
- [ ] Add filtering by category/status
- [ ] Add sorting options
- [ ] Add custom query methods
- [ ] Add validation logic

Example:
```typescript
async findByCategory(category: string): Promise<[Entity][]> {
  return this.[entities].filter(
    (item) => item.category?.toLowerCase() === category.toLowerCase()
  );
}
```

### Step 6: Enhance Controller Endpoints

Add custom endpoints or query parameters:

```typescript
@Get('category/:category')
@ApiOperation({ summary: 'Get [entities] by category' })
async findByCategory(@Param('category') category: string) {
  return this.[entity]Service.findByCategory(category);
}
```

### Step 7: Update Seed Data

Customize the seed data with realistic values:

```typescript
// backend/src/modules/[entity]/data/[entity].seed.ts
export const [ENTITY]_SEED_DATA: Omit<[Entity], 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Realistic Name 1',
    description: 'Detailed description...',
    // ... other fields
  },
  // Add more records
];
```

## Verification Phase

### Step 1: Run Diagnostics

Check for TypeScript errors:

```
Run getDiagnostics on all created files
```

Fix any errors before proceeding.

### Step 2: Start the Backend

```bash
cd backend
npm run start:dev
```

### Step 3: Test Endpoints

Use Thunder Client, Postman, or curl to test:

- [ ] `GET http://localhost:3001/[entity]` - List all
- [ ] `GET http://localhost:3001/[entity]/1` - Get by ID
- [ ] `POST http://localhost:3001/[entity]` - Create new
- [ ] `PATCH http://localhost:3001/[entity]/1` - Update
- [ ] `DELETE http://localhost:3001/[entity]/1` - Delete

### Step 4: Check Swagger Documentation

Visit: `http://localhost:3001/api`

Verify:
- [ ] All endpoints are documented
- [ ] Request/response schemas are correct
- [ ] Examples are helpful

## Common Issues & Solutions

### Issue: Module not found
**Solution**: Ensure you imported the module in `app.module.ts`

### Issue: Validation not working
**Solution**: Check that `class-validator` decorators are applied to DTOs

### Issue: Seed data not loading
**Solution**: Verify `OnModuleInit` is implemented and seed file is imported

### Issue: TypeScript errors
**Solution**: Run `getDiagnostics` and fix type mismatches

## Next Steps

After completing the backend module:

1. **Create API Integration**: Use `frontend-api-integration-generator` agent
2. **Build Frontend Components**: Use `frontend-component-generator` agent
3. **Test End-to-End**: Verify full-stack integration

## Checklist Summary

- [ ] Entity defined with all required fields
- [ ] Module created using agent
- [ ] Module registered in app.module.ts
- [ ] Entity fields customized
- [ ] DTOs updated with validation
- [ ] Service logic enhanced
- [ ] Controller endpoints customized
- [ ] Seed data updated with realistic values
- [ ] Diagnostics run and errors fixed
- [ ] Backend started successfully
- [ ] All endpoints tested
- [ ] Swagger documentation verified

---

**Estimated Time**: 15-30 minutes (depending on complexity)

**Difficulty**: Beginner to Intermediate

**Related Workflows**:
- Frontend API Integration Workflow
- Frontend Component Development Workflow
- Full-Stack Feature Workflow
