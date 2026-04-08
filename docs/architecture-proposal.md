# Architecture Proposal - AI Website Factory

## Target Architecture

### Simplified for Operator Workflow

```
/src
  /app
    page.tsx              # Home page (static fallback)
    [slug]/page.tsx       # Dynamic pages from Sanity
    studio/               # Sanity Studio embedded
  
  /components             # Reusable UI sections
    Hero.tsx             # With customizable props
    About.tsx
    Services.tsx
    Testimonials.tsx
    FAQ.tsx
    Contact.tsx
    CTA.tsx
    Footer.tsx

  /lib
    sanity.ts            # Sanity client + GROQ queries
    
  /sanity
    schemas/             # CMS content schemas
      index.ts
      page.ts
      hero.ts
      ...
  
  /templates              # TEMPLATE COLLECTION
    /construction       # Construction business template
    /restaurant         # Restaurant template
```

### Key Design Decisions

1. **Multi-tenant via Sanity**: Each client gets own Sanity project, shares codebase
2. **Template via Component Variants**: Templates distinguished by component props/theme config
3. **Code + CMS split**: Layout/styling in code, content in Sanity
4. **Static fallback**: Home page works without Sanity for demo

---

## Template Strategy

### Template = Component Configuration

Instead of separate codebase per template:

- **Construction Template**: Hero with image, Services with icons, Portfolio section
- **Restaurant Template**: Hero with photo, Menu section, Reservation CTA, Gallery

Each template defined by:
1. Default component props (in `/src/templates/[name]/defaults.ts`)
2. Tailwind theme customization
3. Additional sections enabled

This keeps one codebase, multiple "flavors".

---

## Product Model

### Deliverables

| Tier | Price | One-time | Monthly | Features |
|------|-------|---------|---------|-----------|
| Basic | €750 | €50 | 5 pages, contact form, basic SEO |
| Pro | €1,200 | €75 | 10 pages, gallery, blog, multi-language |

### Template Types (v1)

1. **Construction** - Services-focused, portfolio, testimonials
2. **Restaurant** - Menu, hours, reservation, gallery

---

## Phase 4: Implementation Priorities

1. Create Tailwind theme with brand color variables
2. Add operator documentation (CLAUDE.md)
3. Create template default configs
4. Verify dynamic page rendering works

---