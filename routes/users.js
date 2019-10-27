var express = require('express');
var router = express.Router();

var User = require('../models/user_model')
var getSR = require('../config/overwatch');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', (req, res) => {
  all = getSR(req.user.battletag).then((results) => {
    tsr = results[0];
    dsr = results[1];
    ssr = results[2];
    res.render('newuser', { tankSR: tsr, dpsSR: dsr, supportSR: ssr, battletag: req.user.battletag });

    // IF PRIVATE SEND STRING PRIVATE
  })
});

router.post('/new', (req, res) => {
  tankSR = req.body.tankSR;
  dpsSR = req.body.dpsSR;
  supportSR = req.body.supportSR;
  displayRank = req.body.rankselect;
  battletag = req.body.battletag; 
  // { tankSR, dpsSR, supportSR } = req.body;
  console.log(req.body);
  User.updateOne({ battletag }, 
    { $set: { displayRank, tankSR, dpsSR,supportSR}}, 
    (article, err) => {
      res.redirect('/users/profile');
    });
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

module.exports = router;
