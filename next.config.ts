import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/my-nelayan/' : '',
  basePath: isProd ? '/my-nelayan' : '',
  output: 'export'
};

export default nextConfig;
