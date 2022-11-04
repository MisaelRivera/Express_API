const express = require('express');
const router = express.Router();
const { registUser, loginUser, getMe } = require('../controllers/UserController');

router.post('/', registUser);
router.post('/login', loginUser);
router.get('/me', getMe);

module.exports = router;