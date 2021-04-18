const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

authRouter.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile']
    }));

authRouter.route('/google/callback')
    .get(passport.authenticate('google'), function (req, res) {
        res.redirect('/');
    });

const stuffDemoDetails = (req, res, next) => {
    let userId = process.env.DEMO_USER_ID;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        userId = mongoose.Types.ObjectId();
    }

    req.body.userId = userId;
    req.body.ignoredPw = process.env.DEMO_USER_PW;

    next(null, req, res);
}

authRouter.route('/local')
    .post(stuffDemoDetails, (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.json({ 
                    status: 'error',
                    message: 'Demo user has been disabled. ' +
                    'Please login with your Google account instead.'
                });
            }

            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                } else {
                    return res.json({ status: 'ok' });
                }
            })
        })(req, res, next);
    });

authRouter.route('/')
    .get(function(req, res) {
        res.send(req.user);
    });

authRouter.route('/logout')
    .get(function(req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = authRouter;