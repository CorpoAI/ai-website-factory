# Deployment Guide - AI Website Factory

## Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy: ClientName"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import from GitHub: `CorpoAI/ai-website-factory`
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`

3. **Environment Variables**
   Add in Vercel dashboard:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your-project-id
   NEXT_PUBLIC_SANITY_DATASET = production
   ```

4. **Deploy**
   - Vercel auto-deploys on push
   - Custom domain can be added in settings

---

### Option 2: CLI Deploy

```bash
npm i -g vercel
vercel --prod
```

---

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Sanity Studio accessible at `/studio`
- [ ] Contact form submits successfully
- [ ] Dynamic content renders from Sanity
- [ ] Mobile responsive design works
- [ ] SEO meta tags configured
- [ ] Custom domain (if applicable) points to site

---

## Troubleshooting

### "Page not found" / 404
- Check if page exists in Sanity with correct slug
- Verify `.env.local` has correct project ID

### "Studio not loading"
- Check Sanity project is active
- Verify API tokens if required

### "Form not working"
- Check `/api/contact` endpoint responds
- Verify Sanity write token configured

### Build fails
- Run `npm run build` locally to check errors
- Ensure all env vars are set

---

## Custom Domain

1. In Vercel: Settings → Domains
2. Add your domain (e.g., `clientbusiness.de`)
3. Update DNS records as instructed
4. SSL auto-provisions in ~1 minute

---

## Sanity Studio

Access at: `https://yoursite.vercel.app/studio`

**Initial setup:**
1. Create project at [sanity.io/manage](https://www.sanity.io/manage)
2. Get Project ID
3. Add to Vercel environment variables
4. Deploy - Studio auto-connects

**Invite clients:**
1. In Sanity Studio: Settings → Members
2. Invite by email
3. Client gets access to edit content only