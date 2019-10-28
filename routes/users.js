var express = require('express');
var router = express.Router();

var User = require('../models/user_model')
var getSR = require('../config/overwatch');
var keys = require('../config/keys');

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/');
  } else{
    next();
  }
};

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', (req, res) => {
  all = getSR(req.user.battletag).then((results) => {
    tsr = results[0];
    dsr = results[1];
    ssr = results[2];
    playerIcon = results[3];
    playerLevl = results[4];
    req.user.playerIcon = playerIcon;
    res.render('newuser', { tankSR: tsr, dpsSR: dsr, supportSR: ssr, battletag: req.user.battletag, loggedIn: true });

    // IF PRIVATE SEND STRING PRIVATE
    // GIVE OPTIONS TO CHANGE PLAYER PROFILE IMAGE
  })
});

router.post('/new', (req, res) => {
  tankSR = req.body.tankSR;
  dpsSR = req.body.dpsSR;
  supportSR = req.body.supportSR;
  displayRank = req.body.rankselect;
  battletag = req.body.battletag; 
  profileImage = req.user.playerIcon;
  // { tankSR, dpsSR, supportSR } = req.body;
  console.log(req.user.playerIcon);
  User.updateOne({ battletag }, 
    { $set: { displayRank,tankSR,dpsSR,supportSR,profileImage }},
    (article, err) => {
      res.redirect('/users/profile');
    });
});

router.get('/profile', authCheck, (req, res) => {
  User.findOne({ battletag: req.user.battletag }, (err, user) => {
    playerIcon = user.profileImage;
    tankSR = user.tankSR;
    dpsSR = user.dpsSR;
    supportSR = user.supportSR;
    displayRank = user.displayRank;
    battletag = user.battletag
    displayRank = '/images/' + keys.ranks.rankToImage[displayRank];
    res.render('profile', { playerIcon, tankSR, dpsSR, supportSR, displayRank, battletag, loggedIn: true });

    // SHOW RANK ICON OR PLATFORM OR REGION IN PROFILE ETC
  });
});

module.exports = router;
