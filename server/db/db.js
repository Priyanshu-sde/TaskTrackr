import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://priyanshusde:EeLDkYLEoBzsp7Tt@cluster0.kp9pk.mongodb.net/Fullstack-Todo");
        console.log("MongoDB connected");
    }
    catch(error){
        console.error('MongoDB Connection Failed',error.message);
        process.exit(1);

    }
};

export default connectDB;
