import { MongoClient } from 'mongodb';
import { config } from './config.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a MongoDB client with fallback options
const mongoUri = process.env.MONGO_URI || config.mongoUri || 'mongodb://localhost:27017/infosystem';

console.log(`Connecting to MongoDB at: ${mongoUri.replace(/\/\/([^:]+):[^@]+@/, '//***:***@')}`); // Hide credentials in logs

// Connection options with retry
const client = new MongoClient(mongoUri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  // Add retry logic
  serverSelectionTimeoutMS: 30000,
});

// Initialize connection function
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB connection established successfully');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Try to reconnect after delay
    console.log('Attempting to reconnect in 5 seconds...');
    setTimeout(connectToDatabase, 5000);
    return null;
  }
}

export { client, connectToDatabase };