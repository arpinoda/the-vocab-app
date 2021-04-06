const Keygrip = require('keygrip');
const { Buffer } = require('safe-buffer');
const keygrip = new Keygrip([process.env.COOKIE_KEY]);

/**
 * Generates a fake session object containing session and
 * signature values
 * @param {User} user A mongoose model
 * @returns Representation of an authenticated session
 */
module.exports = (user) => {

    const sessionObject = {
        passport: {
            user: user._id.toString(),
        }
    };
    const session = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    // Sign the session with keygrip
    const sig = keygrip.sign(`express:sess=${session}`);

    return { session, sig };
}
