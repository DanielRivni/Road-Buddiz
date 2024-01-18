const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Volunteer', volunteerSchema);