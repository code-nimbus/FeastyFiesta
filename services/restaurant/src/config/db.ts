import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "FeastyFiesta",
        });
        console.log("connected to momgodb")
    } catch (error) {
        console.log(error);
    }
};

export default connectDB