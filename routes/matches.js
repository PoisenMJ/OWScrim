var express = require('express');
var router = express.Router();

var Matches = require('../models/match_model');

const authCheck = (req, res, next) => {
    if(!req.user) res.redirect('/');
    else next();
;}

router.get('/', authCheck, (req, res) => {
    // Filter for matches with available positions and sort by date
    Matches.find({ positionsLeft: { $gt: 0 }}, { sort: '-timeCreated' }, (matches) => {
        console.log('Matches: ' + matches);
        res.render('matches', { matches, battletag: req.user.battletag, loggedIn: true })
    });
});

router.get('/create', authCheck, (req, res) => {
    res.render('creatematch', { battletag: req.user.battletag, loggedIn: true });
});

module.exports = router;