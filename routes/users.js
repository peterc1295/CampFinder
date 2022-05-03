const express = require('express');
const router = express('router');
const catchAsync = require('../utilities/catchAsync')
const User = require('../models/user.js');
const users = require('../controllers/users.js')
const passport = require('passport')


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate
    (
        'local', {failureFlash: 
        true, failureRedirect: '/login'}
        ), 
        users.login
    );

router.get('/logout', users.logout)

module.exports = router;
