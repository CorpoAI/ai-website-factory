import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId || projectId === 'your-project-id') {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
}

export default defineConfig({
  name: 'default',
  title: 'AI Website Factory',
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})