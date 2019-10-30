var express = require('express');
var router = express.Router();
var keys = require('../config/keys');

const rankCheck = (sr) => {
  Object.keys(keys.ranks.srToRank).forEach((key) => {
      if(sr >= key) return keys.ranks.srToRank[keys];
  })
};

router.get('/rankcheck', (req, res) => {
  return rankCheck(req.body.sr);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/info', (req, res)=>{
  res.send('info');
});

module.exports = router;
