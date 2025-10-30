const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const reviewsController = require('../controllers/reviews');

router.post('/', ensureAuthenticated, reviewsController.createReview);
router.get('/movie/:movieId', reviewsController.getMovieReviews);

module.exports = router;