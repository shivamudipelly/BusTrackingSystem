const express = require('express');
const  router = express.Router();
const jwt = require('jsonwebtoken');
const authControllers = require('../controllers/authControllers')

router.post('/login', authControllers.loginPost)

router.post('/signup', authControllers.signupPost)

router.post('/forgotPassword', authControllers.forgotPasswordPost)

router.post('/resetPassword/:token',authControllers.resetPasswordPost)

router.get('/logout', authControllers.logoutGet)

router.get('/map/:busId', authControllers.mapGet)

router.get('/islogin',authControllers.isLoginGet)

module.exports = router;