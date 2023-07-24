const express = require('express');
const router = express.Router();
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticatedMiddleware');
const {homePage,
    loginForm, 
    loggedInUser, 
    storeUser, 
    newUser,
    logoutUser
} = require('../controllers/userControllers.js');

router.route('/').get(homePage);
router.route('/auth').get(redirectIfAuthenticated, loginForm);
router.route('/register').get(newUser);
router.route('/logout').get(logoutUser);
router.route('/login').post(redirectIfAuthenticated, loggedInUser);
router.route('/store').post(redirectIfAuthenticated, storeUser);

module.exports = router