import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL)
const db = client.db('Suncart_DB')

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  
  secret: process.env.BETTER_AUTH_SECRET,

  user: {
    changeEmail: {
      enabled: true,
    }
  }
})