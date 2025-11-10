const Vite = require('vite');

const { mergeConfig } = Vite;

// Ensure the admin panel accepts requests from configured hosts when running behind Render
const parseAllowedHosts = () => {
  const fromEnv = process.env.ADMIN_ALLOWED_HOSTS;
  if (!fromEnv) {
    return ['strapi-moralisimo.onrender.com'];
  }

  return fromEnv
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean);
};

const allowedHosts = parseAllowedHosts();

module.exports = (config) =>
  mergeConfig(config, {
    server: {
      allowedHosts,
    },
    preview: {
      allowedHosts,
    },
  });
