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
            if(!user.rank){
                res.redirect('/users/new')
            }
            else{
                res.redirect('/');
            }
        }).catch((err) => { console.log(err); });
    }
});

module.exports = router;