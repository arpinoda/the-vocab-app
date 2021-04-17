const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { userController } = require('../../controllers');

module.exports = function() {
    passport.use(
        new GoogleStrategy({
            callbackURL: '/auth/google/callback',
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }, async function(req, accessToken, refreshToken, profile, done) {
            try {
                const existingUser = await userController.findByGoogleId(profile.id);
                
                if (existingUser) {
                    return done(null, existingUser);
                }

                let photo = '';

                const { id, displayName, photos } = profile;

                if (photos.length > 0) {
                    photo = photos[0].value;
                }

                const user = await userController.createUser({googleId: id, displayName, photo});

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        })
    );
}