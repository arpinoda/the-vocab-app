const express = require('express');
const router = express.Router();
const { wordController } = require('../controllers');
const requireLogin = require('../middlewares/requireLogin');

router.use(requireLogin);

router.route('/words')
    .get(wordController.getAllWords)
    .delete(wordController.deleteWord)
    .post(wordController.createWord);

module.exports = router