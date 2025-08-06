/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['bbmdcioziifdgwrmhcjc.supabase.co'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig