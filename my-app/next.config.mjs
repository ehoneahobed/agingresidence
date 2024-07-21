/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Adjust this as per your specific needs
      },
      {
        protocol: 'https',
        hostname: 'agingresidence.com',
        port: '',
        pathname: '/listing_images/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/all-categories-2/',
        destination: '/categories/',
        permanent: false,
      },
      // {
      //   source: '/all-locations-2/',
      //   destination: '/all-locations/',
      //   permanent: true,
      // },
      // Add more redirects here
    ];
  },
};

export default nextConfig;
