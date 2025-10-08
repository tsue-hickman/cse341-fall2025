const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
});

let db;

async function connectDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('cse341'); // Use the 'cse341' database
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to get the database instance
function getDB() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

// Export the connect and get functions
module.exports = { connectDB, getDB };