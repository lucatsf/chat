/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['assets.vercel.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
