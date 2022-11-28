/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["static.wikia.nocookie.net", "www.taiwangun.com"]
  }
}

module.exports = nextConfig
