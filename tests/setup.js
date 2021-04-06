/**
 * Jest setup file. Referenced within package.json
 * "jest.setupFilesAfterEnv"
 */

require('../config')(null);

const mongoose = require('mongoose');
const cache = require('../services/cache');

jest.setTimeout(30000);


const closeAllConnections = async (done) => {
    await mongoose.disconnect();
    await cache.disconnect();
    done();
}

afterAll(closeAllConnections);