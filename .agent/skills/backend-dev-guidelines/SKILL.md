---
name: backend-dev-guidelines
description: "Opinionated backend development standards for Node.js + Express + TypeScript microservices. Covers layered architecture, BaseController pattern, dependency injection, Prisma repositories, Zod validation."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Backend Development Guidelines

**(Node.js · Express · TypeScript · Microservices)**

You are a **senior backend engineer** operating production-grade services under strict architectural and reliability constraints.

---

## Core Architecture Doctrine (Non-Negotiable)

### Layered Architecture Is Mandatory

```
Routes → Controllers → Services → Repositories → Database
```

- No layer skipping
- No cross-layer leakage
- Each layer has one responsibility

### Rules by Layer

**Routes** — Only route. Zero business logic.

```ts
// ALWAYS
router.post('/create', (req, res) => userController.create(req, res));
```

**Controllers** — Coordinate. Parse request, call services, handle response.

```ts
export class UserController extends BaseController {
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getById(req.params.id);
      this.handleSuccess(res, user);
    } catch (error) {
      this.handleError(error, res, 'getUser');
    }
  }
}
```

**Services** — Contain business rules. Framework-agnostic. Use DI. Unit-testable.

```ts
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
```

**Repositories** — Encapsulate Prisma queries. Never used directly in controllers.

---

## Validation — All External Input with Zod

```ts
const schema = z.object({
  email: z.string().email(),
});

const input = schema.parse(req.body);
```

No validation = bug.

---

## Config — unifiedConfig Is the Only Source

```ts
// NEVER: process.env.JWT_SECRET
// ALWAYS:
import { config } from '@/config/unifiedConfig';
config.auth.jwtSecret;
```

---

## Error Handling

- All errors go to Sentry
- No console.log, no silent failures, no swallowed errors
- All async route handlers wrapped with asyncErrorWrapper

---

## Directory Structure

```
src/
├── config/          # unifiedConfig
├── controllers/     # BaseController + controllers
├── services/        # Business logic
├── repositories/    # Prisma access
├── routes/          # Express routes
├── middleware/       # Auth, validation, errors
├── validators/      # Zod schemas
├── types/           # Shared types
├── utils/           # Helpers
├── tests/           # Unit + integration tests
├── instrument.ts    # Sentry (FIRST IMPORT)
├── app.ts           # Express app
└── server.ts        # HTTP server
```

---

## Anti-Patterns (Immediate Rejection)

- Business logic in routes
- Skipping service layer
- Direct Prisma in controllers
- Missing validation
- process.env usage
- console.log instead of Sentry
- Untested business logic

---

## Testing Discipline

- **Unit tests** for services
- **Integration tests** for routes
- **Repository tests** for complex queries
- No tests → no merge

---

## Related Skills

- `frontend-dev-guidelines` — API contract alignment
- `database-design` — Schema correctness
- `api-patterns` — API design decisions
