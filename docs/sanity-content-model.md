# Sanity Content Model Proposal

## Overview
This document outlines a minimal, multilingual-ready content model for small business websites.

## Core Schemas

### 1. Page
```typescript
// page.ts
{
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'sections', type: 'array', title: 'Sections', of: [
      { type: 'hero' },
      { type: 'about' },
      { type: 'services' },
      { type: 'testimonials' },
      { type: 'faq' },
      { type: 'contact' },
      { type: 'cta' }
    ]},
    { name: 'seo', type: 'seo' }
  ]
}
```

### 2. Site Settings
```typescript
// siteSettings.ts
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Site Title' },
    { name: 'logo', type: 'image', title: 'Logo' },
    { name: 'contactEmail', type: 'string', title: 'Contact Email' },
    { name: 'contactPhone', type: 'string', title: 'Contact Phone' },
    { name: 'address', type: 'string', title: 'Address' },
    { name: 'socialLinks', type: 'array', of: [{ type: 'socialLink' }] },
    { name: 'defaultSeo', type: 'seo' }
  ]
}
```

### 3. SEO (reusable)
```typescript
// seo.ts
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string', title: 'Meta Title' },
    { name: 'metaDescription', type: 'text', title: 'Meta Description' },
    { name: 'ogImage', type: 'image', title: 'Open Graph Image' }
  ]
}
```

### 4. Hero Section
```typescript
// hero.ts
{
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'subtitle', type: 'text', title: 'Subtitle' },
    { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
    { name: 'ctaLink', type: 'string', title: 'CTA Link' },
    { name: 'backgroundImage', type: 'image', title: 'Background Image' }
  ]
}
```

### 5. Services (editable by client)
- Title and description editable
- Icon selection from predefined set
- Ordering via drag-and-drop

### 6. Testimonials
```typescript
{
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'role', type: 'string', title: 'Role/Company' },
    { name: 'text', type: 'text', title: 'Testimonial' },
    { name: 'photo', type: 'image', title: 'Photo (optional)' }
  ]
}
```

### 7. FAQ
```typescript
{
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    { name: 'question', type: 'string', title: 'Question' },
    { name: 'answer', type: 'text', title: 'Answer' }
  ]
}
```

## Multilingual Support

### Approach
Use Sanity's built-in i18n with field-level translations for key content:

- Page title, content
- Hero title, subtitle
- Services descriptions
- FAQ questions/answers
- Testimonials

### Language Codes
- `pl` - Polish
- `de` - German  
- `en` - English (default)

## What Clients Can Edit

| Content | Client Editable |
|---------|----------------|
| Page content | Yes |
| Hero text | Yes |
| Services list | Yes |
| Testimonials | Yes |
| FAQ items | Yes |
| Contact info | Yes |
| SEO meta | Yes |
| Site logo | Yes |

## What Stays in Code

- Component structure
- Styling system
- Layout templates
- Animation definitions
- Responsive breakpoints
- Typography system

## Future Extensibility

The model can be extended with:
- Blog/news section
- Portfolio gallery
- Team members
- Pricing tables
- Before/after galleries

Start simple, add as needed.