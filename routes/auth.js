const express = require('express');
const router = express.Router();
const passport = require('passport');

// GitHub OAuth login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// Success route
router.get('/success', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json({
    message: 'Authentication successful!',
    user: {
      id: req.user._id,
      username: req.user.username,
      displayName: req.user.displayName
    }
  });
});

// Failure route
router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'Authentication failed' });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;