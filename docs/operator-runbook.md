# Operator Runbook - AI Website Factory

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/ai-website-factory.git client-name
cd client-name

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with client's Sanity project credentials

# 4. Start development
npm run dev
```

---

## New Client Workflow

### Step 1: Discovery (30 min)

Collect from client:
- Template type: Construction or Restaurant
- Company name, logo (SVG/PNG)
- Contact details (email, phone, address)
- 5-10 paragraphs of company text
- 3-5 service items with descriptions
- 3-5 testimonials
- 5-10 FAQ items
- 5-10 photos (logo, team, projects/food)
- Brand color preference (or use default)

### Step 2: Setup (15 min)

```bash
# Create new Sanity project
# Go to sanity.io, create project, get project ID

# Update environment
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Push schema to Sanity
# (Run in Sanity Studio after deployment)
```

### Step 3: Content Entry (1-2 hrs)

In Sanity Studio:
1. Create site settings (logo, contact info)
2. Create home page
3. Add sections in order:
   - Hero
   - About
   - Services
   - Testimonials
   - FAQ
   - Contact
   - CTA
4. Fill in all fields with client content

### Step 4: Customize (30 min)

```bash
# Edit tailwind.config.js for brand colors
# Update template defaults in src/templates/[type]/defaults.ts
```

### Step 5: Deploy (15 min)

```bash
# Push to GitHub
git add .
git commit -m "Client: Company Name"
git push

# Vercel will auto-deploy
# Set custom domain if needed
```

### Step 6: Handover (15 min)

Send client:
- Sanity Studio URL + login
- How to edit guide (1 page)
- Support contact

---

## Common Tasks

### Add New Page

1. In Sanity Studio: Create new document type "page"
2. Add slug (e.g., "/impressum")
3. Select sections
4. Publish

### Update Text Content

1. Go to Sanity Studio
2. Find document
3. Edit text field
4. Publish

### Add Photo

1. In Sanity Studio, click upload in image field
2. Select from computer
3. Wait for upload
4. Publish

### Change Brand Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#YOUR_DARKER_COLOR',
  },
}
```

---

## Troubleshooting

### "Build failed"

Check:
- `.env.local` has correct Sanity credentials
- No TypeScript errors: `npm run build`

### "Changes not showing"

1. Check if published in Sanity
2. Hard refresh browser (Cmd+Shift+R)
3. Check Vercel deployment status

### "Can't log into Sanity"

- Client needs invite email from owner
- Check spam folder
- Reset password if needed

---

## Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local server |
| `npm run build` | Production build |
| `npm run lint` | Check code |
| `npm run test:run` | Run tests |

---

## File Locations

| What | Where |
|------|-------|
| Components | `/src/components/` |
| Schemas | `/src/sanity/schemas/` |
| Templates | `/src/templates/` |
| Docs | `/docs/` |

---

## Time Estimates

| Task | Time |
|------|------|
| New client setup | 15 min |
| Content entry | 1-2 hrs |
| Customization | 30 min |
| Deploy | 15 min |
| **Total** | **~2-3 hrs** |