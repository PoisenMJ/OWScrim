var passport = require('passport');
var bnetStrategy = require('passport-bnet').Strategy;
var User = require('../models/user_model');
var keys = require('./keys');

// Setup battlenet api strategy with passport
passport.use(new bnetStrategy({
    clientID: keys.battlenet.clientID,
    clientSecret: keys.battlenet.clientSecret,
    callbackURL: 'http://localhost:3000/auth/bnet/callback',
    region: 'eu',
    scope: ['openid']
  }, function(accessToken, refreshToken, profile, done){
    // Check if user already exists
    User.findOne({ battletag: profile.battletag }).then((user) => {
        if(user){
            console.log('User exists: ' + user);
            done(null, user);
        }
        else{
            new User({ 
              battletag: profile.battletag,
              displayRank: 'bronze-rank',
              tankSR: 0,
              dpsSR: 0,
              supportSR: 0
            }).save().then((newUser) => {
                console.log('Created new user: ' + newUser);
                done(null, newUser);
            });
        }
    });
  }));
  
  // Serialize user so can be accessed in req.user
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });