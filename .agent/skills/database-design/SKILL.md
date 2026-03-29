---
name: database-design
description: "Database design principles and decision-making. Schema design, indexing strategy, ORM selection, serverless databases."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Database Design

> **Learn to THINK, not copy SQL patterns.**

## Content Map

| Topic | When to Use |
|-------|-------------|
| Database Selection | PostgreSQL vs Neon vs Turso vs SQLite |
| ORM Selection | Drizzle vs Prisma vs Kysely |
| Schema Design | Normalization, PKs, relationships |
| Indexing | Index types, composite indexes |
| Optimization | N+1, EXPLAIN ANALYZE |
| Migrations | Safe migrations, serverless DBs |

---

## Core Principle

- ASK user for database preferences when unclear
- Choose database/ORM based on CONTEXT
- Don't default to PostgreSQL for everything

---

## Decision Checklist

Before designing schema:

- Asked user about database preference?
- Chosen database for THIS context?
- Considered deployment environment?
- Planned index strategy?
- Defined relationship types?

---

## Anti-Patterns

- Default to PostgreSQL for simple apps (SQLite may suffice)
- Skip indexing
- Use SELECT * in production
- Store JSON when structured data is better
- Ignore N+1 queries

---

## Related Skills

- `backend-dev-guidelines` — Backend architecture
- `api-patterns` — API data contracts
- `stripe-integration` — Payment data models
