export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
}