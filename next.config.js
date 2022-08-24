const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    reactStrictMode: true,
    env: {
        GRAPHQL: "http://65.109.11.42:8000/api",
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