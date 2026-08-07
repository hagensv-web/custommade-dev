import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '', // Replace with your GitHub repo name
  assetPrefix: '',
  distDir: 'out',
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    useLightningcss: true
  },
};

export default nextConfig;
