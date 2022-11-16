const express = require('express');
const router = express.Router(),
      { protect } = require('../middleware/authMiddleware');
const { getGoals, setGoal, updateGoal, deleteGoal, getGoal } = require('../controllers/GoalController');

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal).get(protect, getGoal);

module.exports = router;