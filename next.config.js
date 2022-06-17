/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    GRAPHQL:"https://reflow-demo.dyne.org/api/graphql",
  }
}

module.exports = nextConfig
