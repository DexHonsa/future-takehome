import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images (if using Next.js Image component in future)
  images: {
    domains: [
      'candidate.staging.future.co', // API domain for exercise images/videos
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables (making them available to client if needed)
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        // Cache static assets
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects (already handled in app/page.tsx but can be configured here)
  async redirects() {
    return [
      {
        source: '/',
        destination: '/exercises',
        permanent: false,
      },
    ];
  },

  // Webpack configuration for any custom needs
  webpack: (config) => {
    // Handle videos and other media files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },

  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  
  // Turbopack is already enabled via package.json scripts
  // No need to add experimental.turbo here
};

export default nextConfig;
