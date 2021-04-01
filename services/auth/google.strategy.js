const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function() {
    passport.use(
        new GoogleStrategy({
            callbackURL: '/auth/google/callback',
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }, async function(req, accessToken, refreshToken, profile, done) {
            try {
                const existingUser = null;
                if (existingUser) {
                return done(null, existingUser);
                }
                const user = {
                    id: 1,
                    name: 'Dane'
                }
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        })
    );
}