import mongoose from 'mongoose';
import dotenv from "dotenv";

//Gets dotenv configuration for using env variables
dotenv.config();

//Defines mongodb link route
const mongodbLink = `mongodb+srv://${process.env.MDB_CLUSTER}:${process.env.MDB_PASS}@fullstack-cluster.koc01mp.mongodb.net/apv`

//Connects to Mongodb
const connectDB = async () => {
    try {
        const db = await mongoose.connect(`${mongodbLink}`);

        const url = `${db.connection.host}:${db.connection.port}`
        console.log('MongoDB connected to: ', url);

    } catch (err) {
        console.log(`error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;