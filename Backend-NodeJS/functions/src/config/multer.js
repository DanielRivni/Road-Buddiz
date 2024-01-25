const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid')
const { bucketFB } = require('./firebase.js');

const customUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}); // use req.files to access the images and req.body to access the text fields

const multipleUploads = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array("image", 12); // use req.files to access the files

const singleUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: async function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("image"); // name of the field in the form-data body

// Check file Type
function checkFileType(file, cb) {

    // Allowed ext
    const fileTypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: Images Only !!!");
    }
}

async function uploadImage(file, dirPath = "") {
    return new Promise((resolve, reject) => {
        const metadata = {
            metadata: {
                FirebaseStorageDownloadTokens: uuidv4(),
            },
            contentType: file.mimetype,
            cacheControl: 'public, max-age=31536000',
        };

        const storagePath = dirPath + file.originalname;
        const blob = bucketFB.file(storagePath);
        const blobStream = blob.createWriteStream({
            metadata: metadata,
            gzip: true  
        });

        blobStream.on('error', (err) => {
            console.log(err);
            reject("Error uploading image");
        });

        blobStream.on('finish', async () => {
            const downloadUrl = await blob.getSignedUrl({
                action: 'read',
                expires: '01-01-3000', // Replace with an appropriate expiration date
            });
            resolve(downloadUrl);
        });

        blobStream.end(file.buffer);
    });
}

module.exports = { multipleUploads, singleUpload, uploadImage, customUpload };