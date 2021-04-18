const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userController } = require('../../controllers');

module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'userId',
            passwordField: 'ignoredPw',
        },
        async function(username, password, done) {
            try {
                const existingUser = await userController.findById(username);
                
                if (existingUser) {
                    return done(null, existingUser);
                }
                
                return done(null, false);
            } catch (err) {
                done(err, null);
            }
        })
    );
}