const express = require('express');
const router = express.Router();

// Auth routes
router.use('/auth', require('./auth'));

// Swagger docs
router.use('/api-docs', require('./swagger'));

// Movies routes (public)
router.use('/movies', require('./movies'));

// Home route
router.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to CSE 341 Movies API',
    endpoints: {
      auth: '/auth/github',
      docs: '/api-docs',
      movies: '/movies'
    }
  });
});

module.exports = router;