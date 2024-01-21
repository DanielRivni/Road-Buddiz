const express = require('express');
const { db } = require('../../config/firebase.js');
const router = express.Router();

// PATCH route to update user information
router.patch('/update_profile', async (req, res) => {
    const username = req.session.authorization.username;
    try {
        const { password, firstname, lastname, phone, image } = req.body;

        const validationResult = validateUserFields(req.body);
        if (!validationResult.valid) {
            return res.status(400).json({ message: validationResult.message });
        }

        const usersRef = db.collection('clients');
        const querySnapshot = await usersRef.where('email', '==', username).get();
        if (querySnapshot.empty) {
            return res.status(404).json({ message: "User not found" });
        }

        // update user information
        const user = querySnapshot.docs[0];
        const userRef = usersRef.doc(user.id);
        const updatedUser = {
            ...(password && { password: password }),
            ...(firstname && { firstname: firstname }),
            ...(lastname && { lastname: lastname }),
            ...(phone && { phone: phone }),
            ...(image && { image: image }),
        };
        await userRef.update(updatedUser);

        return res.status(200).send("User updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

function validateUserFields(reqBody) {
    const { password, firstname, lastname, phone } = reqBody;

    if (!lastname && !password && !firstname && !phone) {
        return { valid: false, message: 'Missing fields' };
    }

    if (password && typeof password !== 'string') {
        return { valid: false, message: 'Invalid field type. password must be a string.' };
    }

    if (phone && typeof phone !== 'string') {
        return { valid: false, message: 'Invalid field type. phone must be a string.' };
    }

    if (lastname && typeof lastname !== 'string') {
        return { valid: false, message: 'Invalid field type. lastname must be a string.' };
    }

    return { valid: true };
}

module.exports = router;