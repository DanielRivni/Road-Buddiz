const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Volunteer', volunteerSchema);