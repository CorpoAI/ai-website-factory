# AI Website Factory - System Overview

## Purpose
This system enables rapid delivery of professional websites for small and medium businesses in Poland and Germany. It provides a reusable template architecture with easy content management via Sanity CMS.

## Architecture

### Technology Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (headless)
- **Deployment**: Vercel

### Project Structure
```
/src
  /app              # Next.js pages and routes
  /components       # Reusable page sections (Hero, About, Services, etc.)
  /lib              # Utilities and Sanity client
  /sanity           # CMS schema definitions (future)
  /types            # TypeScript types
/public             # Static assets
/docs               # Documentation
```

## How to Add a New Client Website

### Quick Start
1. Clone this repository
2. Update Sanity project credentials in `.env.local`
3. Customize content via Sanity Studio
4. Deploy to Vercel

### Content Customization
Clients can edit these via Sanity CMS:
- Page content and sections
- Hero title, subtitle, CTA
- Services list (add/edit/reorder)
- Testimonials
- FAQ items
- Contact information
- SEO metadata

### Branding Customization (Code)
Edit Tailwind config for brand colors:
- `tailwind.config.js` - theme colors
- Component default props - for default text content

## How the CMS Works

### Schema Structure
- **Page**: Dynamic page with sections array
- **SiteSettings**: Global site info (logo, contact, social)
- **Section Types**: Hero, About, Services, Testimonials, FAQ, Contact, CTA

### Multilingual Support
- Polish (pl), German (de), English (en)
- Field-level translations in Sanity

## Deployment

### Vercel Setup
1. Connect GitHub repo to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
3. Deploy with `npm run build`

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Maintenance

### Regular Tasks
- Update dependencies (`npm update`)
- Monitor Vercel deployments
- Backup Sanity content (automatic via Sanity)

### Adding New Section Types
1. Create component in `/src/components/`
2. Add schema in `/src/sanity/schemas/`
3. Update page renderer to include new type

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |

## Support
- Documentation: `/docs/`
- AI handoff: `CLAUDE.md`
- Parent issue: COR-9
- Goal: COR-Goal