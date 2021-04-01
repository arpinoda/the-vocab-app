var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

authRouter.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

authRouter.route('/google/callback')
    .get(passport.authenticate('google'), function (req, res) {
        res.redirect('/');
    });

authRouter.route('/current-session')
    .get(function(req, res) {
        res.send(req.user);
    });

authRouter.route('/logout')
    .get(function(req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = authRouter;