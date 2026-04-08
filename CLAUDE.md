# CLAUDE.md - AI Website Factory

## Project Purpose
Build a production-ready, reusable website system for small/medium businesses in Poland and Germany. The system enables fast delivery of client websites with reusable templates, clean structure, easy content editing via Sanity CMS, and low maintenance overhead. Target: 90% automated delivery at €750-1,200 one-time + €50-75/month.

## Architecture

### Stack
- Next.js 14 (App Router)
- TypeScript
- Sanity CMS (headless)
- Tailwind CSS for styling
- Vercel for deployment

### Folder Structure
```
/src
  /app              - Next.js pages (home, dynamic, blog, studio, api)
  /components      - 10 reusable UI components
  /lib             - Utilities, Sanity client
  /sanity/schemas  - 12 CMS content schemas
  /templates       - Template defaults (German)
  /config          - Site configuration
/scripts           - Automation scripts (seed, setup-client)
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
- Blog posts
- Gallery images
- SEO metadata

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
5. **Fast delivery over technical purity** - Get sites live quickly

## What NOT to Do
- Don't create custom CMS schemas for every edge case
- Don't add features a small business website doesn't need
- Don't build a design system before there's demand
- Don't assume a large engineering team will maintain this

## Components Available
- Hero, About, Services, Testimonials, FAQ, Contact, CTA, Footer
- Gallery (new), Seo

## Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run seed construction` | Seed German construction template |
| `npm run seed restaurant` | Seed German restaurant template |
| `npm run setup` | Interactive client setup |

## Testing
- **Unit Tests**: Vitest - run with `npm run test`
- **CI**: GitHub Actions - `.github/workflows/ci.yml`

## Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## Documentation
- `/docs/` - Full documentation (operator-runbook, deployment-guide, product-model, etc.)
- Components: `/src/components/`
- CMS config: `/src/sanity/schemas/`