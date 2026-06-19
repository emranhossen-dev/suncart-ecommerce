import { betterAuth } from "better-auth";
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const auth = betterAuth({
  database: {
    provider: "mongodb",
    mongodb: {
      db: client.db("suncart")
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    }
  }
});