const express = require('express');
const routes = require('./routes');
const connectDatabase = require('./config/mongodb.js');

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(routes);

async function startServer() {
    try {
        await connectDatabase();
        app.listen(PORT, () => console.log("Server is running on port", PORT));
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();

