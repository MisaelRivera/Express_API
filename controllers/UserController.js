const jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      asyncHandler = require('express-async-handler'),
      User = require('../models/User');


// @desc Register a new user
// @route POST /api/users
// @access public 
const registUser = asyncHandler( async(req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if the user exist
    const users = await User.findOne({ where: { email }});
    console.log(users);
    if (users) {
        res.status(400);
        throw new Error('The user email already exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({name, email, password: hash});
    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Login a user
// @route POST /api/users/login
// @access public 
const loginUser = (req, res) => {
    res.json({ message: 'Logged a user!' });
};

// @desc Get user data
// @route GET /api/users/me
// @access private
const getMe = (req, res) => {
    res.json({ message: 'Display user data' });
};


module.exports = {
    registUser,
    loginUser,
    getMe,
};