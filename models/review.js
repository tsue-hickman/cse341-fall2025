const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/connect');

const create = async (reviewData) => {
  const db = getDatabase();
  return await db.collection('reviews').insertOne(reviewData);
};

const findByMovieId = async (movieId) => {
  const db = getDatabase();
  return await db.collection('reviews').find({ movieId }).toArray();
};

module.exports = { create, findByMovieId };