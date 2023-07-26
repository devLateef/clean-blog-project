const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const protect = require('../middleware/jwtAuthMiddleware');
const validateMiddleware = require('../middleware/validationMiddleware');
const {getPost, 
    newPost, 
    storePost} = require('../controllers/postControllers');

router.route('/new').get(protect, newPost);
router.route('/store').post(authMiddleware, validateMiddleware, storePost);
router.route('/:id').get(getPost);

module.exports = router