// this goes into next.config.js
const isDev = process.env.POKE_ENV === 'development'

module.exports = {
  reactStrictMode: true,
  env: {
    POKE_ENV: process.env.POKE_ENV,
  },
  webpack: (config, { isServer }) => {
    if (isDev) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: { and: [/\.(js|ts|md)x?$/] },
        use: ["@svgr/webpack"],
      });
      return config;
    }

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return {
      ...config,
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/HybridShivam/Pokemon/master/assets/images/**',
        search: '',
      },
    ],
  },
};