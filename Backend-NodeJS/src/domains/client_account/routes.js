const express = require('express');
const User = require('../../config/models/users.js');
const router = express.Router();

// DELETE route to delete user
router.delete('/delete_account', async (req, res) => {
    try {

        const username = req.session.authorization.username;

        // Find and delete the user based on the username
        const deletedUser = await User.findOneAndDelete({ email: username });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clear the session after deleting the user
        req.session.destroy();

        return res.status(200).send({ message: 'User profile deleted successfully', deletedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Logout route
router.get('/logout', async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            // Destroy the session
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return res.status(200).send({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error during logout' });
    }
});



module.exports = router;