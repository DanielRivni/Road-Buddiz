const express = require("express");
const User = require('./models.js');
const router = express.Router();

router.post("/signup", async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({ message: "Invalid username or password" });
    }

    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: username });

        if (!existingUser) {
            // User does not exist, proceed with registration
            const user = new User({
                email: username,
                password: password
            });
            await user.save();
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            // User already exists
            return res.status(409).json({ message: "User already exists!" });
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find({}, '-__v');
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;