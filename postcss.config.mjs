// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      disableBundleChunkingOptimizations: false, // Enable optimizations
      minify: true, // Minify in production
    },
  },
};

export default config;