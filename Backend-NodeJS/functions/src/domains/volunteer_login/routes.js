const express = require("express");
const jwt = require('jsonwebtoken');
const { db } = require('../../config/firebase.js');
const router = express.Router();

router.post("/login", async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({ message: "Invalid username or password" });
    }

    try {
        const usersRef = db.collection('volunteers');
        const querySnapshot = await usersRef.where('email', '==', username).where('password', '==', password).get();
        console.log(existingUser);

        if (!querySnapshot.empty) {
            let accessToken = jwt.sign({
                data: password
            }, 'access', { expiresIn: 60 * 60 });

            req.session.authorization = {
                accessToken, username
            }

            return res.status(200).send("User successfully logged in");
        } else {
            return res.status(208).json({ message: "Invalid Login. Check username and password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;