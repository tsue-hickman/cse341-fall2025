const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/connect');

const addToWatchlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Must be logged in' });
    }

    const { movieId } = req.body;
    
    const watchlistItem = {
      userId: req.user._id,
      movieId: new ObjectId(movieId),
      addedAt: new Date()
    };

    const db = getDatabase();
    const result = await db.collection('watchlists').insertOne(watchlistItem);
    
    res.status(201).json({ message: 'Added to watchlist', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserWatchlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Must be logged in' });
    }

    const db = getDatabase();
    const watchlist = await db.collection('watchlists')
      .find({ userId: req.user._id })
      .toArray();
    
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addToWatchlist, getUserWatchlist };