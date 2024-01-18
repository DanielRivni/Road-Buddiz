const express = require('express');
const User = require('../../config/models/users.js');
const router = express.Router();

// PATCH route to update user information
router.patch('/update_profile', async (req, res) => {
    const username = req.session.authorization.username;
    try {
        let { password, firstname, lastname, phone } = req.body;
        const user = await User.findOne({ email: username });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (password) {
            user.password = password;
        }
        if (firstname) {
            user.firstname = firstname;
        }
        if (lastname) {
            user.lastname = lastname;
        }
        if (phone) {
            user.phone = phone;
        }

        await user.save();

        return res.status(200).send("User updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;