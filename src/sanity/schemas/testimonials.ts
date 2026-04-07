import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role/Company', type: 'string' }),
            defineField({ name: 'text', title: 'Testimonial', type: 'text' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image' }),
          ],
        },
      ],
    }),
  ],
})