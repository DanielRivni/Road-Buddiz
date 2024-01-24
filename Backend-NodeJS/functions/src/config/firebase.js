const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');


const serviceAccount = require('./creds.json');

// Initialize Firebase Admin SDK
initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "gs://fir-nodejs-bbe22.appspot.com"
});

const db = getFirestore();

const bucketFB = getStorage().bucket();

module.exports = { db, bucketFB };
