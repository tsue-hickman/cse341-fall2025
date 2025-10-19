const express = require('express');
const router = express.Router();

// swagger docs route
router.use('/api-docs', require('./swagger'));

// movie routes (replacing temple routes)
router.use('/movies', require('./movies'));

// home route - just shows a message
router.get('/', (req, res) => {
  res.send('Welcome to the Movie Tracker API');
});

module.exports = router;