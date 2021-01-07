module.exports = {
  images: {
    domains: ["cdn11.bigcommerce.com"],
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
