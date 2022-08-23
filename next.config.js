// this goes into next.config.js
const isDev = process.env.POKE_ENV === 'development'

module.exports = {
    reactStrictMode: true,
    env: {
        POKE_ENV: process.env.POKE_ENV
    },
    webpack: config => {
        if (isDev) {
          return config;
        }
    
        return {
          ...config,
          externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        };
      },
  };