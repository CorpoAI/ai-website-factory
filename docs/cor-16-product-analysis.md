# COR-16: Current Product State Analysis & User Journey

## Executive Summary

The current product is a **template codebase** with 8 reusable components and Sanity schemas. It is **NOT a functional website factory system**. The board's assessment that "Vercel deployment is useless - just a landing page" is accurate. What exists is a foundation, not a product.

---

## Current Product State

### What Exists

| Component | Status | Notes |
|-----------|--------|-------|
| 8 UI Components | ✅ Built | Hero, About, Services, Testimonials, FAQ, Contact, CTA, Footer |
| Sanity Schemas | ✅ Defined | Full schema for all sections, pages, site settings, SEO |
| Template Defaults | ✅ Created | Construction (German), Restaurant (German) |
| Dynamic Routing | ✅ Basic | `[slug]/page.tsx` exists but non-functional without Sanity |
| Testing | ✅ Setup | Vitest with Hero component test |
| CI Pipeline | ✅ Configured | GitHub Actions workflow |
| Documentation | ✅ Complete | Operator runbook, product model, architecture docs |

### What's Missing / Broken

| Gap | Severity | Impact |
|-----|----------|--------|
| **No Sanity credentials** | Critical | Cannot fetch dynamic content |
| **No multi-tenant system** | Critical | Requires manual repo cloning per client |
| **No onboarding flow** | Critical | Operator does everything manually |
| **No env configuration** | High | No `.env.example` or setup script |
| **No template selector** | High | Hardcoded to single template |
| **No form submission handling** | Medium | Contact form has no backend |
| **No image optimization** | Medium | Basic img tags, no next/image config |
| **No SEO implementation** | Medium | Schemas defined but not integrated |

---

## Current User Journey (Broken)

```
[operator]
    │
    ▼
Clone repo ──────────────────────✗ MANUAL, ERROR-PRONE
    │
    ▼
Create Sanity project ────────────✗ MANUAL, NO GUIDE
    │
    ▼
Configure env vars ───────────────✗ NO TEMPLATE PROVIDED
    │
    ▼
Enter content in Studio ──────────✗ NO DEFAULTS PRE-LOADED
    │
    ▼
Customize Tailwind colors ────────✗ MANUAL FILE EDITING
    │
    ▼
Git push ─────────────────────────✗ MANUAL PROCESS
    │
    ▼
Connect Vercel ───────────────────✗ NO AUTOMATION
    │
    ▼
[live site]
```

**Problems with current journey:**
1. Operator must manually clone and configure for each client
2. No pre-populated template data in Sanity - all content entered from scratch
3. No automation - every client is a full custom setup
4. No template selection mechanism - code must be modified
5. No form backend - contact forms don't work

---

## Target User Journey (Required)

```
[client] ──────────────────────────► [operator]
   │                                     │
   │ "I need a website"                  │
   │                                     ▼
   │                              Select template
   │                              (construction/restaurant)
   │                                     │
   │                              Auto-create:
   │                              • Sanity project
   │                              • GitHub repo
   │                              • Vercel deployment
   │                                     │
   │                              Pre-load defaults
   │                              (German content)
   │                                     │
   ▼                              ▼
[operator]                       [operator]
   │                              Customize:
   │                              • Brand colors
   │                              • Logo
   │                              • Company name
   │                                     │
   ▼                              ▼
[client edits content] ◄───────── Handover credentials
   │                              (Studio URL, login)
   │
   ▼
[live site - 2-4 hrs total]
```

---

## Gap Analysis

### Phase 1: Foundation (Critical - Must Fix)

| Item | Current | Required | Effort |
|------|---------|----------|--------|
| Environment config | None | `.env.example` + setup script | 1 hr |
| Sanity connection | Not configured | Working client with credentials | 2 hr |
| Template defaults | Code only | Loaded into Sanity on init | 3 hr |
| Form submission | No handler | Sanity document for submissions | 2 hr |

### Phase 2: Automation (High Priority)

| Item | Current | Required | Effort |
|------|---------|----------|--------|
| Client onboarding | Manual clone | Script to create new instance | 8 hr |
| Sanity init | Manual | CLI command to seed defaults | 4 hr |
| Deployment | Manual git push | Auto-deploy on changes | 2 hr |
| Template selector | Hardcoded | Dynamic based on config | 4 hr |

### Phase 3: Scale (Medium Priority)

| Item | Current | Required | Effort |
|------|---------|----------|--------|
| Multi-language | Schema only | i18n routing setup | 8 hr |
| Blog section | Not implemented | Posts schema + listing page | 6 hr |
| Gallery | Not implemented | Image gallery component | 4 hr |
| SEO | Schema only | Meta tags, schema.org | 4 hr |

---

## Recommended Improvements

### Immediate (This Sprint)

1. **Add environment template** - Create `.env.example` with all required vars
2. **Configure demo Sanity** - Connect to a working Sanity project to prove dynamic content
3. **Pre-load template data** - Script to seed Construction/Restaurant defaults into Sanity
4. **Fix contact form** - Add form submission handler

### Short-term (Next 2 Sprints)

1. **Create client setup script** - One command to initialize new client instance
2. **Add template selector** - Config-based template switching
3. **Auto-deployment** - Verify CI/CD works end-to-end

### Medium-term (This Quarter)

1. **Multi-tenant architecture** - Evaluate: separate repos vs. single repo with config
2. **Operator dashboard** - Simple UI to manage client sites
3. **Content import** - Bulk import from client docs/spreadsheets

---

## Success Criteria

For the product to be "production-ready" and justify the €750-1,200 pricing:

- [ ] **Automated setup**: New client in < 30 min (not 2-3 hrs)
- [ ] **Pre-loaded content**: Template defaults auto-populated
- [ ] **Working forms**: Contact submissions stored and emailed
- [ ] **Dynamic updates**: Content changes reflect in < 1 min
- [ ] **Proven deployment**: End-to-end works for test client
- [ ] **Documentation**: Operator can run without developer help

---

## Next Steps

1. **CEO decision**: Choose approach for multi-tenancy
   - Option A: Clone repo per client (simpler, less scalable)
   - Option B: Single repo with config (more complex, easier to manage)
   
2. **Assign resources**: Need 1 developer for 2-3 weeks to implement Phase 1

3. **Test with pilot**: Create one real client site to validate workflow

---

*Prepared for: CEO Review*
*Date: 2026-04-08*
*Status: Analysis Complete - Awaiting Decision*