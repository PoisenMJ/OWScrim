var express = require('express');
var router = express.Router();

var Match = require('../models/match_model');
var Player = require('../models/player_model');
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
    
    var player = new Player({
        battletag: req.user.battletag,
        SR: req.user.tankSR, // BUG: THIS NEEDS CHANGING
        role: role,
        team: 'Team 1'
    });
    var match = new Match({
        creator: req.user.battletag,
        rankRequired: matchRank,
        players: [player],
        map: map
    }).save((err, doc) => {
        res.redirect('/matches');
    });
});

router.get('/:id', authCheck, (req, res) => {
    res.send('Match');
});


//
//
// LOOK AT HOW I HANDLED CLICKING DIV TO GO TO MATCH AND USE THAT TO CHANGE HOW I IMPLEMENT CREATE MATCH
// 
//
//






module.exports = router;