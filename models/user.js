const { getDatabase } = require('../db/connect');

const create = async (userData) => {
  const db = getDatabase();
  return await db.collection('users').insertOne(userData);
};

const findByGithubId = async (githubId) => {
  const db = getDatabase();
  return await db.collection('users').findOne({ githubId });
};

module.exports = { create, findByGithubId };