const Goal = require('../models/Goal');

const asyncHandler = require('express-async-handler');
// @desc Get goals
// @url GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.findAll({where: {user_id: req.user.id}});
    res.status(200);
    res.json({ goals });
});

// @desc Get goals
// @url GET /api/goals/:id
// @access Private
const getGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findOne({where: {id: req.params.id }});
    console.log(goal);
    if (!goal) {
        res.status(400);
        throw new Error(`The goal with id ${req.params.id} doesn't exist!`);
    }

    if (goal.user_id !== req.user.id) {
        res.status(401);
        throw new Error(`You don't have permission to see the post ${req.params.id}`);
    }

    res.status(200);
    res.json({ id: goal.id, text: goal.text });
});

// @desc Create a goal
// @url POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }
    const goal = await Goal.create({text: req.body.text, user_id: req.user.id });
    res.status(201).json({ message: `Goal ${goal.id} created!` });
});

// @desc update a goal
// @url PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findOne({ where: { id: req.params.id} });
    console.log(goal);
    if (!goal) {
        res.status(400);
        throw new Error(`The goal with id ${req.params.id} doesn't exist!`);
    }

    if (goal.user_id !== req.user.id) {
        res.status(403);
        throw new Error(`You don't have permission to edit the post ${req.params.id}`);
    }

    if (!req.body.text) {
        res.status(400);
        throw new Error(`Please fill the text field`);
    }

    await Goal.update({ text: req.body.text }, { where: { id: req.params.id, user_id: req.user.id } });
    res.status(200);
    res.json({ message: `Goal ${req.params.id} updated correctly`});

});

// @desc delete a goal
// @url Delete /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findOne({ where: { id: req.params.id } });
    if (!goal) {
        res.status(400);
        throw new Error(`The goal with id ${req.params.id} doesn't exist!`);
    }

    if (goal.user_id !== req.user.id) {
        res.status(403);
        throw new Error(`You don't have permission to delete the post ${req.params.id}`);
    }

    await Goal.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.status(200).json({ mesage: `Goal ${req.params.id} was Deleted!`});
});

module.exports = {
    getGoals,
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
};