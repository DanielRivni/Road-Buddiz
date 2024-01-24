const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid')
const { bucketFB } = require('./firebase.js');

const uploadMultiple = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array("image", 12);

const upload = multer({
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
            resolve(storagePath);
        });

        blobStream.end(file.buffer);
    });
}

async function getImageUrl(storagePath) {
    return new Promise((resolve, reject) => {
        const blob = bucketFB.file(storagePath);
        blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        }).then(signedUrls => {
            resolve(signedUrls[0]);
        }).catch(err => {
            console.log(err);
            reject("Error getting image");
        });
    });
}

module.exports = { uploadMultiple, upload, uploadImage };