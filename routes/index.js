const express = require('express');
const router = express.Router();

// swagger docs route
router.use('/api-docs', require('./swagger'));

// temple routes
router.use('/temples', require('./temples'));

// home route - just shows a message
router.get('/', (req, res) => {
  res.send('Welcome to the CSE 341 Temples API');
});

module.exports = router;