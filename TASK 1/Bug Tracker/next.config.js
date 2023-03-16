
module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com', 'ui-avatars.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
 },
 async redirects() {
  return [
    {
      source: '/',
      destination: '/auth/email-signin',
      permanent: true,
    },
  ]
},

  reactStrictMode: true,
}
