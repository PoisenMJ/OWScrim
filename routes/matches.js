var express = require('express');
var router = express.Router();

var Match = require('../models/match_model');
var keys = require('../config/keys');

const authCheck = (req, res, next) => {
    if(!req.user) res.redirect('/');
    else next();
};

router.get('/', authCheck, (req, res) => {
    // Filter for matches with available positions and sort by date
    Match.find({ positionsLeft: { $gt: 0 }}).sort({ timeCreated: -1}).exec((err, matches) => {
        for(var i in matches){
            matches[i].mapURL = '/images/maps/' + keys.maps.mapToImage[matches[i].map];
            matches[i].rankURL = '/images/' + keys.ranks.rankToImage[matches[i].rankRequired];
        }
        res.render('matches', { matches, battletag: req.user.battletag, loggedIn: true })
    });
});

router.get('/create', authCheck, (req, res) => {
    var name = req.user.battletag.split('#')[0];
    res.render('creatematch', { 
        name, 
        battletag: req.user.battletag, 
        tankSR: req.user.tankSR,
        dpsSR: req.user.dpsSR,
        supportSR: req.user.supportSR,
        loggedIn: true 
    });
});

router.post('/create', authCheck, (req, res) => {
    var role = req.body.roleselect;
    var matchRank = req.body.matchrank;
    var map = req.body.mapselect;
    var sr = (role == 'tank') ? req.user.tankSR : (role == 'dps') ? req.user.dpsSR : req.user.supportSR;

    var match = new Match({
        creator: req.user.battletag,
        rankRequired: matchRank,
        players: {
            battletag: req.user.battletag,
            SR: sr,
            role: role,
            team: 'Team 1'
        },
        map: map
    }).save((err, doc) => {
        res.redirect('/matches');
    });
});

router.get('/:id', authCheck, (req, res) => {
    Match.findOne({ _id: req.params.id }, (err, match) => {
        for(var i in match.players){
            match.players[i].roleURL = keys.roles.roleToImage[match.players[i].role];
        }
        res.render('singlematch', { match, battletag: req.user.battletag ,loggedIn: true });
    });
});

module.exports = router;