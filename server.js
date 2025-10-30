const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and server running on port ${port}`);
    });
  }
});

// Export app for testing
module.exports = app;
