var express = require('express');
var router = express.Router();

var Match = require('../models/match_model');
var keys = require('../config/keys');
var rankCheck = require('../public/javascripts/sr');

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
            iconURL: req.user.profileImage,
            team: 'Team 1'
        },
        map: map
    }).save((err, doc) => {
        res.redirect('/matches');
    });
});

router.get('/:id', authCheck, (req, res) => {
    Match.findOne({ _id: req.params.id }, (err, match) => {
        var inMatch = false;
        for(var i in match.players){
            match.players[i].roleURL = keys.roles.roleToImage[match.players[i].role];
            if(match.players[i].battletag == req.user.battletag) inMatch = true;
        }
        match.mapURL = '/images/maps/' + keys.maps.mapToImage[match.map];
        var tankRank = rankCheck(req.user.tankSR);
        var dpsRank = rankCheck(req.user.dpsSR);
        var supportRank = rankCheck(req.user.supportSR);

        res.render('singlematch', { 
            inMatch,
            tankRank, 
            dpsRank, 
            supportRank, 
            match, 
            battletag: req.user.battletag, 
            loggedIn: true 
        });
    });
});

router.get('/:id/join/:role', authCheck, (req, res) => {
    Match.findOne({ _id: req.params._id }, (err, match) => {
        for(var i in match.players){
            // Check if the player is already in the match
            //if(match.players[i].battletag == req.user.battletag){
            //    res.redirect(`/matches/${req.params._id}`);
            //}
            //else{


                Match.updateOne({ _id: req.params._id },
                    { $set: { players: {
                        battletag: req.user.battletag,
                        SR: 0
                    }}} )
            //}
        }
    });
    res.send('joined');
});

router.get('/:id/leave', authCheck, (req, res) => {
    res.send('left');
});

module.exports = router;