import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL || "")
const db = client.db('Suncart_DB')

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_validation_only",

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