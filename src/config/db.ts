import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbInstance: Db | null = null;

export async function connectDB(): Promise<Db> {
  try {
    if (dbInstance) return dbInstance;
    
    await client.connect();
    dbInstance = client.db('gymEngine');
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return dbInstance;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export function getDB(): Db {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return dbInstance;
}
