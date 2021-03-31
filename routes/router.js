const express = require('express');
const router = express.Router();
const path = require('path');
const { wordController } = require('../controllers');

router.route('/words')
    .get(
        wordController.getWords
    )
    .post(
        wordController.createWord
    );

module.exports = router
