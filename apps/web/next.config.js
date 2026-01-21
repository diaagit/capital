/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: 'export',
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
