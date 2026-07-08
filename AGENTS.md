# AGENTS.md

## Project

TypeScript backend MVP for a Bug Reporting Portal. Clean Architecture with three layers: domain, application, infrastructure. Built as a QA testing playground.

## Commands

```bash
npm run build        # tsc — type-checks and emits to dist/
npm run test         # vitest run — single sweep
npm run test:watch   # vitest — watch mode for TDD
```

No lint or formatter configured. No CI workflows exist yet.

## Architecture

```
src/
├── domain/          # Pure business logic — entities (interfaces) + repository contracts
├── application/     # Use cases (empty, coming in Phase 3)
└── infrastructure/  # Persistence (JSON storage, memory) + web (Express routes/controllers)
```

- **Dependency direction**: infrastructure → application → domain. Domain has zero external dependencies.
- **Entities are interfaces**, not classes. Validation is not yet implemented (Phase 2 scope).
- **Three entities**: Bug, User, Comment. Currently isolated — no foreign keys or relationships between them.

## Critical Constraints

1. **ESM only**. `"type": "module"` in package.json. All imports must use `.js` extensions (e.g., `import { Bug } from '../entities/bug.entity.js'`).

2. **Use `import.meta.env.MODE`**, not `process.env`. Vitest configures environment via Vite — `process.env` will not work as expected.

3. **Vitest globals are enabled**. `describe`, `test`, `expect`, `vi` are available without imports. Config is in `vite.config.ts`.

4. **Test file patterns**: `tests/**/*.spec.ts` or `tests/**/*.test.ts`. Currently no test files exist — `tests/fixtures/` is empty.

5. **Module resolution**: `NodeNext`. tsconfig target is ES2024 with strict mode.

## Agent Skills

Two skills are loaded in `.agents/skills/` and should be enforced during code generation:
- **clean-code** — Robert C. Martin principles. Enforce SRP, meaningful names, small functions, no comments.
- **nodejs-backend-patterns** — Express/Fastify patterns, error handling, dependency injection.

## Development Stage

Incremental phased build. `plan.md` has the full roadmap. Current state: Phase 1 complete (scaffold + domain interfaces). Next: Phase 2 (domain validation + custom error classes + tabular test specs).
