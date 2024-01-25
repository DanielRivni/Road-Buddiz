const express = require("express");
const { db } = require('../../config/firebase.js');
const { multipleUploads, singleUpload, uploadImage, customUpload } = require('../../config/multer.js');
const router = express.Router();

const middleware = customUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'username', maxCount: 1 },
    { name: 'password', maxCount: 1 },
    { name: 'firstname', maxCount: 1 },
    { name: 'lastname', maxCount: 1 },
    { name: 'phone', maxCount: 1 },
    { name: 'isvol', maxCount: 1 },
]);

router.post("/signup-form", singleUpload, async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.file.mimetype);
        //const { username, password } = req.body;
        //console.log(username);
        return res.status(200).json({ message: "Success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

});

router.post("/signup", middleware, async (req, res) => {
    const { username, password, firstname, lastname, phone, isvol } = req.body;
    const validationResult = validateUserFields(req.body);
    const isImageIncluded = req.files && req.files.image && req.files.image.length > 0;
    const imageDirPath = Boolean(isvol) ? `profile_images/volunteers` : `profile_images/clients`;
    let userDocRef = null;

    if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.message });
    }

    try {
        if (Boolean(isvol)) {
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

            userDocRef = await volunteersRef.add({
                email: username,
                password: password,
                firstname: firstname,
                ...(lastname && { lastname: lastname }),
                phone: phone,
                number: lastNumber + 1,
            });

        } else {
            const clientsRef = db.collection('clients');

            const usernameQuery = await clientsRef.where('email', '==', username).get();
            if (!usernameQuery.empty) {
                return res.status(409).json({ message: "User already exists!" });
            }

            userDocRef = await clientsRef.add({
                email: username,
                password: password,
                firstname: firstname,
                ...(lastname && { lastname: lastname }),
                phone: phone,
            });

        }

        if (isImageIncluded){
            const file = {
                type: req.files.image[0].mimetype,
                buffer: req.files.image[0].buffer,
                originalname: req.files.image[0].originalname,
                fieldname: req.files.image[0].fieldname
            }

            const imageUrl = await uploadImage(file, `${imageDirPath}/${userDocRef.id}/`);
            await userDocRef.update({ 
                imageURL: imageUrl 
            });
        }

        return res.status(200).json({ message: "User successfully registered." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/*
router.post('/test-upload', singleUpload, async (req, res) => {

    // check for req.file
    if (!req.file) {
        return res.status(400).json({ message: 'Missing file' });
    }

    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        fieldname: req.file.fieldname
    }

    try {
        // Upload the image and get the URL
        const imageUrl = await uploadImage(file);

        // Send a response indicating success
        return res.status(200).json({ message: 'File uploaded successfully', imageUrl });
    } catch (error) {
        // Handle errors from the uploadImage function
        console.error("Error uploading image:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
*/

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

    if (isvol === undefined || (isvol !== 'true' && isvol !== 'false')) {
        return { valid: false, message: 'Invalid isvol value. Please provide a boolean value.' };
    }

    return { valid: true };
}

module.exports = router;