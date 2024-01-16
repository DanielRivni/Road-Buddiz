const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB;

const connectDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${password}@eventsdb.pjku6qe.mongodb.net/${dbName}?retryWrites=true&w=majority`);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

module.exports = connectDatabase;