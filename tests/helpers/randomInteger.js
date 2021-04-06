
/**
 * Generates a random integer between min and max,
 * both inclusive.
 * @param {Number} min - The inclusive lower bound
 * @param {Number} max - The inclusive upper bound
 * @returns A random integer 
 */
module.exports = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}