const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/connect');

const addMovie = async (userId, movieId) => {
  const db = getDatabase();
  return await db.collection('watchlists').insertOne({ userId, movieId, addedAt: new Date() });
};

const getUserWatchlist = async (userId) => {
  const db = getDatabase();
  return await db.collection('watchlists').find({ userId }).toArray();
};

module.exports = { addMovie, getUserWatchlist };