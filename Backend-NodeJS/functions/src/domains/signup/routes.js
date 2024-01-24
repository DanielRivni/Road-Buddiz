const express = require("express");
const { db } = require('../../config/firebase.js');
const { upload, uploadMultiple, uploadImage } = require('../../config/multer.js');
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password, firstname, lastname, phone, isvol } = req.body;
    const validationResult = validateUserFields(req.body);
    let user_doc_id = null;

    if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.message });
    }

    try {
        if (isvol) {
            const volunteersRef = db.collection('volunteers');

            const usernameQuery = await volunteersRef.where('email', '==', username).get();
            if (!usernameQuery.empty) {
                return res.status(409).json({ message: "User already exists!" });
            }

            const lastVolunteerQuery = await volunteersRef.orderBy('number', 'desc').limit(1).get();
            let lastNumber = 0;
            // Check if there is a last volunteer
            if (!lastVolunteerQuery.empty) {
                // Get the 'number' field of the last volunteer
                lastNumber = lastVolunteerQuery.docs[0].data().number;
            }

            const volunteerDocRef = await volunteersRef.add({
                email: username,
                password: password,
                firstname: firstname,
                ...(lastname && { lastname: lastname }),
                phone: phone,
                number: lastNumber + 1,
            });

            user_doc_id = volunteerDocRef.id;
        }
        else {
            const clientsRef = db.collection('clients');

            const usernameQuery = await clientsRef.where('email', '==', username).get();
            if (!usernameQuery.empty) {
                return res.status(409).json({ message: "User already exists!" });
            }

            const clientDocRef = await clientsRef.add({
                email: username,
                password: password,
                firstname: firstname,
                ...(lastname && { lastname: lastname }),
                phone: phone,
            });

            user_doc_id = clientDocRef.id;
        }

        return res.status(200).json({ message: "User successfully registered.", user_doc_id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/test-upload/:user_doc_id/:isvol', upload, async (req, res) => {
    const { user_doc_id, isvol } = req.params;

    // Validate params
    if (!user_doc_id || isvol === undefined) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    if (typeof user_doc_id !== 'string' || (isvol !== 'true' && isvol !== 'false')) {
        return res.status(400).json({ message: 'Invalid field type. user_doc_id must be a string and isvol must be a boolean.' });
    }

    // check for req.file
    if (!req.file) {
        return res.status(400).json({ message: 'Missing file' });
    }

    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer,
        originalname: req.file.originalname,
    }

    try {
        // Upload the image and get the URL
        const imageUrl = await uploadImage(file, `profile_images/${user_doc_id}_`);

        // Send a response indicating success
        return res.status(200).json({ message: 'File uploaded successfully', imageUrl });
    } catch (error) {
        // Handle errors from the uploadImage function
        console.error("Error uploading image:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
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