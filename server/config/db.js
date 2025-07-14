import mongoose from 'mongoose';

const connectDb=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Error in connection to mongoDB ${error}`);
    }
}

export default connectDb;