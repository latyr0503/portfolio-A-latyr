/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    MEDIA_URL: process.env.MEDIA_URL,
  },

  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        protocol: 'http',
      },
    ],
  },
}
