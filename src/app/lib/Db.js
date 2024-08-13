import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const DBConnection = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MongoDB URI is not defined in the environment variables');
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
            socketTimeoutMS: 45000,
        });
        console.log('mongodb connected');
    } catch (error) {
        console.log('mongodb error', error);
    }
}

export default DBConnection;
