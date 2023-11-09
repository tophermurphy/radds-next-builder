/** @type {import('next').NextConfig} */

const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withExportImages = require('next-export-optimize-images');

const nextConfig = {
  output: "export",
  reactStrictMode: true,

  //? If I need another Sass File
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  images: {
    //TODO unoptimized: true  set for error issue
    // unoptimized: true,


    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "2112",
        pathname: "/media/**",
      },
    ],
  },

};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
