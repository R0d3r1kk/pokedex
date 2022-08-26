// this goes into next.config.js
const isDev = process.env.POKE_ENV === 'development'

module.exports = {
  reactStrictMode: true,
  env: {
    POKE_ENV: process.env.POKE_ENV,
  },
  webpack: (config) => {
    if (isDev) {
      return config;
    }

    config.rmodule.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return {
      ...config,
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    };
  },
};