const movieModel = require('../models/movie');
const { ObjectId } = require('mongodb');

// GET all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.getAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error in getAllMovies:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve movies',
      message: 'An error occurred while fetching movies from the database'
    });
  }
};

// GET single movie by ID
const getMovieById = async (req, res) => {
  try {
    // check if ID is valid MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        error: 'Invalid movie ID format',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }

    const movie = await movieModel.getById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ 
        error: 'Movie not found',
        message: `No movie exists with ID: ${req.params.id}`
      });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error in getMovieById:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve movie',
      message: 'An error occurred while fetching the movie'
    });
  }
};

// POST create new movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, year, rating, director } = req.body;
    
    // validation is handled by middleware, so we can safely create the movie
    const movieData = { 
      title: title.trim(), 
      genre: genre.trim(), 
      year: parseInt(year),
      rating: rating ? parseFloat(rating) : null,
      director: director ? director.trim() : null,
      createdAt: new Date()
    };
    
    const result = await movieModel.create(movieData);
    
    res.status(201).json({ 
      message: 'Movie created successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error in createMovie:', error);
    res.status(500).json({ 
      error: 'Failed to create movie',
      message: 'An error occurred while saving the movie to the database'
    });
  }
};

// PUT update movie
const updateMovie = async (req, res) => {
  try {
    // check if ID is valid MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        error: 'Invalid movie ID format',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }

    const { title, genre, year, rating, director } = req.body;
    
    // build update object with only provided fields
    const movieData = {};
    if (title) movieData.title = title.trim();
    if (genre) movieData.genre = genre.trim();
    if (year) movieData.year = parseInt(year);
    if (rating !== undefined) movieData.rating = rating ? parseFloat(rating) : null;
    if (director !== undefined) movieData.director = director ? director.trim() : null;
    movieData.updatedAt = new Date();
    
    // check if there's anything to update
    if (Object.keys(movieData).length === 1) { // only updatedAt
      return res.status(400).json({
        error: 'No valid fields to update',
        message: 'Please provide at least one field to update'
      });
    }
    
    const result = await movieModel.update(req.params.id, movieData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        error: 'Movie not found',
        message: `No movie exists with ID: ${req.params.id}`
      });
    }
    
    res.status(200).json({ 
      message: 'Movie updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error in updateMovie:', error);
    res.status(500).json({ 
      error: 'Failed to update movie',
      message: 'An error occurred while updating the movie'
    });
  }
};

// DELETE movie
const deleteMovie = async (req, res) => {
  try {
    // check if ID is valid MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        error: 'Invalid movie ID format',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }

    const result = await movieModel.deleteMovie(req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        error: 'Movie not found',
        message: `No movie exists with ID: ${req.params.id}`
      });
    }
    
    res.status(200).json({ 
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteMovie:', error);
    res.status(500).json({ 
      error: 'Failed to delete movie',
      message: 'An error occurred while deleting the movie'
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};