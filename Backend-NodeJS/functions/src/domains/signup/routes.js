const express = require("express");
const { FieldValue } = require('firebase-admin/firestore')
const { db } = require('../../config/firebase.js');
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password, firstname, lastname, phone, isvol } = req.body;
    const validationResult = validateUserFields(req.body);
  
    if (!validationResult.valid) {
      return res.status(400).json({ message: validationResult.message });
    }

    try {
        if (isvol) {
            const usersRef = db.collection('volunteers');

            const usernameQuery = await usersRef.where('email', '==', username).get();
            if (!usernameQuery.empty) {
                return res.status(409).json({ message: "User already exists!" });
            }

            await usersRef.doc().set({
                email: username,
                password: password,
                firstname: firstname,
                ...(lastname && { lastname: lastname }),
                phone: phone,
                number: FieldValue.increment(1),
            });
        }
        else {
            const usersRef = db.collection('clients');

            const usernameQuery = await usersRef.where('email', '==', username).get();
            if (!usernameQuery.empty) {
                return res.status(409).json({ message: "User already exists!" });
            }

            await usersRef.doc().set({
                email: username,
                password: password,
                firstname: firstname,
                ...(lastname && { lastname: lastname }),
                phone: phone,
            });
        }

        return res.status(200).json({ message: "User successfully registered. Now you can login" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

function validateUserFields(reqBody) {
    const { username, password, firstname, lastname, phone, isvol } = reqBody;

    if (!username || !password || !firstname || !phone) {
        return { valid: false, message: 'Missing fields' };
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof firstname !== 'string' || typeof phone !== 'string') {
        return { valid: false, message: 'Invalid field type. username, password, firstname, and phone must be strings.' };
    }

    if (lastname && typeof lastname !== 'string') {
        return { valid: false, message: 'Invalid field type. lastname must be a string.' };
    }

    if (isvol === undefined || typeof isvol !== 'boolean') {
        return { valid: false, message: 'Invalid isvol value. Please provide a boolean value.' };
    }

    return { valid: true };
}

module.exports = router;