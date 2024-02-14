/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'planship-samples.s3.us-west-2.amazonaws.com'
      }
    ]
  },
  reactStrictMode: false
}

module.exports = nextConfig
