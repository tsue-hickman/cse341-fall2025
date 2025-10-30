const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const watchlistsController = require('../controllers/watchlists');

router.post('/', ensureAuthenticated, watchlistsController.addToWatchlist);
router.get('/my', ensureAuthenticated, watchlistsController.getUserWatchlist);

module.exports = router;