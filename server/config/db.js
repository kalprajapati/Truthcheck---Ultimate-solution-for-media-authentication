const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/truthcheck');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log("Running in offline mode (without MongoDB). Reports will not be saved.");
        // process.exit(1); // Keep server running even if DB fails
    }
};

module.exports = connectDB;
