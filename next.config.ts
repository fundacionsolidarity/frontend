import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me', 'source.unsplash.com', 'placehold.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
  
    ignoreBuildErrors: true,
  },
};

export default nextConfig;


// Path: next.config.js

/** @type {import('next').NextConfig} */
