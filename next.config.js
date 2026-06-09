const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/webp'] },
  // Pin root so Next.js doesn't get confused by the lockfile in the parent dir
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }]
    return config
  },
}
module.exports = nextConfig
