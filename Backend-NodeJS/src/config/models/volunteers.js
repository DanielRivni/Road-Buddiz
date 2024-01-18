const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    number: {
        type: Number,
<<<<<<< HEAD
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
=======
        required: true
    },
    userid: {
        type: String,
        required: true
>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496
    },
})

module.exports = mongoose.model('Volunteer', volunteerSchema);