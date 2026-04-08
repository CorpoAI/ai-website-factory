#!/usr/bin/env node
/**
 * Client Setup Script - Automates new client onboarding
 * Usage: node scripts/setup-client.js
 * 
 * This script:
 * 1. Creates .env.local with provided Sanity credentials
 * 2. Installs dependencies
 * 3. Seeds template data
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(text) {
  return new Promise(resolve => readline.question(text, resolve))
}

async function setup() {
  console.log('\n=== AI Website Factory - Client Setup ===\n')

  const projectId = await question('Sanity Project ID: ')
  if (!projectId.trim()) {
    console.error('Error: Project ID is required')
    process.exit(1)
  }

  const dataset = await question('Sanity Dataset (default: production): ')
  const datasetValue = dataset.trim() || 'production'

  console.log('\nAvailable templates:')
  console.log('  1. construction - German construction company')
  console.log('  2. restaurant   - German restaurant/café')

  const template = await question('Template (1 or 2): ')
  const templateMap = { '1': 'construction', '2': 'restaurant' }
  const templateValue = templateMap[template] || 'construction'

  console.log('\n--- Creating environment config ---')
  const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId.trim()}
NEXT_PUBLIC_SANITY_DATASET=${datasetValue}
`

  fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent)
  console.log('✓ Created .env.local')

  console.log('\n--- Installing dependencies ---')
  try {
    execSync('npm install', { stdio: 'inherit' })
    console.log('✓ Dependencies installed')
  } catch (error) {
    console.error('Error installing dependencies:', error.message)
    process.exit(1)
  }

  console.log('\n--- Seeding template data ---')
  try {
    execSync(`npm run seed ${templateValue}`, { stdio: 'inherit' })
    console.log('✓ Template data seeded')
  } catch (error) {
    console.error('Error seeding data:', error.message)
    console.log('\nNote: You can run "npm run seed" later after configuring Sanity credentials')
  }

  console.log('\n=== Setup Complete ===\n')
  console.log('Next steps:')
  console.log('1. Run "npm run dev" to start development server')
  console.log('2. Go to http://localhost:3000/studio to edit content')
  console.log('3. Customize content in Sanity Studio')
  console.log('4. Deploy to Vercel when ready\n')

  readline.close()
}

setup().catch(error => {
  console.error('Setup failed:', error)
  process.exit(1)
})