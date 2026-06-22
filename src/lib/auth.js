import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import dns from 'node:dns'

// Force Node.js to use public DNS servers to properly resolve MongoDB SRV records
dns.setServers(['1.1.1.1', '8.8.8.8'])

const client = new MongoClient(process.env.MONGODB_URL || "")
const db = client.db('SunCart_DB')

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_validation_only",

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              id: user.id || new Date().getTime().toString()
            }
          }
        }
      }
    }
  },

  emailAndPassword: {
    enabled: true
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
})