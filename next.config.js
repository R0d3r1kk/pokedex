// this goes into next.config.js
const webpack = require("webpack");
const isDev = process.env.POKE_ENV === 'development'

const nextConfig =  {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['three'],
  env: {
    POKE_ENV: process.env.POKE_ENV,
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(new webpack.DefinePlugin(process.env));

    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.(glsl|vs|fs|frag|vert)$/,
      exclude: '/node_modules',
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
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

module.exports = nextConfig;