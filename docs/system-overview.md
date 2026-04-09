# AI Website Factory - System Overview

## Purpose
This system enables rapid delivery of professional websites for small and medium businesses in Poland and Germany using reusable templates with easy content management via Sanity CMS. Target: 90% automated delivery at €750-1,200 one-time + €50-75/month.

## Architecture

### Technology Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (headless)
- **Deployment**: Vercel

### Project Structure
```
/src
  /app              # Next.js pages (home, dynamic, blog, studio, api)
  /components      # 10 reusable page sections
  /lib              # Utilities and Sanity client
  /sanity/schemas   # 13 CMS schema definitions
  /templates       # Template defaults (German)
  /config          # Site configuration
/scripts           # Automation scripts
```

## Components (10)
- Hero, About, Services, Testimonials, FAQ, Contact, CTA, Footer, Gallery, Seo

## Sanity Schemas (13)
- page, siteSettings, seo, hero, about, services, testimonials, faq, contact, cta, post, gallery, contactSubmission

## Templates
- **Construction**: German construction company defaults
- **Restaurant**: German restaurant/café defaults

## Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run seed construction` | Seed German construction template |
| `npm run seed restaurant` | Seed German restaurant template |
| `npm run setup` | Interactive client setup |

## Client Workflow (1.5-2 hrs total)
1. `npm run setup` - Guided onboarding
2. Choose template (construction/restaurant)
3. Customize in Sanity Studio
4. Deploy to Vercel
5. Handover to client

## Deployment
1. Connect GitHub repo to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
3. Deploy with `npm run build`

## Support
- Documentation: `/docs/`
- Operator runbook: `docs/operator-runbook.md`
- Deployment guide: `docs/deployment-guide.md`
- AI handoff: `CLAUDE.md`