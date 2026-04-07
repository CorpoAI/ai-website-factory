# CLAUDE.md - AI Website Factory

## Project Purpose
Build a production-ready, reusable website system for small/medium businesses in Poland and Germany. The system enables fast delivery of client websites with reusable templates, clean structure, easy content editing via Sanity CMS, and low maintenance overhead.

## Architecture Rules

### Stack
- Next.js 14 (App Router)
- TypeScript
- Sanity CMS (headless)
- Tailwind CSS for styling
- Vercel for deployment

### Folder Structure
```
/src
  /app          - Next.js pages and routes
  /components   - Reusable UI components (Hero, About, Services, etc.)
  /lib          - Utilities, Sanity client, helpers
  /sanity       - CMS schemas and configuration
  /types        - TypeScript type definitions
```

### Component Pattern
All page sections are reusable components accepting props for customization:
- Default values for fallback
- Props interface for type safety
- Consistent prop naming (title, subtitle, content, etc.)

### CMS Editing Boundaries
**Client can edit:**
- All text content (headings, body, labels)
- Contact information
- Service lists, testimonials, FAQ items
- SEO metadata
- Images via media manager

**Code-only:**
- Component structure and styling
- Layout templates
- Animation behavior
- Responsive breakpoints

## Coding Principles
1. **Reusability over customization** - Build components that work across clients
2. **Simplicity over flexibility** - Don't over-engineer for hypothetical future needs
3. **Type safety** - Use TypeScript for all components and data
4. **Defaults matter** - Provide sensible defaults so components work out-of-box

## What NOT to Do
- Don't create custom CMS schemas for every edge case
- Don't add features a small business website doesn't need
- Don't build a design system before there's demand
- Don't assume a large engineering team will maintain this

## Current Priorities
1. Complete baseline Next.js setup
2. Add Tailwind CSS to existing components
3. Create Sanity schemas matching docs/sanity-content-model.md
4. Implement dynamic page routing with Sanity data
5. Configure Vercel deployment (optional)

## Pending Tasks
- [x] Add Tailwind CSS configuration
- [x] Create Sanity schema files (page, siteSettings, hero, services, etc.)
- [x] Implement Sanity client and GROQ queries
- [x] Create dynamic route [slug]/page.tsx
- [x] Complete operator docs (system-overview.md)
- [ ] Set up Sanity project at sanity.io and configure credentials

## Quick Reference
- Docs: `/docs/` contains architecture and planning docs
- Components: `/src/components/` - reusable page sections
- CMS config: `/src/sanity/` - schema definitions
- Run dev: `npm run dev` (after `npm install`)

## Contact
For questions, check parent issue [COR-9](/COR/issues/COR-9) and goal [COR-Goal](/COR/goals/c0035e40-53d9-42c7-99c1-09bb73eb90ae)