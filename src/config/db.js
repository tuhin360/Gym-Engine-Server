const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbInstance = null;

async function connectDB() {
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

function getDB() {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return dbInstance;
}

module.exports = { connectDB, getDB };
