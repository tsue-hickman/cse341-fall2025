// controllers/movies.js
const movieModel = require('../models/movie');

// GET all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.getAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await movieModel.getById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create new movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, year, rating, director } = req.body;
    
    // Basic validation
    if (!title || !genre || !year) {
      return res.status(400).json({ error: 'Title, genre, and year are required' });
    }
    
    const movieData = { title, genre, year, rating, director };
    const result = await movieModel.create(movieData);
    
    res.status(201).json({ 
      message: 'Movie created successfully',
      id: result.insertedId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT update movie
const updateMovie = async (req, res) => {
  try {
    const { title, genre, year, rating, director } = req.body;
    const movieData = { title, genre, year, rating, director };
    
    const result = await movieModel.update(req.params.id, movieData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.status(200).json({ message: 'Movie updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE movie
const deleteMovie = async (req, res) => {
  try {
    const result = await movieModel.deleteMovie(req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};