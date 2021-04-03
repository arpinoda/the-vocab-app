const express = require('express');
const router = express.Router();
const { wordController } = require('../controllers');
const requireLogin = require('../middlewares/requireLogin');
const clearCache = require('../middlewares/clearCache');

router.use(requireLogin);

router.route('/words')
    .get(wordController.getAllWords)
    .delete(clearCache, wordController.deleteWord)
    .post(clearCache, wordController.createWord);

module.exports = router