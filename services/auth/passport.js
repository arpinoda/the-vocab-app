const passport = require('passport');
const { userController } = require('../../controllers');

module.exports = function (app) {
    require('./cookieSession')(app);
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        userController.findById(id)
            .then(function(user) {
                done(null, user);
            })
            .catch(error => done(error, null));
    });
    
    require('./google.strategy.js')();
    require('./local.strategy.js')();
};