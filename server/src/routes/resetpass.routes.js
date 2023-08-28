const express = require('express');
const router = express.Router();
const {resetPassword}=require('../controllers/passwordReset.controller');
const auth = require('../middleware/auth');

router.post('/reset-password/:token', auth.verifyToken, resetPassword);


module.exports = router;