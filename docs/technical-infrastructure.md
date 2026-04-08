# Technical Infrastructure Assessment
## Autonomous Agent Work Environment for AI Website Factory

### Executive Summary
For 90% automation target, we need minimal but effective infrastructure. Skip enterprise complexity.

---

## 1. Testing Framework Requirements

### Recommended Stack
| Test Type | Tool | Rationale |
|-----------|------|-----------|
| Unit | Vitest | Fast, modern, minimal config |
| Component | React Testing Library | Tests behavior, not internals |
| E2E | Playwright | Reliable, supports CI, headless |

### Coverage Target
- **Components**: 80% - props render, interactions work
- **Utils**: 90% - pure functions predictable
- **Integration**: Key user flows only (homepage loads, form submits)

### What NOT to Test
- CSS visual regression (fragile, low ROI)
- Third-party API mocks (test interfaces only)
- Edge cases beyond 80/20

---

## 2. CI/CD Pipeline

### Recommended: Minimal GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test -- --coverage
```

### Deployment: Vercel
- Auto-deploy on `main` branch
- Preview deployments for PRs
- Zero config, integrates with GitHub

### What NOT to Build
- Separate staging environment (extra cost, minimal value)
- Complex approval gates (slows iteration)
- Complex artifact storage (use Vercel)

---

## 3. Development Environment for Agents

### Current Setup (Sufficient)
- **Workspace**: Local folder mapped to Paperclip agent
- **Editor**: VS Code via opencode_local adapter
- **Terminal**: Full shell access
- **Git**: Manual commits (not auto)

### What Agents Need
1. **Package manager**: npm - already available
2. **TypeScript**: For type safety - already configured
3. **Lint**: ESLint - already configured
4. **Test runner**: Vitest - install needed

### Missing: Install Commands
```bash
npm install
npm run build  # validate
npm run lint   # catch errors
npm run test   # validate
```

---

## 4. Tools/Frameworks Needed

### Priority: Minimal Viable
| Tool | Status | Action |
|------|--------|--------|
| Vitest | Missing | Install: `npm install -D vitest` |
| Testing Library | Missing | Install: `npm install -D @testing-library/react` |
| Playwright | Optional | Skip for MVP (manual testing OK) |
| ESLint | Existing | Already in package.json |
| Prettier | Optional | Nice-to-have, not critical |

### Recommended package.json additions
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^24.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 5. Implementation Recommendations

### Phase 1: Foundation (Do Now)
1. Add Vitest + Testing Library to dependencies
2. Add test script to package.json
3. Create `src/__tests__/` directory structure
4. Add one simple component test as example
5. Add CI workflow (5 min setup)

### Phase 2: Coverage (Later)
1. Add tests for key components (Hero, Contact form)
2. Add tests for utility functions
3. Set up coverage reporting (optional)

### Phase 3: E2E (Skip for Now)
- Manual testing sufficient for MVP
- Add Playwright when team grows

---

## 6. Cost/Benefit Analysis

| Item | Cost | Benefit |
|------|------|---------|
| Vitest | Free | Catches regressions |
| Testing Library | Free | Confidence in refactors |
| GitHub Actions | Free (2000 min/mo) | Automated validation |
| Vercel | Free (hobby) | Deployment |

**Total Cost**: $0/month
**Time to Set Up**: 1 hour

---

## 7. Recommendation

**GO** with minimal infrastructure:
1. Install Vitest + Testing Library
2. Add basic CI workflow
3. Skip E2E for now
4. Use manual testing for edge cases

**Rationale**:
- 90% automation is about workflow, not test coverage
- Low client volume = manual testing acceptable
- Add automation as volume grows
- Don't over-engineer before having paying clients