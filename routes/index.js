const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

// lesson 1 routes
routes.get('/', lesson1Controller.emilyRoute);
routes.get('/hannah', lesson1Controller.hannahRoute); 

// New contacts routes for week 2
routes.use('/contacts', require('./contacts'));

module.exports = routes;