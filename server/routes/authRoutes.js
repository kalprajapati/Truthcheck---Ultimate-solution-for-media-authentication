const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    forgotPassword,
    verifyCode,
    resetPassword
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.post('/verifycode', verifyCode);
router.post('/resetpassword', resetPassword);

module.exports = router;
