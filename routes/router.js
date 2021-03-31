const express = require('express');
const router = express.Router();
const { wordController, authController } = require('../controllers');

router.route('/words')
    .get(
        wordController.getWords
    )
    .post(
        wordController.createWord
    );

router.route('/auth/login/google')
    .get(
        authController.createSession
    );

router.route('/auth/current-session')
    .get(
        authController.getCurrentSession
    );

module.exports = router
