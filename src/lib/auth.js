import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import dns from 'node:dns'

// Force Node.js to use public DNS servers to properly resolve MongoDB SRV records
console.log('[Auth] Setting DNS servers to 1.1.1.1 and 8.8.8.8');
dns.setServers(['1.1.1.1', '8.8.8.8']);
console.log('[Auth] Active DNS servers:', dns.getServers());

let client

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(process.env.MONGODB_URL || "", {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    })
  }
  client = global._mongoClient
} else {
  client = new MongoClient(process.env.MONGODB_URL || "", {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10
  })
}

const db = client.db('SunCart_DB')

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_validation_only",

  advanced: {
    generateId: true
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