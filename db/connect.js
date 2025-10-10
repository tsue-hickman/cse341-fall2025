const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

// initialize the database connection
const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized');
    return callback(null, database);
  }
  
  // connect to MongoDB using connection string from .env file
  MongoClient.connect(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true
  })
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

// get the database instance
const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};