const express = require("express");
const User = require('../../config/models/users.js');
const Volunteer = require('../../config/models/volunteers.js');
const router = express.Router();

router.post("/signup", async (req, res) => {
    let { username, password, firstname, lastname, phone, isvol } = req.body;

    try {
        const user = new User({
            email: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
        });
        await user.save();

        if (isvol) {
            // Find the last volunteer to determine the new volunteer number
            const lastVolunteer = await Volunteer.findOne().sort({ number: -1 });

            const newVolunteerNumber = lastVolunteer ? lastVolunteer.number + 1 : 1;

            const volunteer = new Volunteer({
                number: newVolunteerNumber,
                email: username,
            });
            await volunteer.save();
        }

        return res.status(200).json({ message: "User successfully registered. Now you can login" });

    } catch (error) {
        console.error("Error checking user existence:", error);

        if (error.code === 11000) {
            return res.status(409).json({ message: "User already exists!" });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/*
router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find({}, '-__v');
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/volunteers', async (req, res) => {
    try {
        const allVolunteers = await Volunteer.find({}, '-__v');
        res.json(allVolunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
*/
module.exports = router;