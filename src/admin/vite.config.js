const Vite = require('vite');

const mergeConfig = Vite.mergeConfig || ((baseConfig, extraConfig) => ({ ...baseConfig, ...extraConfig }));

const getAllowedHosts = () => {
  const baselineHosts = ['localhost', '127.0.0.1'];
  const fromEnv = process.env.ADMIN_ALLOWED_HOSTS;

  if (!fromEnv) {
    return [...baselineHosts, 'strapi-moralisimo.onrender.com'];
  }

  const extraHosts = fromEnv
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean);

  return Array.from(new Set([...baselineHosts, ...extraHosts]));
};

const allowedHosts = getAllowedHosts();

module.exports = (config) =>
  mergeConfig(config, {
    server: {
      allowedHosts,
    },
    preview: {
      allowedHosts,
    },
  });
