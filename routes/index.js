const apiRouter = require('./apiRouter');
const authRouter = require('./authRouter');

module.exports = function(app) {
    app.use('/auth', authRouter);
    app.use('/api', apiRouter);
}