/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (already used)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },

      // OMDb / IMDb posters (Amazon CDN)
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },

      // PosterDB fallback (optional but recommended)
      {
        protocol: "https",
        hostname: "theposterdb.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;