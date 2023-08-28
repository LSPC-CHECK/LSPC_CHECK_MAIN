const express = require('express');
const router  = express.Router();
const {sendPasswordResetEmail}= require('../controllers/passwordReset.controller');
const auth = require('../middleware/auth');

router.post('/forgot-password', auth.verifyToken, sendPasswordResetEmail);

module.exports = router;