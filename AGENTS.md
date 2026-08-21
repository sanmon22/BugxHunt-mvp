# AGENTS.md

## Project

TypeScript backend MVP for a Bug Reporting Portal. Clean Architecture with three layers: domain, application, infrastructure. Built as a QA testing playground.

## Commands

```bash
npm run build        # tsc — type-checks and emits to dist/
npm run test         # vitest run — single sweep
npm run test:watch   # vitest — watch mode for TDD
```

## Architecture

```
src/
├── domain/          # Pure business logic — entities (interfaces) + repository contracts
├── application/     # Use cases (CRUD operations)
└── infrastructure/  # Persistence (JSON storage, memory) + web (Express routes/controllers)
```

### Layer Responsibilities

| Layer | Responsibility | Dependencies |
|-------|---------------|--------------|
| **Domain** | Entities (interfaces), validations, repository contracts, error classes | None (zero external dependencies) |
| **Application** | Use cases with Constructor Dependency Injection | Domain only |
| **Infrastructure** | Express routes, JSON file storage, controllers | Application + Domain |

### Dependency Rule

Dependency direction: **infrastructure → application → domain**

- Domain layer has **zero external dependencies**
- Application layer imports from Domain only
- Infrastructure layer imports from Application and Domain

### Entities

Three isolated entities with **no foreign keys or relationships**:

| Entity | Purpose |
|--------|---------|
| **Bug** | Bug reports with details, images, references, notes |
| **User** | User accounts with username, email, password |
| **Comment** | Comments with text and notes |

## Critical Constraints

### 1. ESM Only

```json
{
  "type": "module"
}
```

All imports **must** use `.js` extensions:

```typescript
// ✅ Correct
import { Bug } from '../entities/bug/bug.entity.js';

// ❌ Wrong
import { Bug } from '../entities/bug/bug.entity';
```

### 2. Environment Variables

Use `import.meta.env.MODE`, **not** `process.env`:

```typescript
// ✅ Correct (Vitest/Vite compatible)
const mode = import.meta.env.MODE;

// ❌ Wrong (won't work in Vitest)
const mode = process.env.NODE_ENV;
```

### 3. Vitest Globals

Globals are enabled — no imports needed for test functions:

```typescript
// ✅ Correct (globals enabled)
describe('Bug Entity', () => {
  test('should create bug', () => {
    expect(true).toBe(true);
  });
});
```

### 4. TypeScript Configuration

| Setting | Value |
|---------|-------|
| Module Resolution | `NodeNext` |
| Target | `ES2024` |
| Strict Mode | `true` |
| Module | `NodeNext` |

### 5. Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Use Cases | `action.[entity].use-case.ts` | `create.bug.use-case.ts` |
| Entities | `[entity].entity.ts` | `bug.entity.ts` |
| Factories | `[entity].factory.ts` | `bug.factory.ts` |
| Validations | `[entity].validation.ts` | `bug.validation.ts` |
| Repositories | `[entity].repository.ts` | `bug.repository.ts` |
| Errors | `[error-type].error.ts` | `validation.error.ts` |
| Tests | `[name].spec.ts` | `bug.entity.spec.ts` |

### 6. Constructor Pattern

Use explicit declaration (Option B):

```typescript
export class CreateBugUseCase {
    private readonly bugRepository: IBugRepository;

    constructor(bugRepository: IBugRepository) {
        this.bugRepository = bugRepository;
    }
}
```

### 7. Mocking Pattern

```typescript
const mockBugRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

beforeEach(() => {
    vi.clearAllMocks();
});
```

## Agent Skills

Two skills available in `.agents/skills/`:
- **clean-code** — Robert C. Martin principles (SRP, meaningful names, small functions, no comments)
- **nodejs-backend-patterns** — Express/Node.js patterns, error handling, dependency injection

## Detailed Documentation

- `.agents/plan.md` — Full roadmap (4 phases with checkpoints)
- `.agents/mvp-bug-ia-guidance.md` — Agent behavior guidelines
- `.agents/current_progress.md` — Current progress and session handoff
