const randomInteger = require('./randomInteger');

/**
 * Creates an alpha-numeric string of specified length
 * @param {Number} length The number of characters included
 * within the string
 * @returns A string
 */
module.exports = (length = 5) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for ( let i = 0; i <= length && i < characters.length; i++ ) {
        let randomIndex = randomInteger(0, characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}