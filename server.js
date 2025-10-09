const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(bodyParser.json());

// middleware for handling CORS - allows requests from other domains
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// use routes
app.use('/', require('./routes'));

// connect to database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server is running on port ${port}`);
    });
  }
});