const { body, param, validationResult } = require('express-validator');

// middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array() 
    });
  }
  next();
};

// validation rules for creating a movie
const validateCreateMovie = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  
  body('genre')
    .trim()
    .notEmpty().withMessage('Genre is required')
    .isLength({ min: 2, max: 50 }).withMessage('Genre must be between 2 and 50 characters'),
  
  body('year')
    .notEmpty().withMessage('Year is required')
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage(`Year must be between 1888 and ${new Date().getFullYear() + 5}`),
  
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10'),
  
  body('director')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Director name must be less than 100 characters'),
  
  handleValidationErrors
];

// validation rules for updating a movie
const validateUpdateMovie = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  
  body('genre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Genre must be between 2 and 50 characters'),
  
  body('year')
    .optional()
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage(`Year must be between 1888 and ${new Date().getFullYear() + 5}`),
  
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10'),
  
  body('director')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Director name must be less than 100 characters'),
  
  handleValidationErrors
];

// validation for MongoDB ObjectId
const validateObjectId = [
  param('id')
    .isMongoId().withMessage('Invalid movie ID format'),
  
  handleValidationErrors
];

module.exports = {
  validateCreateMovie,
  validateUpdateMovie,
  validateObjectId
};