/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@sanity/icons'],
  },
  images: {
    domains: ['cdn.sanity.io', 'localhost'],
  },
}

module.exports = nextConfig