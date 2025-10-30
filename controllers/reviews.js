const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/connect');

const createReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Must be logged in to create review' });
    }

    const { movieId, rating, comment } = req.body;
    
    if (!movieId || !rating) {
      return res.status(400).json({ error: 'movieId and rating are required' });
    }

    const review = {
      userId: req.user._id,
      movieId: new ObjectId(movieId),
      rating: parseFloat(rating),
      comment: comment || '',
      createdAt: new Date()
    };

    const db = getDatabase();
    const result = await db.collection('reviews').insertOne(review);
    
    res.status(201).json({ message: 'Review created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const db = getDatabase();
    const reviews = await db.collection('reviews')
      .find({ movieId: new ObjectId(req.params.movieId) })
      .toArray();
    
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReview, getMovieReviews };