import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'AI Website Factory',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})