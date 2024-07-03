const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken =require('../middleware/auth');
// @route GET api/auth
// @desc Check if the user is logged in
// @access Public

router.get('/',verifyToken ,async (req, res) => {
    try{
        const user =await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({
            success: false,
            message: 'User not found'
        })
        res.json({ success: true, message: 'User is logged in',user: user });
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Internal Server error' });
    }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        // Hash password and save user
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'User created successfully', accessToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        console.log(username,password);
        return res.status(400).json({ 
                success: false, 
                message: 'Missing username or password',});
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Incorrect username' });
        }

        // Check password
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        // Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'User logged in', accessToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
