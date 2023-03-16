import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'

export default NextAuth({
  session: { strategy: 'jwt' }, //this is what enables credentials user/pass to work
  maxAge: 30 * 24 * 60 * 60, // 30 days
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return '/dashboard'
      // Allows relative callback URLs
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    }),

    EmailProvider({
      server: process.env.EMAIL_SERVER,
      // from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let user
        if (credentials.username == 'developer') {
          user = {
            id: 1,
            name: 'developer',
            image: '',
            email: 'developer@email.com',
          }
          return user
        }
        if (credentials.username == 'admin') {
          user = { id: 2, name: 'admin', image: '', email: 'admin@email.com' }
          return user
        }
        if (credentials.username == 'user') {
          user = { id: 3, name: 'user', image: '', email: 'user@email.com' }
          return user
        }
        if (credentials.username == 'manager') {
          user = {
            id: 4,
            name: 'manager',
            image: '',
            email: 'manager@email.com',
          }
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (user?.account?.provider !== 'email') {
        // Skip this callback for other providers
        console.log("Skipping callback for provider: " + user?.account?.provider)
        return true;
      } else {
        const email = user?.user?.email
        const { db } = await connectToDatabase(process.env.MONGODB_DB)
        const users = db.collection('users')
        const existingUser = await users.findOne({ email })
        console.log('🚀  existingUser:', existingUser)
        if (existingUser) {
          // User already exists, do not insert again
          return true
        } else {
          const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            email?.split('@')[0]
          )}&background=007bff&color=fff&size=256&font-size=0.5&rounded=true`
          await users.insertOne({
            email,
            image: imageUrl,
            role: 'User',
            name: email?.split('@')[0],
          })
          return true
        }
      }

     
    },
    async redirect(url, baseUrl) {
      console.log("🚀 ~ file: [...nextauth].js:118 ~ redirect ~ baseUrl:", baseUrl)
      // Redirect the user to the dashboard page
      return '/dashboard';
    },
  },
 

  adapter: MongoDBAdapter(clientPromise),
  pages: {
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
})
