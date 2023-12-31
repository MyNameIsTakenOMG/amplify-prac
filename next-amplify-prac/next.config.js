/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    if (isServer && nextRuntime === 'nodejs') {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^(aws-crt|encoding)$/ })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
