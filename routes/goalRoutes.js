const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal, getGoal } = require('../controllers/GoalController');

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal).get(getGoal);

module.exports = router;