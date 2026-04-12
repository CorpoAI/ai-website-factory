/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    optimizePackageImports: ['@sanity/icons'],
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig