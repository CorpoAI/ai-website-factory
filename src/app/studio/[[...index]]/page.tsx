'use client'

import dynamic from 'next/dynamic'

const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Studio...</p>
      </div>
    </div>
  ),
})

function StudioPlaceholder() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Sanity Studio</h1>
        <p className="text-gray-600">Configure NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local</p>
      </div>
    </div>
  )
}

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  
  if (!projectId || projectId === 'demo') {
    return <StudioPlaceholder />
  }
  
  const config = {
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/studio',
  }
  
  return <NextStudio config={config} />
}