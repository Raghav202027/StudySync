/*
Imagine your server like this:
Routes: They’re like receptionists — when someone visits an endpoint (like /login), routes direct the request to the right place.

Controllers: They’re like workers or logic handlers — they do the actual processing like checking passwords, saving users, or sending back data.

Models: They’re like the database experts — they know how to talk to MongoDB and manage data (like users, posts, etc).
*/

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: 'Email already in use' });

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPass });
        await newUser.save();

        res.status(201).json({ msg: "Signup success" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};