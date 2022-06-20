/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        GRAPHQL: "https://reflow-demo.dyne.org/api/graphql",
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            process: false,
            path: false,
            crypto: false,
        };

        return config;
    },
}

module.exports = nextConfig