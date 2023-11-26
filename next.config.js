/** @type {import('next').NextConfig} */

const path = require("path");



let nextConfig = {
  reactStrictMode: true,

  //? If I need another Sass File
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  images: {
    unoptimized: true,
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

if(process.env.NODE_ENV === 'production'){
  nextConfig.output = 'export'
}

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
