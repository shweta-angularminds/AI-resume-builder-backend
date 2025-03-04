import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("\n MongoDB connected! PORT : " + connectionInstance.connection.host);
    } catch (error) {
        console.log("Mongo DB connection FAILED:",error);
        process.exit(1);
    }

}

export default connectDB;