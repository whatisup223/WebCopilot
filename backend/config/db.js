const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from .env file or fallback to local
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/webcopilot');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // We do not exit process strictly in dev so you don't break if mongod isn't running yet.
        // process.exit(1); 
    }
};

module.exports = connectDB;
