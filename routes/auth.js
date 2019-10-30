var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user_model');

router.get('/bnet', passport.authenticate('bnet'));

router.get('/bnet/callback', 
passport.authenticate('bnet', { failureRedirect: '/' }),
(req, res) => {
    if(req.user){
        User.findOne({ battletag: req.user.battletag }).then((user) =>{
            if(!user.displayRank){
                res.redirect('/users/new')
            }
            else{
                req.user.displayRank = user.displayRank;
                req.user.tankSR = user.tankSR;
                req.user.dpsSR = user.dpsSR;
                req.user.supportSR = user.supportSR;
                res.redirect('/users/profile');
            }
        }).catch((err) => { console.log(err); });
    }
});

module.exports = router;