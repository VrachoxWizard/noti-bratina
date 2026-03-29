---
name: api-patterns
description: "API design principles and decision-making. REST vs GraphQL vs tRPC selection, response formats, versioning, pagination."
risk: unknown
source: community
date_added: "2026-02-27"
---

# API Patterns

> API design principles and decision-making.
> **Learn to THINK, not copy fixed patterns.**

## Content Map

| Topic | When to Use |
|-------|-------------|
| API Style | Choosing between REST, GraphQL, tRPC |
| REST | Resource naming, HTTP methods, status codes |
| Response Format | Envelope pattern, error format, pagination |
| GraphQL | Schema design, when to use, security |
| tRPC | TypeScript monorepo, type safety |
| Versioning | URI/Header/Query versioning strategies |
| Auth | JWT, OAuth, Passkey, API Keys |
| Rate Limiting | Token bucket, sliding window |
| Documentation | OpenAPI/Swagger best practices |

---

## Decision Checklist

Before designing an API:

- Asked user about API consumers?
- Chosen API style for THIS context? (REST/GraphQL/tRPC)
- Defined consistent response format?
- Planned versioning strategy?
- Considered authentication needs?
- Planned rate limiting?
- Documentation approach defined?

---

## Anti-Patterns

**DON'T:**
- Default to REST for everything
- Use verbs in REST endpoints (/getUsers)
- Return inconsistent response formats
- Expose internal errors to clients
- Skip rate limiting

**DO:**
- Choose API style based on context
- Ask about client requirements
- Document thoroughly
- Use appropriate status codes

---

## Related Skills

- `backend-dev-guidelines` — API implementation
- `database-design` — Data structure
- `stripe-integration` — Payment API patterns
