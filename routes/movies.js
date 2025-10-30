// routes/movies.js
const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
// Reviews routes (protected)
router.use('/reviews', require('./reviews'));

// Watchlists routes (protected)
router.use('/watchlists', require('./watchlists'));

// GET all movies
router.get('/', moviesController.getAllMovies);

// GET single movie
router.get('/:id', moviesController.getMovieById);

// POST create movie
router.post('/', moviesController.createMovie);

// PUT update movie
router.put('/:id', moviesController.updateMovie);

// DELETE movie
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;