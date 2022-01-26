import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const url= process.env.DB;

mongoose.connect(url,(err, result)=>{
    if(err)
    console.log(err)
    else{
        console.log("Conneted to database..")
    }
});


