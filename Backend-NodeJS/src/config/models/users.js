const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String, 
<<<<<<< HEAD
        required: true,
        unique: true
=======
        required: true
>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496
    }, 
    password: {
        type: String, 
        required: true
    },
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: false
    },
    phone: {
        type: String, 
        required: true
    },

});

module.exports = mongoose.model('User', userSchema);