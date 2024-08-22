const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
