# AI Consultancy Backend API Documentation

This backend provides REST API endpoints for the AI Consultancy application.

## Swagger Documentation

The API is fully documented using Swagger/OpenAPI. Once the server is running, you can access:

- **Swagger UI**: http://localhost:3001/api/docs
- **OpenAPI JSON**: http://localhost:3001/api/docs-json

## Endpoints

### Leads
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/lead` | Create a new lead inquiry |

**Request Body (CreateLeadDto):**
```json
{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "company": "Acme Corp",
  "message": "Interested in AI consultation services"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "lead_1699123456789",
  "name": "John Doe",
  "email": "john.doe@company.com",
  "company": "Acme Corp",
  "message": "Interested in AI consultation services"
}
```

---

### Pricing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pricing` | Get all pricing plans |

**Response:**
```json
[
  { "id": "starter", "name": "Starter", "price": 29 },
  { "id": "growth", "name": "Growth", "price": 99 },
  { "id": "enterprise", "name": "Enterprise", "price": null }
]
```

---

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services` | Get all available services |

**Response:**
```json
[
  { "id": "guided-chat", "title": "Guided Discovery Chat" },
  { "id": "prompt-guide", "title": "Prompt Engineering Guide" },
  { "id": "agent-builder", "title": "Agent Builder" },
  { "id": "pricing-clarity", "title": "Flexible Pricing" }
]
```

## Running the Server

```bash
# Install dependencies
npm install

# Development mode
npm run start:dev

# Production build
npm run build
node dist/main.js
```

## CORS

The API is configured to accept cross-origin requests from any origin (`*`).

## Validation

All input data is validated using `class-validator`. Invalid requests will return a 400 status with detailed validation errors.
