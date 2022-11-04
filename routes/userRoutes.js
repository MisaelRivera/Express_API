const express = require('express');
const router = express.Router();
const { registUser, loginUser, getMe } = require('../controllers/UserController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;