/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/current',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
