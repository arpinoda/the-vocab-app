const { firstNames, lastNames } = require('./genericNames');
const randomInteger = require('./randomInteger');

/**
 * Generates a random full name
 * @returns {String} A person's first and last name
 */
module.exports = () => {
    let first, last;

    let index = randomInteger(0, firstNames.length - 1);
    first = firstNames[index];

    index = randomInteger(0, lastNames.length - 1);
    last = lastNames[index];

    return `${first} ${last}`;
}