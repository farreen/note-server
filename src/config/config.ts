import mongoose from "mongoose";

const connectDB = async() => {
    const dbUrl = "mongodb://127.0.0.1:27017";    
    const database = "notesDB";
    try{
        await mongoose.connect(`${dbUrl}/${database}`)
        console.log("connected to database");
    }catch(err){
        console.log("could not connect to database");
    }
}
export default connectDB;


