const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { getDatabase } = require('../db/connect');

// serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const { ObjectId } = require('mongodb');
    const db = getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// configure GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDatabase();
        
        // check if user already exists
        let user = await db.collection('users').findOne({ githubId: profile.id });
        
        if (!user) {
          // create new user if doesn't exist
          const newUser = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            avatarUrl: profile.photos?.[0]?.value || null,
            createdAt: new Date()
          };
          
          const result = await db.collection('users').insertOne(newUser);
          user = { ...newUser, _id: result.insertedId };
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;