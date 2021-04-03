const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {

    // call the route handler
    await next(); 
    // afterwards, execution returns here
    clearHash(req.user.id)

}