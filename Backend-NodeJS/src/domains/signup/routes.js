const express = require("express");
const User = require('../../config/models/users.js');
const Volunteer = require('../../config/models/volunteers.js');
const router = express.Router();

router.post("/signup", async (req, res) => {
    let { username, password, firstname, lastname, phone, isvol } = req.body;

<<<<<<< HEAD
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
        
=======
    if (!username || !password || !firstname || !phone || !isvol) {
        return res.status(404).json({ message: "Missing inputs" });
    }

    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: username });

        if (!existingUser) {
            // User does not exist, proceed with registration
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
                    userid: user._id,
                });
                await volunteer.save();
            }

            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            // User already exists
            return res.status(409).json({ message: "User already exists!" });
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

<<<<<<< HEAD
/*
=======
>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496
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
<<<<<<< HEAD
*/
=======

>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496
module.exports = router;