// models/movie.js
const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/connect');

const getAll = async () => {
  const db = getDatabase();
  return await db.collection('movies').find().toArray();
};

const getById = async (id) => {
  const db = getDatabase();
  return await db.collection('movies').findOne({ _id: new ObjectId(id) });
};

const create = async (movieData) => {
  const db = getDatabase();
  const result = await db.collection('movies').insertOne(movieData);
  return result;
};

const update = async (id, movieData) => {
  const db = getDatabase();
  const result = await db.collection('movies').updateOne(
    { _id: new ObjectId(id) },
    { $set: movieData }
  );
  return result;
};

const deleteMovie = async (id) => {
  const db = getDatabase();
  const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteMovie
};