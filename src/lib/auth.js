import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL)

const db = client.db('SunCart_DB')

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true
  }
})