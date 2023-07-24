const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validationMiddleware');
const {getPost, newPost, storePost} = require('../controllers/postControllers');

router.route('/new').get(authMiddleware, newPost);
router.route('/store').post([authMiddleware, validateMiddleware], storePost);
router.route('/:id').get(getPost);

module.exports = router